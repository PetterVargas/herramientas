export interface ZipEntry {
  name: string;
  compressedSize: number;
  uncompressedSize: number;
  compressionMethod: number;
  localHeaderOffset: number;
}

const EOCD_SIGNATURE = 0x06054b50;
const CENTRAL_DIR_SIGNATURE = 0x02014b50;
const LOCAL_HEADER_SIGNATURE = 0x04034b50;

function findEndOfCentralDirectory(view: DataView): number {
  // El EOCD puede tener un comentario de hasta 65535 bytes al final del
  // archivo, así que se busca desde atrás hacia adelante.
  const maxCommentSize = 65535;
  const searchStart = Math.max(0, view.byteLength - 22 - maxCommentSize);

  for (let i = view.byteLength - 22; i >= searchStart; i--) {
    if (view.getUint32(i, true) === EOCD_SIGNATURE) return i;
  }
  return -1;
}

export function listZipEntries(bytes: Uint8Array): ZipEntry[] {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const eocdOffset = findEndOfCentralDirectory(view);
  if (eocdOffset === -1) throw new Error('No es un archivo ZIP válido (no se encontró el registro EOCD).');

  const entryCount = view.getUint16(eocdOffset + 10, true);
  const centralDirOffset = view.getUint32(eocdOffset + 16, true);

  const entries: ZipEntry[] = [];
  let offset = centralDirOffset;

  for (let i = 0; i < entryCount; i++) {
    if (view.getUint32(offset, true) !== CENTRAL_DIR_SIGNATURE) break;

    const compressionMethod = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const uncompressedSize = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localHeaderOffset = view.getUint32(offset + 42, true);
    const nameBytes = bytes.slice(offset + 46, offset + 46 + nameLength);
    const name = new TextDecoder('utf-8').decode(nameBytes);

    entries.push({ name, compressedSize, uncompressedSize, compressionMethod, localHeaderOffset });
    offset += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

async function inflateRaw(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}

export async function readZipEntry(bytes: Uint8Array, entry: ZipEntry): Promise<Uint8Array> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const offset = entry.localHeaderOffset;
  if (view.getUint32(offset, true) !== LOCAL_HEADER_SIGNATURE) {
    throw new Error(`Encabezado local inválido para "${entry.name}".`);
  }

  const nameLength = view.getUint16(offset + 26, true);
  const extraLength = view.getUint16(offset + 28, true);
  const dataStart = offset + 30 + nameLength + extraLength;
  const compressed = bytes.slice(dataStart, dataStart + entry.compressedSize);

  if (entry.compressionMethod === 0) return compressed;
  if (entry.compressionMethod === 8) return inflateRaw(compressed);
  throw new Error(`Método de compresión ZIP no soportado (${entry.compressionMethod}) para "${entry.name}".`);
}

export async function readZipEntryText(bytes: Uint8Array, entries: ZipEntry[], name: string): Promise<string | null> {
  const entry = entries.find((e) => e.name === name);
  if (!entry) return null;
  const raw = await readZipEntry(bytes, entry);
  return new TextDecoder('utf-8').decode(raw);
}
