import 'dotenv/config';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

// Descarga las fotos de la colección de Unsplash del Museo del Cibercrimen:
// https://unsplash.com/collections/BZ5AqzaA0Xs/museo-del-cibercrimen
//
// Mismo patrón que /cover (fetch + process en build), pero tolerante a fallos:
// si faltan credenciales o la API falla, este script solo avisa y sale con
// código 0, en vez de tumbar el build de las otras 18 herramientas del sitio.

interface Photo {
  id: string;
  width: number;
  height: number;
  description: string | null;
  alt_description: string | null;
  user: {
    name: string;
    username: string;
    links: { html: string };
  };
  links: { html: string; download_location: string };
  urls: { regular: string };
}

const BASE_URL = 'https://api.unsplash.com';
const DIR_DOWNLOADS = 'downloads/museo-cibercrimen';
const PER_PAGE = 30;
const USE_CACHE = true;

const { UNSPLASH_ACCESS_KEY, UNSPLASH_COLLECTION_ID } = process.env;

if (!UNSPLASH_ACCESS_KEY || !UNSPLASH_COLLECTION_ID) {
  console.warn(
    '[museo-fetch] Falta UNSPLASH_ACCESS_KEY o UNSPLASH_COLLECTION_ID: se omite la descarga. ' +
      'La página del museo quedará sin imágenes hasta que estas variables estén configuradas.'
  );
  process.exit(0);
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Unsplash API respondió ${res.status} para ${url}`);
  }
  return res.json() as Promise<T>;
}

async function main() {
  await fs.mkdir(DIR_DOWNLOADS, { recursive: true });

  const cachePath = join(DIR_DOWNLOADS, 'raw.json');
  const photos: Photo[] = [];

  const cached: Photo[] = USE_CACHE && existsSync(cachePath)
    ? JSON.parse(await fs.readFile(cachePath, 'utf8'))
    : [];

  // Una caché vacía (colección sin fotos en el momento del fetch anterior) no
  // cuenta como válida: si confiáramos en ella, una foto agregada después a
  // la colección nunca se volvería a detectar en builds futuros.
  if (cached.length > 0) {
    console.log('[museo-fetch] Usando caché local...');
    photos.push(...cached);
  } else {
    for (let page = 1; ; page++) {
      console.log('[museo-fetch] Página:', page);
      const url = `${BASE_URL}/collections/${UNSPLASH_COLLECTION_ID}/photos?client_id=${UNSPLASH_ACCESS_KEY}&per_page=${PER_PAGE}&page=${page}`;
      const newPhotos = await fetchJson<Photo[]>(url);
      photos.push(...newPhotos);
      if (newPhotos.length < PER_PAGE) break;
    }
    await fs.writeFile(cachePath, JSON.stringify(photos, null, 2), 'utf8');

    // Requerido por las guidelines de la Unsplash API: cada foto "usada" debe
    // disparar un GET a su download_location para contar hacia las stats del
    // fotógrafo. https://help.unsplash.com/en/articles/2511258
    await Promise.all(
      photos.map((photo) =>
        fetch(`${photo.links.download_location}&client_id=${UNSPLASH_ACCESS_KEY}`).catch((error) =>
          console.warn(`[museo-fetch] No se pudo notificar download de ${photo.id}:`, error)
        )
      )
    );
  }

  console.log('[museo-fetch] Colección:', `https://unsplash.com/collections/${UNSPLASH_COLLECTION_ID}`);
  console.log('[museo-fetch] Total de fotos:', photos.length);

  for (const photo of photos) {
    const target = join(DIR_DOWNLOADS, `${photo.id}.jpg`);
    if (existsSync(target)) {
      console.log(`[museo-fetch] Skip: ${photo.id}`);
      continue;
    }
    console.log(`[museo-fetch] Descargando: ${photo.id}`);
    const res = await fetch(photo.urls.regular);
    if (!res.ok) {
      console.error(`[museo-fetch] Falló la descarga de ${photo.id}: HTTP ${res.status}`);
      continue;
    }
    await fs.writeFile(target, Buffer.from(await res.arrayBuffer()));
  }
}

main().catch((error) => {
  console.error('[museo-fetch] Error inesperado, se omite la actualización del museo:', error);
  process.exit(0);
});
