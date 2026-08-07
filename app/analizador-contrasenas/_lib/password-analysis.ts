// Modelo educativo de estimación de fortaleza: no reemplaza herramientas
// especializadas (p. ej. zxcvbn), pero ilustra los factores que más importan.

const commonPasswords = new Set([
  '123456', 'password', '123456789', '12345678', '12345', 'qwerty', 'abc123',
  'password1', '111111', '1234567', 'admin', 'letmein', 'welcome', 'monkey',
  'dragon', 'iloveyou', 'sunshine', 'master', 'football', 'shadow', 'michael',
  'superman', 'batman', 'trustno1', 'starwars', 'princess', 'solo', 'whatever',
  'freedom', '121212', '000000', 'qazwsx', '1q2w3e4r', 'asdfghjkl', 'passw0rd',
  'p@ssword', 'contraseña', 'contrasena', 'contrasena123', '12345678910',
  'qwerty123', '1234567890', 'iloveyou1', 'test123', 'changeme', 'default',
  'root', 'guest', 'usuario', 'login', '123123', 'aaaaaa', 'zxcvbn', 'asdasd',
  '654321', 'hola123', 'america', 'mexico', 'chile123',
]);

const sequenceAlphabets = [
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
];

function hasSequential(lower: string, runLength = 4): boolean {
  for (const alphabet of sequenceAlphabets) {
    for (let i = 0; i <= alphabet.length - runLength; i++) {
      const forward = alphabet.slice(i, i + runLength);
      const backward = [...forward].reverse().join('');
      if (lower.includes(forward) || lower.includes(backward)) return true;
    }
  }
  return false;
}

function hasRepeatedRun(password: string, runLength = 3): boolean {
  for (let i = 0; i <= password.length - runLength; i++) {
    const slice = password.slice(i, i + runLength);
    if ([...slice].every((c) => c === slice[0])) return true;
  }
  return false;
}

const asciiSymbolRegex = /[!-/:-@[-`{-~]/;

export interface CharPools {
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  symbols: boolean;
  other: boolean;
}

export type Strength = 'muy-debil' | 'debil' | 'regular' | 'fuerte' | 'muy-fuerte';

export interface PasswordAnalysis {
  length: number;
  pools: CharPools;
  poolSize: number;
  rawEntropyBits: number;
  effectiveEntropyBits: number;
  warnings: string[];
  strength: Strength;
}

export function analyzePassword(password: string): PasswordAnalysis {
  const length = password.length;
  const lower = password.toLowerCase();

  const pools: CharPools = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digits: /[0-9]/.test(password),
    symbols: asciiSymbolRegex.test(password),
    other: /[^\x00-\x7F]/.test(password),
  };

  let poolSize = 0;
  if (pools.lowercase) poolSize += 26;
  if (pools.uppercase) poolSize += 26;
  if (pools.digits) poolSize += 10;
  if (pools.symbols) poolSize += 33;
  if (pools.other) poolSize += 100;

  const rawEntropyBits = length > 0 && poolSize > 0 ? length * Math.log2(poolSize) : 0;

  const warnings: string[] = [];
  let effectiveEntropyBits = rawEntropyBits;

  if (length > 0 && length < 8) {
    warnings.push('Es muy corta: se recomiendan al menos 12 caracteres.');
  }

  const classesUsed = [pools.lowercase, pools.uppercase, pools.digits, pools.symbols].filter(
    Boolean,
  ).length;
  if (length > 0 && length < 20 && classesUsed === 1) {
    warnings.push('Usa un solo tipo de carácter, lo que reduce mucho las combinaciones posibles.');
  }

  if (length > 0 && hasSequential(lower)) {
    warnings.push('Contiene una secuencia predecible (como "abcd", "1234" o "qwerty").');
    effectiveEntropyBits -= 15;
  }

  if (length > 0 && hasRepeatedRun(password)) {
    warnings.push('Contiene caracteres repetidos consecutivos (como "aaa" o "111").');
    effectiveEntropyBits -= 10;
  }

  if (commonPasswords.has(lower)) {
    warnings.push(
      'Está entre las contraseñas más usadas del mundo: los atacantes la prueban primero, sin importar su longitud.',
    );
    effectiveEntropyBits = Math.min(effectiveEntropyBits, 10);
  }

  effectiveEntropyBits = Math.max(0, effectiveEntropyBits);

  let strength: Strength = 'muy-debil';
  if (length > 0) {
    if (effectiveEntropyBits < 28) strength = 'muy-debil';
    else if (effectiveEntropyBits < 45) strength = 'debil';
    else if (effectiveEntropyBits < 60) strength = 'regular';
    else if (effectiveEntropyBits < 80) strength = 'fuerte';
    else strength = 'muy-fuerte';
  }

  return { length, pools, poolSize, rawEntropyBits, effectiveEntropyBits, warnings, strength };
}
