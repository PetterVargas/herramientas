export interface PdfMetadata {
  version?: string;
  pageCount?: number;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modDate?: Date;
  isEncrypted: boolean;
  xmpCreatorTool?: string;
  xmpCreateDate?: string;
  xmpModifyDate?: string;
}

function bytesToLatin1(bytes: Uint8Array): string {
  const chunkSize = 0x8000;
  let result = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    result += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return result;
}

/**
 * Las cadenas PDF son bytes crudos, no texto. Si empiezan con el BOM UTF-16BE
 * (FE FF) se decodifican como Unicode; si no, se asumen PDFDocEncoding, que
 * para el rango ASCII/Latin-1 coincide con el byte tal cual.
 */
function decodeBytesString(byteString: string): string {
  if (byteString.length >= 2 && byteString.charCodeAt(0) === 0xfe && byteString.charCodeAt(1) === 0xff) {
    let out = '';
    for (let i = 2; i + 1 < byteString.length; i += 2) {
      out += String.fromCharCode((byteString.charCodeAt(i) << 8) | byteString.charCodeAt(i + 1));
    }
    return out;
  }
  return byteString;
}

function decodeLiteralString(raw: string): string {
  let out = '';
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch !== '\\') {
      out += ch;
      continue;
    }
    const next = raw[i + 1];
    if (next === 'n') {
      out += '\n';
      i++;
    } else if (next === 'r') {
      out += '\r';
      i++;
    } else if (next === 't') {
      out += '\t';
      i++;
    } else if (next === 'b') {
      out += '\b';
      i++;
    } else if (next === 'f') {
      out += '\f';
      i++;
    } else if (next === '(' || next === ')' || next === '\\') {
      out += next;
      i++;
    } else if (next === '\n') {
      i++;
    } else if (next === '\r') {
      i++;
      if (raw[i + 1] === '\n') i++;
    } else if (next >= '0' && next <= '7') {
      let oct = next;
      let j = i + 2;
      for (let k = 0; k < 2 && raw[j] >= '0' && raw[j] <= '7'; k++, j++) oct += raw[j];
      out += String.fromCharCode(parseInt(oct, 8) & 0xff);
      i = j - 1;
    } else if (next !== undefined) {
      out += next;
      i++;
    }
  }
  return decodeBytesString(out);
}

function decodeHexString(raw: string): string {
  const hex = raw.replace(/\s/g, '');
  let bytes = '';
  for (let i = 0; i < hex.length; i += 2) {
    bytes += String.fromCharCode(parseInt(hex.slice(i, i + 2).padEnd(2, '0'), 16));
  }
  return decodeBytesString(bytes);
}

function findMatchingParen(text: string, openIndex: number): number {
  let depth = 1;
  let i = openIndex + 1;
  while (i < text.length && depth > 0) {
    const ch = text[i];
    if (ch === '\\') {
      i += 2;
      continue;
    }
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    i++;
  }
  return i - 1;
}

function parseInfoDict(dictText: string): Record<string, string> {
  const result: Record<string, string> = {};
  const keyRegex = /\/([A-Za-z0-9_]+)\s*/g;
  let match: RegExpExecArray | null;

  while ((match = keyRegex.exec(dictText))) {
    const key = match[1];
    if (!key) continue;
    let idx = keyRegex.lastIndex;
    while (idx < dictText.length && /\s/.test(dictText[idx] ?? '')) idx++;
    const ch = dictText[idx];

    if (ch === '(') {
      const end = findMatchingParen(dictText, idx);
      result[key] = decodeLiteralString(dictText.slice(idx + 1, end));
      keyRegex.lastIndex = end + 1;
    } else if (ch === '<' && dictText[idx + 1] !== '<') {
      const end = dictText.indexOf('>', idx);
      if (end === -1) break;
      result[key] = decodeHexString(dictText.slice(idx + 1, end));
      keyRegex.lastIndex = end + 1;
    } else if (ch === '/') {
      const nameMatch = /^\/([A-Za-z0-9_.#-]+)/.exec(dictText.slice(idx));
      if (nameMatch?.[1]) {
        result[key] = nameMatch[1];
        keyRegex.lastIndex = idx + nameMatch[0].length;
      }
    }
  }

  return result;
}

function extractObjectDict(pdfText: string, objNum: number, gen: number): string | null {
  const objRegex = new RegExp(`(?:^|[^0-9])${objNum}\\s+${gen}\\s+obj\\b`);
  const match = objRegex.exec(pdfText);
  if (!match) return null;

  const start = pdfText.indexOf('<<', match.index);
  const endObj = pdfText.indexOf('endobj', match.index);
  if (start === -1 || (endObj !== -1 && start > endObj)) return null;

  let depth = 0;
  let i = start;
  while (i < pdfText.length) {
    if (pdfText.startsWith('<<', i)) {
      depth++;
      i += 2;
      continue;
    }
    if (pdfText.startsWith('>>', i)) {
      depth--;
      i += 2;
      if (depth === 0) return pdfText.slice(start + 2, i - 2);
      continue;
    }
    i++;
  }
  return null;
}

function findLastTrailerInfoRef(pdfText: string): { num: number; gen: number } | null {
  let lastIndex = -1;
  let idx = pdfText.indexOf('trailer');
  while (idx !== -1) {
    lastIndex = idx;
    idx = pdfText.indexOf('trailer', idx + 1);
  }
  if (lastIndex === -1) return null;

  const slice = pdfText.slice(lastIndex, lastIndex + 2000);
  const match = /\/Info\s+(\d+)\s+(\d+)\s+R/.exec(slice);
  if (!match?.[1] || !match[2]) return null;
  return { num: Number(match[1]), gen: Number(match[2]) };
}

/**
 * Respaldo para PDFs con xref en stream (1.5+) donde no hay palabra "trailer"
 * literal: se busca el primer objeto que contenga al menos dos claves típicas
 * de un diccionario Info sin estar comprimido dentro de un ObjStm.
 */
function findFallbackInfoDict(pdfText: string): string | null {
  const infoKeys = ['/Title', '/Author', '/Subject', '/Creator', '/Producer', '/CreationDate', '/Keywords'];
  const objRegex = /(\d+)\s+(\d+)\s+obj\b/g;
  let match: RegExpExecArray | null;

  while ((match = objRegex.exec(pdfText))) {
    const start = pdfText.indexOf('<<', match.index);
    if (start === -1 || start > match.index + 20) continue;

    const endObj = pdfText.indexOf('endobj', start);
    const boundedEnd = endObj === -1 ? Math.min(start + 5000, pdfText.length) : Math.min(endObj, start + 5000);
    const candidate = pdfText.slice(start, boundedEnd);

    const hits = infoKeys.filter((key) => candidate.includes(key)).length;
    if (hits >= 2) {
      const closeIdx = candidate.lastIndexOf('>>');
      return candidate.slice(2, closeIdx === -1 ? undefined : closeIdx);
    }
  }
  return null;
}

function parsePdfDate(raw: string | undefined): Date | undefined {
  if (!raw) return undefined;
  const match = /^D:(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?([+\-Zz])?(\d{2})?'?(\d{2})?/.exec(raw);
  if (!match) return undefined;

  const [, y, mo = '01', d = '01', h = '00', mi = '00', s = '00', tzSign, tzH, tzM] = match;
  let date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s)));

  if (tzSign && tzSign !== 'Z' && tzSign !== 'z' && tzH) {
    const offsetMinutes = (Number(tzH) * 60 + Number(tzM || '0')) * (tzSign === '-' ? -1 : 1);
    date = new Date(date.getTime() - offsetMinutes * 60000);
  }

  return date;
}

function extractVersion(pdfText: string): string | undefined {
  return /%PDF-(\d\.\d)/.exec(pdfText)?.[1];
}

function isEncrypted(pdfText: string): boolean {
  return /\/Encrypt\s+\d+\s+\d+\s+R/.test(pdfText);
}

function countPages(pdfText: string): number | undefined {
  const rootCount = /\/Type\s*\/Pages[^>]{0,500}?\/Count\s+(\d+)/.exec(pdfText);
  if (rootCount?.[1]) return Number(rootCount[1]);

  const pageObjects = pdfText.match(/\/Type\s*\/Page(?!s)/g);
  return pageObjects ? pageObjects.length : undefined;
}

function extractXmp(pdfText: string): { creatorTool?: string; createDate?: string; modifyDate?: string } | null {
  const start = pdfText.indexOf('<x:xmpmeta');
  if (start === -1) return null;
  const end = pdfText.indexOf('</x:xmpmeta>', start);
  if (end === -1) return null;

  const xmp = pdfText.slice(start, end);
  const grab = (tag: string) => {
    const tagMatch = new RegExp(`<${tag}>([^<]*)</${tag}>`).exec(xmp);
    if (tagMatch?.[1]) return tagMatch[1];
    const attrMatch = new RegExp(`${tag}="([^"]*)"`).exec(xmp);
    return attrMatch?.[1];
  };

  return {
    creatorTool: grab('xmp:CreatorTool'),
    createDate: grab('xmp:CreateDate'),
    modifyDate: grab('xmp:ModifyDate'),
  };
}

export function extractPdfMetadata(bytes: Uint8Array): PdfMetadata {
  const text = bytesToLatin1(bytes);
  const encrypted = isEncrypted(text);

  // Con el documento cifrado, las cadenas del Info dictionary y del XMP están
  // encriptadas (RC4/AES): decodificarlas como texto solo produciría bytes
  // sin sentido, así que se omiten y se deja solo la info estructural.
  const ref = encrypted ? null : findLastTrailerInfoRef(text);
  const infoDictText = encrypted ? null : ((ref && extractObjectDict(text, ref.num, ref.gen)) ?? findFallbackInfoDict(text));
  const parsedInfo = infoDictText ? parseInfoDict(infoDictText) : {};
  const xmp = encrypted ? null : extractXmp(text);

  return {
    version: extractVersion(text),
    pageCount: countPages(text),
    title: parsedInfo.Title,
    author: parsedInfo.Author,
    subject: parsedInfo.Subject,
    keywords: parsedInfo.Keywords,
    creator: parsedInfo.Creator,
    producer: parsedInfo.Producer,
    creationDate: parsePdfDate(parsedInfo.CreationDate),
    modDate: parsePdfDate(parsedInfo.ModDate),
    isEncrypted: encrypted,
    xmpCreatorTool: xmp?.creatorTool,
    xmpCreateDate: xmp?.createDate,
    xmpModifyDate: xmp?.modifyDate,
  };
}
