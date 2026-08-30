export const BYTES_PER_ROW = 16;
export const ROWS_PER_PAGE = 512;
export const BYTES_PER_PAGE = BYTES_PER_ROW * ROWS_PER_PAGE;

export interface HexRow {
  offset: string;
  hex: string[];
  ascii: string;
}

function toPrintableChar(byte: number): string {
  return byte >= 0x20 && byte <= 0x7e ? String.fromCharCode(byte) : '.';
}

export function formatHexRows(bytes: Uint8Array, startOffset: number, maxBytes: number): HexRow[] {
  const rows: HexRow[] = [];
  const end = Math.min(bytes.length, startOffset + maxBytes);

  for (let rowStart = startOffset; rowStart < end; rowStart += BYTES_PER_ROW) {
    const rowEnd = Math.min(rowStart + BYTES_PER_ROW, end);
    const hex: string[] = [];
    let ascii = '';

    for (let i = rowStart; i < rowEnd; i++) {
      const byte = bytes[i] ?? 0;
      hex.push(byte.toString(16).padStart(2, '0'));
      ascii += toPrintableChar(byte);
    }

    rows.push({ offset: rowStart.toString(16).padStart(8, '0'), hex, ascii });
  }

  return rows;
}

export type SearchMode = 'text' | 'hex';

/** Convierte la entrada de búsqueda a una secuencia de bytes según el modo elegido. */
export function parseSearchQuery(query: string, mode: SearchMode): Uint8Array | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  if (mode === 'text') {
    return new TextEncoder().encode(trimmed);
  }

  const cleaned = trimmed.replace(/\s+/g, '');
  if (cleaned.length === 0 || cleaned.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(cleaned)) {
    return null;
  }

  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleaned.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/** Busca `needle` dentro de `haystack` a partir de `fromIndex`. Devuelve -1 si no hay coincidencia. */
export function findByteSequence(haystack: Uint8Array, needle: Uint8Array, fromIndex: number): number {
  if (needle.length === 0) return -1;

  outer: for (let i = Math.max(0, fromIndex); i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}
