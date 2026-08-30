export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export interface AcceptedFormat {
  label: string;
  extensions: string[];
}

export const ACCEPTED_FORMATS: AcceptedFormat[] = [
  { label: 'PDF', extensions: ['.pdf'] },
  { label: 'ZIP', extensions: ['.zip'] },
  { label: 'RAR', extensions: ['.rar'] },
  { label: 'Imágenes', extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'] },
  { label: 'Ofimática', extensions: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'] },
];

export const ACCEPTED_EXTENSIONS = ACCEPTED_FORMATS.flatMap((f) => f.extensions);

export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.join(',');

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? '' : filename.slice(dot).toLowerCase();
}

/**
 * Firmas de bytes (magic numbers) para dar una segunda señal además de la
 * extensión. Los formatos OOXML (docx/xlsx/pptx) son en realidad ZIP, así
 * que comparten firma con .zip: no se puede distinguir uno de otro solo con
 * los primeros bytes, por eso se agrupan en la misma familia "zip".
 */
type SignatureFamily = 'pdf' | 'zip' | 'rar' | 'jpeg' | 'png' | 'gif' | 'bmp' | 'webp' | 'ole2' | 'svg' | 'unknown';

const extensionFamily: Record<string, SignatureFamily> = {
  '.pdf': 'pdf',
  '.zip': 'zip',
  '.docx': 'zip',
  '.xlsx': 'zip',
  '.pptx': 'zip',
  '.rar': 'rar',
  '.jpg': 'jpeg',
  '.jpeg': 'jpeg',
  '.png': 'png',
  '.gif': 'gif',
  '.bmp': 'bmp',
  '.webp': 'webp',
  '.svg': 'svg',
  '.doc': 'ole2',
  '.xls': 'ole2',
  '.ppt': 'ole2',
};

function detectSignature(bytes: Uint8Array): SignatureFamily {
  const b = bytes;
  const startsWith = (sig: number[]) => sig.every((byte, i) => b[i] === byte);

  if (startsWith([0x25, 0x50, 0x44, 0x46])) return 'pdf'; // %PDF
  if (startsWith([0x50, 0x4b, 0x03, 0x04]) || startsWith([0x50, 0x4b, 0x05, 0x06])) return 'zip'; // PK..
  if (startsWith([0x52, 0x61, 0x72, 0x21, 0x1a, 0x07])) return 'rar'; // Rar!..
  if (startsWith([0xff, 0xd8, 0xff])) return 'jpeg';
  if (startsWith([0x89, 0x50, 0x4e, 0x47])) return 'png';
  if (startsWith([0x47, 0x49, 0x46, 0x38])) return 'gif';
  if (startsWith([0x42, 0x4d])) return 'bmp';
  if (
    startsWith([0x52, 0x49, 0x46, 0x46]) &&
    b[8] === 0x57 &&
    b[9] === 0x45 &&
    b[10] === 0x42 &&
    b[11] === 0x50
  )
    return 'webp'; // RIFF....WEBP
  if (startsWith([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return 'ole2';

  const head = new TextDecoder('utf-8', { fatal: false }).decode(bytes.slice(0, 256)).trimStart();
  if (head.startsWith('<svg') || head.startsWith('<?xml')) return 'svg';

  return 'unknown';
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  warning?: string;
}

export async function validateFile(file: File): Promise<FileValidationResult> {
  if (file.size === 0) {
    return { valid: false, error: 'El archivo está vacío.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `El archivo pesa ${(file.size / (1024 * 1024)).toFixed(2)} MB, y el límite es 10 MB.`,
    };
  }

  const extension = getExtension(file.name);
  if (!ACCEPTED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Formato "${extension || 'desconocido'}" no permitido. Formatos aceptados: PDF, ZIP, RAR, imágenes (jpg, png, gif, webp, bmp, svg) y ofimática (doc, docx, xls, xlsx, ppt, pptx).`,
    };
  }

  const headBytes = new Uint8Array(await file.slice(0, 64).arrayBuffer());
  const expectedFamily = extensionFamily[extension];
  const detectedFamily = detectSignature(headBytes);

  if (expectedFamily && detectedFamily !== 'unknown' && detectedFamily !== expectedFamily) {
    return {
      valid: true,
      warning: `La extensión "${extension}" no coincide con la firma de bytes detectada en el archivo (parece ser de tipo "${detectedFamily}"). Podría estar mal nombrado o corrupto.`,
    };
  }

  return { valid: true };
}
