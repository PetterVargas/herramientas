import { parseTiff, type ExifData } from './exif';

export interface PngMetadata {
  width: number;
  height: number;
  bitDepth: number;
  colorType: number;
  interlace: number;
  textFields: Record<string, string>;
  time?: string;
  dpi?: { x: number; y: number };
  exif?: ExifData;
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

async function inflateZlib(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate'));
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}

function indexOfNull(data: Uint8Array, start: number): number {
  const idx = data.indexOf(0, start);
  return idx === -1 ? data.length : idx;
}

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

export async function parsePng(bytes: Uint8Array): Promise<PngMetadata | null> {
  if (!PNG_SIGNATURE.every((b, i) => bytes[i] === b)) return null;

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const result: PngMetadata = {
    width: 0,
    height: 0,
    bitDepth: 0,
    colorType: 0,
    interlace: 0,
    textFields: {},
  };

  let offset = 8;
  while (offset + 8 <= bytes.length) {
    const length = view.getUint32(offset, false);
    const type = new TextDecoder('latin1').decode(bytes.slice(offset + 4, offset + 8));
    const dataStart = offset + 8;
    const data = bytes.slice(dataStart, dataStart + length);

    if (type === 'IHDR') {
      const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
      result.width = dv.getUint32(0, false);
      result.height = dv.getUint32(4, false);
      result.bitDepth = data[8] ?? 0;
      result.colorType = data[9] ?? 0;
      result.interlace = data[12] ?? 0;
    } else if (type === 'tEXt') {
      const nullIdx = indexOfNull(data, 0);
      const keyword = new TextDecoder('latin1').decode(data.slice(0, nullIdx));
      const text = new TextDecoder('latin1').decode(data.slice(nullIdx + 1));
      if (keyword) result.textFields[keyword] = text;
    } else if (type === 'zTXt') {
      const nullIdx = indexOfNull(data, 0);
      const keyword = new TextDecoder('latin1').decode(data.slice(0, nullIdx));
      const compressed = data.slice(nullIdx + 2);
      try {
        const inflated = await inflateZlib(compressed);
        if (keyword) result.textFields[keyword] = new TextDecoder('latin1').decode(inflated);
      } catch {
        // Chunk corrupto o formato de compresión no soportado: se omite.
      }
    } else if (type === 'iTXt') {
      let p = indexOfNull(data, 0);
      const keyword = new TextDecoder('utf-8').decode(data.slice(0, p));
      p += 1;
      const compressed = data[p] === 1;
      p += 2; // flag de compresión + método de compresión
      const langEnd = indexOfNull(data, p);
      p = langEnd + 1;
      const translatedEnd = indexOfNull(data, p);
      p = translatedEnd + 1;

      let textBytes: Uint8Array = data.slice(p);
      try {
        if (compressed) textBytes = await inflateZlib(textBytes);
        if (keyword) result.textFields[keyword] = new TextDecoder('utf-8').decode(textBytes);
      } catch {
        // Chunk corrupto: se omite.
      }
    } else if (type === 'tIME') {
      const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const year = dv.getUint16(0, false);
      const month = data[2] ?? 0;
      const day = data[3] ?? 0;
      const hour = data[4] ?? 0;
      const minute = data[5] ?? 0;
      const second = data[6] ?? 0;
      result.time = `${year}-${pad2(month)}-${pad2(day)} ${pad2(hour)}:${pad2(minute)}:${pad2(second)} UTC`;
    } else if (type === 'pHYs') {
      const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const ppuX = dv.getUint32(0, false);
      const ppuY = dv.getUint32(4, false);
      const unit = data[8];
      if (unit === 1) {
        result.dpi = { x: Math.round(ppuX * 0.0254), y: Math.round(ppuY * 0.0254) };
      }
    } else if (type === 'eXIf') {
      result.exif = parseTiff(data) ?? undefined;
    }

    offset = dataStart + length + 4; // +4 por el CRC del chunk
    if (type === 'IEND') break;
  }

  return result;
}

export const PNG_COLOR_TYPES: Record<number, string> = {
  0: 'Escala de grises',
  2: 'RGB (color verdadero)',
  3: 'Paleta indexada',
  4: 'Escala de grises + alfa',
  6: 'RGB + alfa',
};
