export type IfdValue = string | number | number[] | [number, number] | [number, number][];

interface IfdEntry {
  tag: number;
  type: number;
  count: number;
  value: IfdValue;
}

const TYPE_SIZES: Record<number, number> = {
  1: 1, // BYTE
  2: 1, // ASCII
  3: 2, // SHORT
  4: 4, // LONG
  5: 8, // RATIONAL
  6: 1, // SBYTE
  7: 1, // UNDEFINED
  8: 2, // SSHORT
  9: 4, // SLONG
  10: 8, // SRATIONAL
  11: 4, // FLOAT
  12: 8, // DOUBLE
  13: 4, // IFD (offset a otro IFD; mismo tamaño que LONG)
};

function readAscii(bytes: Uint8Array, offset: number, length: number): string {
  let end = offset + length;
  // Recorta en el primer NUL: los strings ASCII de EXIF vienen terminados en \0.
  for (let i = offset; i < offset + length; i++) {
    if (bytes[i] === 0) {
      end = i;
      break;
    }
  }
  return new TextDecoder('latin1').decode(bytes.slice(offset, end));
}

function readEntryValue(
  view: DataView,
  bytes: Uint8Array,
  tiffStart: number,
  entryOffset: number,
  littleEndian: boolean,
): IfdEntry {
  const tag = view.getUint16(entryOffset, littleEndian);
  const type = view.getUint16(entryOffset + 2, littleEndian);
  const count = view.getUint32(entryOffset + 4, littleEndian);
  const unitSize = TYPE_SIZES[type] ?? 1;
  const totalSize = unitSize * count;
  const dataOffset = totalSize <= 4 ? entryOffset + 8 : tiffStart + view.getUint32(entryOffset + 8, littleEndian);

  let value: IfdValue;

  if (type === 2) {
    value = readAscii(bytes, dataOffset, count);
  } else if (type === 5 || type === 10) {
    const rationals: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const num = type === 5 ? view.getUint32(dataOffset + i * 8, littleEndian) : view.getInt32(dataOffset + i * 8, littleEndian);
      const den = type === 5 ? view.getUint32(dataOffset + i * 8 + 4, littleEndian) : view.getInt32(dataOffset + i * 8 + 4, littleEndian);
      rationals.push([num, den]);
    }
    value = count === 1 ? rationals[0]! : rationals;
  } else if (type === 3 || type === 8) {
    const nums: number[] = [];
    for (let i = 0; i < count; i++) {
      nums.push(type === 3 ? view.getUint16(dataOffset + i * 2, littleEndian) : view.getInt16(dataOffset + i * 2, littleEndian));
    }
    value = count === 1 ? nums[0]! : nums;
  } else if (type === 4 || type === 9 || type === 13) {
    // Tipo 13 (IFD) es un puntero a otro IFD; se lee igual que LONG (tipo 4).
    const nums: number[] = [];
    for (let i = 0; i < count; i++) {
      nums.push(type === 9 ? view.getInt32(dataOffset + i * 4, littleEndian) : view.getUint32(dataOffset + i * 4, littleEndian));
    }
    value = count === 1 ? nums[0]! : nums;
  } else if (type === 1 || type === 6 || type === 7) {
    value = Array.from(bytes.slice(dataOffset, dataOffset + count));
  } else {
    value = [];
  }

  return { tag, type, count, value };
}

function readIfd(
  view: DataView,
  bytes: Uint8Array,
  tiffStart: number,
  ifdOffset: number,
  littleEndian: boolean,
): { entries: Map<number, IfdEntry>; nextIfdOffset: number } {
  const entries = new Map<number, IfdEntry>();
  const entryCount = view.getUint16(ifdOffset, littleEndian);

  for (let i = 0; i < entryCount; i++) {
    const entryOffset = ifdOffset + 2 + i * 12;
    const entry = readEntryValue(view, bytes, tiffStart, entryOffset, littleEndian);
    entries.set(entry.tag, entry);
  }

  const nextIfdOffset = view.getUint32(ifdOffset + 2 + entryCount * 12, littleEndian);
  return { entries, nextIfdOffset };
}

export interface ExifData {
  make?: string;
  model?: string;
  software?: string;
  dateTime?: string;
  dateTimeOriginal?: string;
  dateTimeDigitized?: string;
  artist?: string;
  copyright?: string;
  orientation?: number;
  xResolution?: number;
  yResolution?: number;
  exposureTime?: [number, number];
  fNumber?: [number, number];
  isoSpeed?: number;
  focalLength?: [number, number];
  lensModel?: string;
  pixelWidth?: number;
  pixelHeight?: number;
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsAltitude?: number;
}

function rationalToNumber(r: [number, number] | undefined): number | undefined {
  if (!r || r[1] === 0) return undefined;
  return r[0] / r[1];
}

function dmsToDecimal(dms: [number, number][], ref: string | undefined): number | undefined {
  if (dms.length !== 3) return undefined;
  const [deg, min, sec] = dms.map((r) => (r[1] === 0 ? 0 : r[0] / r[1]));
  let decimal = (deg ?? 0) + (min ?? 0) / 60 + (sec ?? 0) / 3600;
  if (ref === 'S' || ref === 'W') decimal = -decimal;
  return decimal;
}

/** Parsea un bloque TIFF/EXIF crudo (sin el prefijo "Exif\0\0" de JPEG). */
export function parseTiff(bytes: Uint8Array): ExifData | null {
  if (bytes.length < 8) return null;

  const byteOrder = String.fromCharCode(bytes[0] ?? 0, bytes[1] ?? 0);
  if (byteOrder !== 'II' && byteOrder !== 'MM') return null;
  const littleEndian = byteOrder === 'II';

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const magic = view.getUint16(2, littleEndian);
  if (magic !== 42) return null;

  const ifd0Offset = view.getUint32(4, littleEndian);
  const { entries: ifd0 } = readIfd(view, bytes, 0, ifd0Offset, littleEndian);

  const result: ExifData = {};
  const asString = (v: IfdValue | undefined) => (typeof v === 'string' ? v.trim() : undefined);
  const asNumber = (v: IfdValue | undefined) => (typeof v === 'number' ? v : undefined);
  const asRational = (v: IfdValue | undefined): [number, number] | undefined =>
    Array.isArray(v) && v.length === 2 && typeof v[0] === 'number' ? (v as [number, number]) : undefined;

  result.make = asString(ifd0.get(0x010f)?.value);
  result.model = asString(ifd0.get(0x0110)?.value);
  result.orientation = asNumber(ifd0.get(0x0112)?.value);
  result.xResolution = rationalToNumber(asRational(ifd0.get(0x011a)?.value));
  result.yResolution = rationalToNumber(asRational(ifd0.get(0x011b)?.value));
  result.software = asString(ifd0.get(0x0131)?.value);
  result.dateTime = asString(ifd0.get(0x0132)?.value);
  result.artist = asString(ifd0.get(0x013b)?.value);
  result.copyright = asString(ifd0.get(0x8298)?.value);

  const exifOffsetEntry = ifd0.get(0x8769);
  if (typeof exifOffsetEntry?.value === 'number') {
    const { entries: exifIfd } = readIfd(view, bytes, 0, exifOffsetEntry.value, littleEndian);
    result.exposureTime = asRational(exifIfd.get(0x829a)?.value);
    result.fNumber = asRational(exifIfd.get(0x829d)?.value);
    result.isoSpeed = asNumber(exifIfd.get(0x8827)?.value);
    result.dateTimeOriginal = asString(exifIfd.get(0x9003)?.value);
    result.dateTimeDigitized = asString(exifIfd.get(0x9004)?.value);
    result.focalLength = asRational(exifIfd.get(0x920a)?.value);
    result.lensModel = asString(exifIfd.get(0xa434)?.value);
    result.pixelWidth = asNumber(exifIfd.get(0xa002)?.value);
    result.pixelHeight = asNumber(exifIfd.get(0xa003)?.value);
  }

  const gpsOffsetEntry = ifd0.get(0x8825);
  if (typeof gpsOffsetEntry?.value === 'number') {
    const { entries: gpsIfd } = readIfd(view, bytes, 0, gpsOffsetEntry.value, littleEndian);
    const latRef = asString(gpsIfd.get(0x0001)?.value);
    const lonRef = asString(gpsIfd.get(0x0003)?.value);
    const latValue = gpsIfd.get(0x0002)?.value;
    const lonValue = gpsIfd.get(0x0004)?.value;
    const altValue = gpsIfd.get(0x0006)?.value;

    if (Array.isArray(latValue) && Array.isArray(latValue[0])) {
      result.gpsLatitude = dmsToDecimal(latValue as [number, number][], latRef);
    }
    if (Array.isArray(lonValue) && Array.isArray(lonValue[0])) {
      result.gpsLongitude = dmsToDecimal(lonValue as [number, number][], lonRef);
    }
    const altRational = asRational(altValue);
    if (altRational) result.gpsAltitude = rationalToNumber(altRational);
  }

  return result;
}

/** Busca el segmento APP1 "Exif" dentro de un JPEG y devuelve su bloque TIFF. */
export function extractJpegExifBlock(bytes: Uint8Array): Uint8Array | null {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1] ?? 0;

    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    if (marker === 0xd9 || marker === 0xda) break; // EOI o inicio de datos de escaneo

    const length = ((bytes[offset + 2] ?? 0) << 8) | (bytes[offset + 3] ?? 0);
    if (marker === 0xe1) {
      const segStart = offset + 4;
      const sig = new TextDecoder('latin1').decode(bytes.slice(segStart, segStart + 6));
      if (sig === 'Exif\0\0') {
        return bytes.slice(segStart + 6, offset + 2 + length);
      }
    }
    offset += 2 + length;
  }
  return null;
}

export function getJpegDimensions(bytes: Uint8Array): { width: number; height: number } | null {
  let offset = 2;
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1] ?? 0;
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    if (marker === 0xda) break;
    const length = ((bytes[offset + 2] ?? 0) << 8) | (bytes[offset + 3] ?? 0);
    const isSofMarker = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSofMarker) {
      const height = ((bytes[offset + 5] ?? 0) << 8) | (bytes[offset + 6] ?? 0);
      const width = ((bytes[offset + 7] ?? 0) << 8) | (bytes[offset + 8] ?? 0);
      return { width, height };
    }
    offset += 2 + length;
  }
  return null;
}
