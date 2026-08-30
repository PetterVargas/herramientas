export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const ACCEPTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.join(',');

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? '' : filename.slice(dot).toLowerCase();
}

type SignatureFamily = 'jpeg' | 'png' | 'pdf' | 'zip' | 'ole2' | 'unknown';

const extensionFamily: Record<string, SignatureFamily> = {
  '.jpg': 'jpeg',
  '.jpeg': 'jpeg',
  '.png': 'png',
  '.pdf': 'pdf',
  '.docx': 'zip',
  '.xlsx': 'zip',
  '.pptx': 'zip',
  '.doc': 'ole2',
  '.xls': 'ole2',
  '.ppt': 'ole2',
};

function detectSignature(bytes: Uint8Array): SignatureFamily {
  const startsWith = (sig: number[]) => sig.every((byte, i) => bytes[i] === byte);
  if (startsWith([0xff, 0xd8, 0xff])) return 'jpeg';
  if (startsWith([0x89, 0x50, 0x4e, 0x47])) return 'png';
  if (startsWith([0x25, 0x50, 0x44, 0x46])) return 'pdf';
  if (startsWith([0x50, 0x4b, 0x03, 0x04]) || startsWith([0x50, 0x4b, 0x05, 0x06])) return 'zip';
  if (startsWith([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return 'ole2';
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
      error: `Formato "${extension || 'desconocido'}" no permitido. Formatos aceptados: PNG, JPG/JPEG, PDF, y ofimática (doc, docx, xls, xlsx, ppt, pptx).`,
    };
  }

  const headBytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const expectedFamily = extensionFamily[extension];
  const detectedFamily = detectSignature(headBytes);

  if (expectedFamily && detectedFamily !== 'unknown' && detectedFamily !== expectedFamily) {
    return {
      valid: true,
      warning: `La extensión "${extension}" no coincide con la firma de bytes detectada (parece ser de tipo "${detectedFamily}"). El análisis podría fallar o ser incorrecto.`,
    };
  }

  return { valid: true };
}
