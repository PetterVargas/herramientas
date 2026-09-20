export interface FileHashes {
  MD5: string;
  SHA1: string;
  SHA256: string;
  SHA512: string;
}

/**
 * Implementación de MD5 (RFC 1321) sobre bytes crudos. Web Crypto API no
 * soporta MD5 (está obsoleto para seguridad), así que aquí no hay atajo:
 * se calcula a mano para poder ofrecerlo igual que los demás.
 */
function md5Hex(bytes: Uint8Array): string {
  const h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];

  const bitLength = bytes.length * 8;
  const paddedLength = Math.ceil((bytes.length + 1 + 8) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[bytes.length] = 0x80;

  const view = new DataView(padded.buffer);
  // bitLength puede exceder 32 bits para archivos grandes; se escribe como
  // un entero de 64 bits little-endian (bajo, luego alto) según RFC 1321.
  view.setUint32(paddedLength - 8, bitLength >>> 0, true);
  view.setUint32(paddedLength - 4, Math.floor(bitLength / 0x100000000), true);

  const k = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ];

  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14,
    20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10,
    15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const rotateLeft = (value: number, amount: number) => (value << amount) | (value >>> (32 - amount));
  const f = (x: number, y: number, z: number) => (x & y) | (~x & z);
  const g = (x: number, y: number, z: number) => (x & z) | (y & ~z);
  const hFunc = (x: number, y: number, z: number) => x ^ y ^ z;
  const iFunc = (x: number, y: number, z: number) => y ^ (x | ~z);

  const chunk = new Uint32Array(16);

  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let j = 0; j < 16; j++) {
      chunk[j] = view.getUint32(offset + j * 4, true);
    }

    let [a, b, c, d] = h as [number, number, number, number];

    for (let j = 0; j < 64; j++) {
      let func: number;
      let gIndex: number;

      if (j < 16) {
        func = f(b, c, d);
        gIndex = j;
      } else if (j < 32) {
        func = g(b, c, d);
        gIndex = (5 * j + 1) % 16;
      } else if (j < 48) {
        func = hFunc(b, c, d);
        gIndex = (3 * j + 5) % 16;
      } else {
        func = iFunc(b, c, d);
        gIndex = (7 * j) % 16;
      }

      const temp = d;
      d = c;
      c = b;
      b = (b + rotateLeft((a + func + (k[j] ?? 0) + (chunk[gIndex] ?? 0)) >>> 0, s[j] ?? 0)) >>> 0;
      a = temp;
    }

    h[0] = ((h[0] ?? 0) + a) >>> 0;
    h[1] = ((h[1] ?? 0) + b) >>> 0;
    h[2] = ((h[2] ?? 0) + c) >>> 0;
    h[3] = ((h[3] ?? 0) + d) >>> 0;
  }

  return h
    .map((word) => {
      const le = [word & 0xff, (word >>> 8) & 0xff, (word >>> 16) & 0xff, (word >>> 24) & 0xff];
      return le.map((b) => b.toString(16).padStart(2, '0')).join('');
    })
    .join('');
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function computeFileHashes(file: File): Promise<FileHashes> {
  const buffer = await file.arrayBuffer();

  const [sha1, sha256, sha512] = await Promise.all([
    crypto.subtle.digest('SHA-1', buffer).then(bufferToHex),
    crypto.subtle.digest('SHA-256', buffer).then(bufferToHex),
    crypto.subtle.digest('SHA-512', buffer).then(bufferToHex),
  ]);

  // MD5 es puro JS y bloquea el hilo principal unos cientos de ms en
  // archivos grandes: se calcula al final para no retrasar los hashes
  // nativos de Web Crypto, que ya corren en paralelo de forma async.
  const md5 = md5Hex(new Uint8Array(buffer));

  return { MD5: md5, SHA1: sha1, SHA256: sha256, SHA512: sha512 };
}
