import { extractJpegExifBlock, getJpegDimensions, parseTiff } from './exif';
import { parsePng, PNG_COLOR_TYPES } from './png-metadata';
import { extractOoxmlMetadata } from './ooxml-metadata';
import { extractLegacyOfficeMetadata } from './legacy-office-metadata';
import { extractPdfMetadata } from './pdf-metadata';

export interface MetadataRow {
  label: string;
  value: string;
  sensitive?: boolean;
}

export interface MetadataSection {
  title: string;
  rows: MetadataRow[];
}

export interface AnalysisResult {
  fileName: string;
  fileSize: number;
  fileType: string;
  lastModified: number;
  sections: MetadataSection[];
  hasSensitiveData: boolean;
}

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? '' : filename.slice(dot).toLowerCase();
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDate(value: string | Date | undefined): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toLocaleString('es-CO');
  // Fechas EXIF vienen como "YYYY:MM:DD HH:MM:SS"
  const match = /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(value);
  if (match) {
    const [, y, mo, d, h, mi, s] = match;
    return `${d}/${mo}/${y} ${h}:${mi}:${s}`;
  }
  return value;
}

function fileInfoSection(file: File): MetadataSection {
  return {
    title: 'Archivo',
    rows: [
      { label: 'Nombre', value: file.name },
      { label: 'Tamaño', value: formatBytes(file.size) },
      { label: 'Tipo declarado (MIME)', value: file.type || 'desconocido' },
      { label: 'Última modificación', value: new Date(file.lastModified).toLocaleString('es-CO') },
    ],
  };
}

async function analyzeJpeg(file: File, bytes: Uint8Array): Promise<AnalysisResult> {
  const sections: MetadataSection[] = [fileInfoSection(file)];
  let hasSensitiveData = false;

  const dims = getJpegDimensions(bytes);
  const exifBlock = extractJpegExifBlock(bytes);
  const exif = exifBlock ? parseTiff(exifBlock) : null;

  const imageRows: MetadataRow[] = [];
  if (dims) {
    imageRows.push({ label: 'Dimensiones', value: `${dims.width} × ${dims.height} px` });
  }
  if (exif?.pixelWidth && exif?.pixelHeight) {
    imageRows.push({ label: 'Dimensiones (EXIF)', value: `${exif.pixelWidth} × ${exif.pixelHeight} px` });
  }
  if (imageRows.length) sections.push({ title: 'Imagen', rows: imageRows });

  if (exif) {
    const cameraRows: MetadataRow[] = [];
    if (exif.make) cameraRows.push({ label: 'Fabricante', value: exif.make });
    if (exif.model) cameraRows.push({ label: 'Modelo', value: exif.model });
    if (exif.lensModel) cameraRows.push({ label: 'Lente', value: exif.lensModel });
    if (exif.software) cameraRows.push({ label: 'Software', value: exif.software });
    if (exif.dateTime) cameraRows.push({ label: 'Fecha (archivo)', value: formatDate(exif.dateTime)! });
    if (exif.dateTimeOriginal) cameraRows.push({ label: 'Fecha de captura', value: formatDate(exif.dateTimeOriginal)! });
    if (exif.exposureTime) cameraRows.push({ label: 'Tiempo de exposición', value: `1/${Math.round(exif.exposureTime[1] / exif.exposureTime[0])} s` });
    if (exif.fNumber) cameraRows.push({ label: 'Apertura', value: `f/${(exif.fNumber[0] / exif.fNumber[1]).toFixed(1)}` });
    if (exif.isoSpeed) cameraRows.push({ label: 'ISO', value: String(exif.isoSpeed) });
    if (exif.focalLength) cameraRows.push({ label: 'Distancia focal', value: `${(exif.focalLength[0] / exif.focalLength[1]).toFixed(0)} mm` });
    if (exif.artist) cameraRows.push({ label: 'Autor', value: exif.artist });
    if (exif.copyright) cameraRows.push({ label: 'Copyright', value: exif.copyright });
    if (cameraRows.length) sections.push({ title: 'Cámara y captura (EXIF)', rows: cameraRows });

    if (exif.gpsLatitude !== undefined && exif.gpsLongitude !== undefined) {
      hasSensitiveData = true;
      sections.push({
        title: 'Ubicación (GPS)',
        rows: [
          { label: 'Latitud', value: exif.gpsLatitude.toFixed(6), sensitive: true },
          { label: 'Longitud', value: exif.gpsLongitude.toFixed(6), sensitive: true },
          ...(exif.gpsAltitude !== undefined
            ? [{ label: 'Altitud', value: `${exif.gpsAltitude.toFixed(0)} m`, sensitive: true }]
            : []),
          {
            label: 'Ver en mapa',
            value: `https://www.google.com/maps?q=${exif.gpsLatitude.toFixed(6)},${exif.gpsLongitude.toFixed(6)}`,
            sensitive: true,
          },
        ],
      });
    }
  } else {
    sections.push({ title: 'EXIF', rows: [{ label: 'Estado', value: 'Esta imagen no contiene metadatos EXIF.' }] });
  }

  return {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    lastModified: file.lastModified,
    sections,
    hasSensitiveData,
  };
}

async function analyzePng(file: File, bytes: Uint8Array): Promise<AnalysisResult> {
  const sections: MetadataSection[] = [fileInfoSection(file)];
  let hasSensitiveData = false;

  const png = await parsePng(bytes);
  if (!png) {
    sections.push({ title: 'PNG', rows: [{ label: 'Estado', value: 'No se pudo leer la estructura del PNG.' }] });
    return { fileName: file.name, fileSize: file.size, fileType: file.type, lastModified: file.lastModified, sections, hasSensitiveData };
  }

  sections.push({
    title: 'Imagen',
    rows: [
      { label: 'Dimensiones', value: `${png.width} × ${png.height} px` },
      { label: 'Profundidad de bits', value: `${png.bitDepth} bits` },
      { label: 'Tipo de color', value: PNG_COLOR_TYPES[png.colorType] ?? `Desconocido (${png.colorType})` },
      { label: 'Entrelazado', value: png.interlace === 1 ? 'Sí (Adam7)' : 'No' },
      ...(png.dpi ? [{ label: 'Resolución', value: `${png.dpi.x} × ${png.dpi.y} DPI` }] : []),
    ],
  });

  const textEntries = Object.entries(png.textFields);
  if (textEntries.length) {
    sections.push({
      title: 'Metadatos de texto (tEXt/iTXt/zTXt)',
      rows: textEntries.map(([label, value]) => ({ label, value })),
    });
  }

  if (png.time) {
    sections.push({ title: 'Fecha de última modificación (chunk tIME)', rows: [{ label: 'Fecha', value: png.time }] });
  }

  if (png.exif) {
    const exif = png.exif;
    const rows: MetadataRow[] = [];
    if (exif.make) rows.push({ label: 'Fabricante', value: exif.make });
    if (exif.model) rows.push({ label: 'Modelo', value: exif.model });
    if (exif.software) rows.push({ label: 'Software', value: exif.software });
    if (exif.dateTime) rows.push({ label: 'Fecha', value: formatDate(exif.dateTime)! });
    if (rows.length) sections.push({ title: 'EXIF embebido (chunk eXIf)', rows });

    if (exif.gpsLatitude !== undefined && exif.gpsLongitude !== undefined) {
      hasSensitiveData = true;
      sections.push({
        title: 'Ubicación (GPS)',
        rows: [
          { label: 'Latitud', value: exif.gpsLatitude.toFixed(6), sensitive: true },
          { label: 'Longitud', value: exif.gpsLongitude.toFixed(6), sensitive: true },
        ],
      });
    }
  }

  return { fileName: file.name, fileSize: file.size, fileType: file.type, lastModified: file.lastModified, sections, hasSensitiveData };
}

async function analyzeOoxml(file: File, bytes: Uint8Array): Promise<AnalysisResult> {
  const sections: MetadataSection[] = [fileInfoSection(file)];
  const meta = await extractOoxmlMetadata(bytes);

  const docRows: MetadataRow[] = [];
  if (meta.title) docRows.push({ label: 'Título', value: meta.title });
  if (meta.subject) docRows.push({ label: 'Asunto', value: meta.subject });
  if (meta.creator) docRows.push({ label: 'Autor original', value: meta.creator, sensitive: true });
  if (meta.lastModifiedBy) docRows.push({ label: 'Última modificación por', value: meta.lastModifiedBy, sensitive: true });
  if (meta.keywords) docRows.push({ label: 'Palabras clave', value: meta.keywords });
  if (meta.description) docRows.push({ label: 'Descripción', value: meta.description });
  if (meta.category) docRows.push({ label: 'Categoría', value: meta.category });
  if (meta.revision) docRows.push({ label: 'Número de revisión', value: meta.revision });
  if (meta.created) docRows.push({ label: 'Fecha de creación', value: formatDate(meta.created)! });
  if (meta.modified) docRows.push({ label: 'Fecha de modificación', value: formatDate(meta.modified)! });
  if (docRows.length) sections.push({ title: 'Propiedades del documento', rows: docRows });

  const appRows: MetadataRow[] = [];
  if (meta.application) appRows.push({ label: 'Aplicación', value: meta.application });
  if (meta.appVersion) appRows.push({ label: 'Versión', value: meta.appVersion });
  if (meta.company) appRows.push({ label: 'Empresa', value: meta.company, sensitive: true });
  if (meta.manager) appRows.push({ label: 'Gerente/Responsable', value: meta.manager, sensitive: true });
  if (meta.totalEditTime) appRows.push({ label: 'Tiempo total de edición', value: `${meta.totalEditTime} min` });
  if (meta.pages) appRows.push({ label: 'Páginas', value: meta.pages });
  if (meta.words) appRows.push({ label: 'Palabras', value: meta.words });
  if (meta.characters) appRows.push({ label: 'Caracteres', value: meta.characters });
  if (appRows.length) sections.push({ title: 'Aplicación de origen', rows: appRows });

  const hasSensitiveData = [...docRows, ...appRows].some((r) => r.sensitive);

  return { fileName: file.name, fileSize: file.size, fileType: file.type, lastModified: file.lastModified, sections, hasSensitiveData };
}

async function analyzeLegacyOffice(file: File, bytes: Uint8Array): Promise<AnalysisResult> {
  const sections: MetadataSection[] = [fileInfoSection(file)];
  const meta = extractLegacyOfficeMetadata(bytes);

  const docRows: MetadataRow[] = [];
  if (meta.title) docRows.push({ label: 'Título', value: meta.title });
  if (meta.subject) docRows.push({ label: 'Asunto', value: meta.subject });
  if (meta.author) docRows.push({ label: 'Autor original', value: meta.author, sensitive: true });
  if (meta.lastAuthor) docRows.push({ label: 'Última modificación por', value: meta.lastAuthor, sensitive: true });
  if (meta.keywords) docRows.push({ label: 'Palabras clave', value: meta.keywords });
  if (meta.comments) docRows.push({ label: 'Comentarios', value: meta.comments });
  if (meta.template) docRows.push({ label: 'Plantilla', value: meta.template });
  if (meta.revisionNumber) docRows.push({ label: 'Número de revisión', value: meta.revisionNumber });
  if (meta.createTime) docRows.push({ label: 'Fecha de creación', value: formatDate(meta.createTime)! });
  if (meta.lastSavedTime) docRows.push({ label: 'Fecha de última modificación', value: formatDate(meta.lastSavedTime)! });
  if (meta.lastPrinted) docRows.push({ label: 'Fecha de última impresión', value: formatDate(meta.lastPrinted)! });
  if (docRows.length) sections.push({ title: 'Propiedades del documento', rows: docRows });

  const appRows: MetadataRow[] = [];
  if (meta.appName) appRows.push({ label: 'Aplicación', value: meta.appName });
  if (meta.company) appRows.push({ label: 'Empresa', value: meta.company, sensitive: true });
  if (meta.manager) appRows.push({ label: 'Gerente/Responsable', value: meta.manager, sensitive: true });
  if (meta.pageCount !== undefined) appRows.push({ label: 'Páginas', value: String(meta.pageCount) });
  if (meta.wordCount !== undefined) appRows.push({ label: 'Palabras', value: String(meta.wordCount) });
  if (meta.charCount !== undefined) appRows.push({ label: 'Caracteres', value: String(meta.charCount) });
  if (appRows.length) sections.push({ title: 'Aplicación de origen', rows: appRows });

  if (docRows.length === 0 && appRows.length === 0) {
    sections.push({
      title: 'Propiedades del documento',
      rows: [{ label: 'Estado', value: 'Este archivo no tiene propiedades de resumen (Summary Information) establecidas.' }],
    });
  }

  const hasSensitiveData = [...docRows, ...appRows].some((r) => r.sensitive);

  return { fileName: file.name, fileSize: file.size, fileType: file.type, lastModified: file.lastModified, sections, hasSensitiveData };
}

function analyzePdf(file: File, bytes: Uint8Array): AnalysisResult {
  const sections: MetadataSection[] = [fileInfoSection(file)];
  const meta = extractPdfMetadata(bytes);

  const docRows: MetadataRow[] = [];
  if (meta.version) docRows.push({ label: 'Versión de PDF', value: meta.version });
  if (meta.pageCount !== undefined) docRows.push({ label: 'Páginas', value: String(meta.pageCount) });
  if (meta.title) docRows.push({ label: 'Título', value: meta.title });
  if (meta.subject) docRows.push({ label: 'Asunto', value: meta.subject });
  if (meta.keywords) docRows.push({ label: 'Palabras clave', value: meta.keywords });
  if (meta.author) docRows.push({ label: 'Autor', value: meta.author, sensitive: true });
  if (meta.creator) docRows.push({ label: 'Aplicación (Creator)', value: meta.creator });
  if (meta.producer) docRows.push({ label: 'Productor (Producer)', value: meta.producer });
  if (meta.creationDate) docRows.push({ label: 'Fecha de creación', value: formatDate(meta.creationDate)! });
  if (meta.modDate) docRows.push({ label: 'Fecha de modificación', value: formatDate(meta.modDate)! });

  if (docRows.length) {
    sections.push({ title: 'Propiedades del documento', rows: docRows });
  } else {
    sections.push({
      title: 'Propiedades del documento',
      rows: [{ label: 'Estado', value: 'No se encontraron propiedades de documento (Info dictionary).' }],
    });
  }

  if (meta.xmpCreatorTool || meta.xmpCreateDate || meta.xmpModifyDate) {
    const xmpRows: MetadataRow[] = [];
    if (meta.xmpCreatorTool) xmpRows.push({ label: 'Herramienta (XMP)', value: meta.xmpCreatorTool });
    if (meta.xmpCreateDate) xmpRows.push({ label: 'Fecha de creación (XMP)', value: meta.xmpCreateDate });
    if (meta.xmpModifyDate) xmpRows.push({ label: 'Fecha de modificación (XMP)', value: meta.xmpModifyDate });
    sections.push({ title: 'Metadatos XMP', rows: xmpRows });
  }

  if (meta.isEncrypted) {
    sections.push({
      title: 'Seguridad',
      rows: [
        {
          label: 'Estado',
          value: 'El documento parece estar cifrado o protegido; algunos metadatos podrían no mostrarse correctamente.',
        },
      ],
    });
  }

  const hasSensitiveData = docRows.some((r) => r.sensitive);

  return { fileName: file.name, fileSize: file.size, fileType: file.type, lastModified: file.lastModified, sections, hasSensitiveData };
}

export async function analyzeFile(file: File): Promise<AnalysisResult> {
  const extension = getExtension(file.name);
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  if (extension === '.jpg' || extension === '.jpeg') return analyzeJpeg(file, bytes);
  if (extension === '.png') return analyzePng(file, bytes);
  if (['.docx', '.xlsx', '.pptx'].includes(extension)) return analyzeOoxml(file, bytes);
  if (['.doc', '.xls', '.ppt'].includes(extension)) return analyzeLegacyOffice(file, bytes);
  if (extension === '.pdf') return analyzePdf(file, bytes);

  throw new Error(`Formato "${extension}" no soportado.`);
}
