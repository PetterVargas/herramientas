export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(file: File): FileValidationResult {
  if (file.size === 0) {
    return { valid: false, error: 'El archivo está vacío.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `El archivo pesa ${(file.size / (1024 * 1024)).toFixed(2)} MB, y el límite es 10 MB.`,
    };
  }

  return { valid: true };
}
