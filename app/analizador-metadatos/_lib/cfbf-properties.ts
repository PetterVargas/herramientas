/**
 * Decodifica un stream de Property Set ([MS-OLEPS]) como los que usan
 * "\x05SummaryInformation" y "\x05DocumentSummaryInformation" en los
 * formatos legados .doc/.xls/.ppt.
 */

const VT_I2 = 2;
const VT_I4 = 3;
const VT_BOOL = 11;
const VT_I1 = 16;
const VT_UI1 = 17;
const VT_UI2 = 18;
const VT_UI4 = 19;
const VT_LPSTR = 30;
const VT_LPWSTR = 31;
const VT_FILETIME = 64;

function decodeString(bytes: Uint8Array, offset: number, byteLength: number, codepage: number): string {
  const raw = bytes.slice(offset, offset + byteLength);
  // Recorta el terminador nulo si viene incluido en la longitud declarada.
  let end = raw.length;
  while (end > 0 && raw[end - 1] === 0) end -= 1;
  const trimmed = raw.slice(0, end);

  try {
    if (codepage === 65001) return new TextDecoder('utf-8').decode(trimmed);
    return new TextDecoder('windows-1252').decode(trimmed);
  } catch {
    return new TextDecoder('latin1').decode(trimmed);
  }
}

function filetimeToDate(low: number, high: number): Date | null {
  // FILETIME: intervalos de 100ns desde 1601-01-01 UTC, como par de uint32.
  if (low === 0 && high === 0) return null;
  const ticks = BigInt(high) * BigInt(0x100000000) + BigInt(low);
  const ms = Number(ticks / BigInt(10000)) - 11644473600000;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function readPropertyValue(
  view: DataView,
  bytes: Uint8Array,
  sectionStart: number,
  propOffset: number,
  codepage: number,
): string | number | boolean | Date | null {
  const absOffset = sectionStart + propOffset;
  const type = view.getUint32(absOffset, true);
  const valueOffset = absOffset + 4;

  switch (type) {
    case VT_I2:
      return view.getInt16(valueOffset, true);
    case VT_UI2:
      return view.getUint16(valueOffset, true);
    case VT_I4:
      return view.getInt32(valueOffset, true);
    case VT_UI4:
      return view.getUint32(valueOffset, true);
    case VT_I1:
      return view.getInt8(valueOffset);
    case VT_UI1:
      return view.getUint8(valueOffset);
    case VT_BOOL:
      return view.getInt16(valueOffset, true) !== 0;
    case VT_FILETIME:
      return filetimeToDate(view.getUint32(valueOffset, true), view.getUint32(valueOffset + 4, true));
    case VT_LPSTR: {
      const byteLength = view.getUint32(valueOffset, true);
      return decodeString(bytes, valueOffset + 4, byteLength, codepage);
    }
    case VT_LPWSTR: {
      const charCount = view.getUint32(valueOffset, true);
      let str = '';
      for (let i = 0; i < charCount; i++) {
        const code = view.getUint16(valueOffset + 4 + i * 2, true);
        if (code === 0) break;
        str += String.fromCharCode(code);
      }
      return str;
    }
    default:
      return null;
  }
}

export interface PropertySection {
  codepage: number;
  properties: Map<number, string | number | boolean | Date | null>;
}

/** Parsea un stream de Property Set completo y devuelve sus secciones (una para SummaryInformation, dos para DocumentSummaryInformation). */
export function parsePropertySet(streamBytes: Uint8Array): PropertySection[] {
  const view = new DataView(streamBytes.buffer, streamBytes.byteOffset, streamBytes.byteLength);

  const byteOrder = view.getUint16(0, true);
  if (byteOrder !== 0xfffe) throw new Error('Property Set con byte order inesperado.');

  const numSections = view.getUint32(24, true);
  const sections: PropertySection[] = [];

  for (let s = 0; s < numSections; s++) {
    // Cada entrada de la lista de secciones: FMTID (16 bytes) + offset (4 bytes), a partir del byte 28.
    const sectionOffset = view.getUint32(28 + s * 20 + 16, true);

    const numProperties = view.getUint32(sectionOffset + 4, true);
    const propList: { id: number; offset: number }[] = [];
    for (let p = 0; p < numProperties; p++) {
      const entryOff = sectionOffset + 8 + p * 8;
      propList.push({ id: view.getUint32(entryOff, true), offset: view.getUint32(entryOff + 4, true) });
    }

    // El codepage (PID 1) debe leerse primero: determina cómo decodificar los VT_LPSTR de esta sección.
    const codepageEntry = propList.find((p) => p.id === 1);
    let codepage = 1252;
    if (codepageEntry) {
      const raw = readPropertyValue(view, streamBytes, sectionOffset, codepageEntry.offset, 1252);
      if (typeof raw === 'number') codepage = raw < 0 ? raw + 65536 : raw;
    }

    const properties = new Map<number, string | number | boolean | Date | null>();
    for (const { id, offset } of propList) {
      if (id === 0) continue; // PID_DICTIONARY, no es un valor de propiedad estándar
      properties.set(id, readPropertyValue(view, streamBytes, sectionOffset, offset, codepage));
    }

    sections.push({ codepage, properties });
  }

  return sections;
}

// IDs de propiedad de SummaryInformation ([MS-OLEPS] 2.16 PIDSI_*)
export const PIDSI = {
  TITLE: 2,
  SUBJECT: 3,
  AUTHOR: 4,
  KEYWORDS: 5,
  COMMENTS: 6,
  TEMPLATE: 7,
  LAST_AUTHOR: 8,
  REVISION_NUMBER: 9,
  EDIT_TIME: 10,
  LAST_PRINTED: 11,
  CREATE_TIME: 12,
  LAST_SAVED_TIME: 13,
  PAGE_COUNT: 14,
  WORD_COUNT: 15,
  CHAR_COUNT: 16,
  APP_NAME: 18,
} as const;

// IDs de propiedad de DocumentSummaryInformation (PIDDSI_*)
export const PIDDSI = {
  CATEGORY: 2,
  MANAGER: 14,
  COMPANY: 15,
};
