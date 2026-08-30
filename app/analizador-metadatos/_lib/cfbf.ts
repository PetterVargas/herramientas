/**
 * Lector mínimo de Compound File Binary Format (OLE2 / CFBF), el contenedor
 * usado por los formatos binarios legados .doc, .xls y .ppt. Implementa lo
 * necesario para navegar la cadena FAT/MiniFAT, recorrer el árbol de
 * directorio y extraer streams completos por nombre — en particular
 * "\x05SummaryInformation" y "\x05DocumentSummaryInformation".
 *
 * Referencia: [MS-CFB] Compound File Binary File Format.
 */

const ENDOFCHAIN = 0xfffffffe;
const FREESECT = 0xffffffff;
const HEADER_SIZE = 512;

interface DirEntry {
  name: string;
  type: number; // 0=vacío 1=storage 2=stream 5=root
  startSector: number;
  size: number;
  leftSibling: number;
  rightSibling: number;
  child: number;
}

export class CfbfReader {
  private view: DataView;
  private bytes: Uint8Array;
  private sectorSize: number;
  private miniSectorSize: number;
  private fat: number[] = [];
  private miniFat: number[] = [];
  private directory: DirEntry[] = [];
  private miniStreamBytes: Uint8Array = new Uint8Array(0);
  private miniStreamCutoff: number;

  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

    const signature = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
    if (!signature.every((b, i) => bytes[i] === b)) {
      throw new Error('No es un archivo CFBF/OLE2 válido.');
    }

    const sectorShift = this.view.getUint16(30, true);
    const miniSectorShift = this.view.getUint16(32, true);
    this.sectorSize = 1 << sectorShift;
    this.miniSectorSize = 1 << miniSectorShift;
    this.miniStreamCutoff = this.view.getUint32(56, true);

    const numFatSectors = this.view.getUint32(44, true);
    const firstDirSector = this.view.getUint32(48, true);
    const firstMiniFatSector = this.view.getUint32(60, true);
    const numMiniFatSectors = this.view.getUint32(64, true);
    const firstDifatSector = this.view.getUint32(68, true);
    const numDifatSectors = this.view.getUint32(72, true);

    const fatSectorLocations = this.readDifat(numFatSectors, firstDifatSector, numDifatSectors);
    this.fat = this.readFat(fatSectorLocations);
    this.directory = this.readDirectory(firstDirSector);

    const root = this.directory.find((e) => e.type === 5);
    if (root && root.startSector !== ENDOFCHAIN) {
      this.miniStreamBytes = this.readChain(root.startSector, root.size);
    }

    if (numMiniFatSectors > 0) {
      const miniFatSectorBytes = this.readChain(firstMiniFatSector, numMiniFatSectors * this.sectorSize);
      const miniFatView = new DataView(miniFatSectorBytes.buffer, miniFatSectorBytes.byteOffset, miniFatSectorBytes.byteLength);
      const count = miniFatSectorBytes.length / 4;
      for (let i = 0; i < count; i++) this.miniFat.push(miniFatView.getUint32(i * 4, true));
    }
  }

  private sectorOffset(sector: number): number {
    return HEADER_SIZE + sector * this.sectorSize;
  }

  private readDifat(numFatSectors: number, firstDifatSector: number, numDifatSectors: number): number[] {
    const locations: number[] = [];
    for (let i = 0; i < 109 && locations.length < numFatSectors; i++) {
      const loc = this.view.getUint32(76 + i * 4, true);
      if (loc !== FREESECT) locations.push(loc);
    }

    let difatSector = firstDifatSector;
    let remaining = numDifatSectors;
    const entriesPerSector = this.sectorSize / 4 - 1; // el último uint32 de cada sector DIFAT apunta al siguiente sector DIFAT
    while (difatSector !== ENDOFCHAIN && remaining > 0 && locations.length < numFatSectors) {
      const off = this.sectorOffset(difatSector);
      for (let i = 0; i < entriesPerSector && locations.length < numFatSectors; i++) {
        const loc = this.view.getUint32(off + i * 4, true);
        if (loc !== FREESECT) locations.push(loc);
      }
      difatSector = this.view.getUint32(off + entriesPerSector * 4, true);
      remaining -= 1;
    }

    return locations;
  }

  private readFat(fatSectorLocations: number[]): number[] {
    const entriesPerSector = this.sectorSize / 4;
    const fat: number[] = [];
    for (const sector of fatSectorLocations) {
      const off = this.sectorOffset(sector);
      for (let i = 0; i < entriesPerSector; i++) {
        fat.push(this.view.getUint32(off + i * 4, true));
      }
    }
    return fat;
  }

  /** Sigue una cadena de sectores regulares (FAT) desde `start` y concatena sus bytes, recortando a `size` si se conoce. */
  private readChain(start: number, size: number): Uint8Array {
    const chunks: Uint8Array[] = [];
    let sector = start;
    let collected = 0;
    const guardLimit = this.fat.length + 8;
    let steps = 0;

    while (sector !== ENDOFCHAIN && sector !== FREESECT && sector >= 0 && sector < this.fat.length) {
      if (steps++ > guardLimit) break; // protección ante FAT corrupta/circular
      const off = this.sectorOffset(sector);
      const remaining = size - collected;
      const take = remaining > 0 ? Math.min(this.sectorSize, remaining) : this.sectorSize;
      chunks.push(this.bytes.slice(off, off + take));
      collected += take;
      sector = this.fat[sector] ?? ENDOFCHAIN;
    }

    const out = new Uint8Array(chunks.reduce((sum, c) => sum + c.length, 0));
    let pos = 0;
    for (const c of chunks) {
      out.set(c, pos);
      pos += c.length;
    }
    return size >= 0 ? out.slice(0, size) : out;
  }

  /** Sigue una cadena de mini-sectores dentro del mini-stream ya cargado. */
  private readMiniChain(start: number, size: number): Uint8Array {
    const chunks: Uint8Array[] = [];
    let sector = start;
    let collected = 0;
    const guardLimit = this.miniFat.length + 8;
    let steps = 0;

    while (sector !== ENDOFCHAIN && sector !== FREESECT && sector >= 0 && sector < this.miniFat.length) {
      if (steps++ > guardLimit) break;
      const off = sector * this.miniSectorSize;
      const remaining = size - collected;
      const take = remaining > 0 ? Math.min(this.miniSectorSize, remaining) : this.miniSectorSize;
      chunks.push(this.miniStreamBytes.slice(off, off + take));
      collected += take;
      sector = this.miniFat[sector] ?? ENDOFCHAIN;
    }

    const out = new Uint8Array(chunks.reduce((sum, c) => sum + c.length, 0));
    let pos = 0;
    for (const c of chunks) {
      out.set(c, pos);
      pos += c.length;
    }
    return out.slice(0, size);
  }

  private readDirectory(firstDirSector: number): DirEntry[] {
    const dirBytes = this.readChain(firstDirSector, Number.MAX_SAFE_INTEGER);
    const entries: DirEntry[] = [];
    const count = Math.floor(dirBytes.length / 128);
    const view = new DataView(dirBytes.buffer, dirBytes.byteOffset, dirBytes.byteLength);

    for (let i = 0; i < count; i++) {
      const off = i * 128;
      const nameLenBytes = view.getUint16(off + 64, true);
      const type = dirBytes[off + 66] ?? 0;
      if (type === 0) continue; // entrada no usada

      const nameChars = nameLenBytes >= 2 ? nameLenBytes / 2 - 1 : 0;
      let name = '';
      for (let c = 0; c < nameChars; c++) {
        name += String.fromCharCode(view.getUint16(off + c * 2, true));
      }

      const startSector = view.getUint32(off + 116, true);
      const sizeLow = view.getUint32(off + 120, true);

      entries.push({
        name,
        type,
        startSector,
        size: sizeLow,
        leftSibling: view.getUint32(off + 68, true),
        rightSibling: view.getUint32(off + 72, true),
        child: view.getUint32(off + 76, true),
      });
    }

    return entries;
  }

  listStreamNames(): string[] {
    return this.directory.filter((e) => e.type === 2).map((e) => e.name);
  }

  getStream(name: string): Uint8Array | null {
    const entry = this.directory.find((e) => e.type === 2 && e.name === name);
    if (!entry) return null;

    if (entry.size < this.miniStreamCutoff) {
      return this.readMiniChain(entry.startSector, entry.size);
    }
    return this.readChain(entry.startSector, entry.size);
  }
}
