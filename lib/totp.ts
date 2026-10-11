// Implementación de TOTP (RFC 6238) sobre HOTP (RFC 4226) usando Web Crypto.
// Todo se calcula en el navegador: la clave secreta nunca sale del dispositivo.

export type TotpAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

export interface TotpOptions {
  digits: number;
  period: number;
  algorithm: TotpAlgorithm;
}

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/** Normaliza una clave Base32: quita espacios, guiones y relleno, y pasa a mayúsculas. */
export function normalizeBase32(secret: string): string {
  return secret.replace(/[\s-]/g, '').replace(/=+$/, '').toUpperCase();
}

/** Decodifica Base32 (RFC 4648). Lanza un error si hay caracteres inválidos. */
export function base32Decode(secret: string): Uint8Array<ArrayBuffer> {
  const clean = normalizeBase32(secret);
  if (!clean) throw new Error('La clave secreta está vacía');

  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;

  for (const char of clean) {
    const value = BASE32_ALPHABET.indexOf(char);
    if (value === -1) {
      throw new Error(`Carácter inválido en Base32: "${char}"`);
    }
    buffer = (buffer << 5) | value;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }

  return new Uint8Array(bytes);
}

/** Codifica bytes en Base32 sin relleno. */
export function base32Encode(bytes: Uint8Array): string {
  let output = '';
  let buffer = 0;
  let bits = 0;

  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      output += BASE32_ALPHABET[(buffer >> bits) & 31];
    }
  }
  if (bits > 0) {
    output += BASE32_ALPHABET[(buffer << (5 - bits)) & 31];
  }

  return output;
}

/** Genera una clave aleatoria en Base32 (20 bytes = 160 bits, lo recomendado para SHA-1). */
export function generateSecret(byteLength = 20): string {
  return base32Encode(crypto.getRandomValues(new Uint8Array(byteLength)));
}

/** Calcula un código HOTP para un contador dado. */
export async function generateHotp(
  key: Uint8Array<ArrayBuffer>,
  counter: number,
  digits: number,
  algorithm: TotpAlgorithm,
): Promise<string> {
  const counterBytes = new ArrayBuffer(8);
  const view = new DataView(counterBytes);
  // El contador es un entero de 64 bits big-endian.
  view.setUint32(0, Math.floor(counter / 2 ** 32));
  view.setUint32(4, counter >>> 0);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign'],
  );
  const hmac = new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, counterBytes));

  // Truncamiento dinámico (RFC 4226 §5.3).
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    (hmac[offset + 1] << 16) |
    (hmac[offset + 2] << 8) |
    hmac[offset + 3];

  return (binary % 10 ** digits).toString().padStart(digits, '0');
}

/** Calcula el código TOTP para un instante (en milisegundos). */
export async function generateTotp(
  secret: string,
  { digits, period, algorithm }: TotpOptions,
  timestampMs = Date.now(),
): Promise<string> {
  const counter = Math.floor(timestampMs / 1000 / period);
  return generateHotp(base32Decode(secret), counter, digits, algorithm);
}

/** Construye una URI otpauth:// compatible con Google Authenticator, Authy, etc. */
export function buildOtpauthUri(
  secret: string,
  { digits, period, algorithm }: TotpOptions,
  issuer: string,
  account: string,
): string {
  const label = issuer
    ? `${encodeURIComponent(issuer)}:${encodeURIComponent(account || 'usuario')}`
    : encodeURIComponent(account || 'usuario');
  const params = new URLSearchParams({
    secret: normalizeBase32(secret),
    algorithm: algorithm.replace('-', ''),
    digits: String(digits),
    period: String(period),
  });
  if (issuer) params.set('issuer', issuer);
  return `otpauth://totp/${label}?${params.toString()}`;
}
