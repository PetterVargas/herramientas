import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import { basename, join } from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

// Redimensiona las fotos descargadas por museo-fetch.ts a .webp (preservando
// aspect ratio, sin recortar) y genera public/museo-cibercrimen/index.json
// con la metadata + créditos que consume la página del museo en runtime.

interface RawPhoto {
  id: string;
  width: number;
  height: number;
  description: string | null;
  alt_description: string | null;
  user: { name: string; username: string; links: { html: string } };
  links: { html: string };
}

interface GalleryPhoto {
  id: string;
  width: number;
  height: number;
  alt: string;
  credit: { name: string; profileUrl: string };
  unsplashUrl: string;
}

const DIR_DOWNLOADS = 'downloads/museo-cibercrimen';
const DIR_PUBLIC = 'public/museo-cibercrimen';
const FULL_MAX = 1600;
const THUMB_MAX = 480;

async function resizeTo(inputPath: string, outputPath: string, max: number) {
  const info = await sharp(inputPath)
    .resize(max, max, { fit: 'inside', withoutEnlargement: true })
    .toFormat('webp', { quality: max === THUMB_MAX ? 75 : 82 })
    .toFile(outputPath);
  return { width: info.width, height: info.height };
}

async function main() {
  const rawPath = join(DIR_DOWNLOADS, 'raw.json');
  if (!existsSync(rawPath)) {
    console.warn('[museo-process] No hay raw.json (museo-fetch no corrió o se omitió). Nada que procesar.');
    return;
  }

  const rawPhotos: RawPhoto[] = JSON.parse(await fs.readFile(rawPath, 'utf8'));
  await fs.mkdir(DIR_PUBLIC, { recursive: true });

  const gallery: GalleryPhoto[] = [];

  for (const photo of rawPhotos) {
    const source = join(DIR_DOWNLOADS, `${photo.id}.jpg`);
    if (!existsSync(source)) {
      console.warn(`[museo-process] Falta el archivo descargado de ${photo.id}, se omite.`);
      continue;
    }

    const fullTarget = join(DIR_PUBLIC, `${photo.id}.webp`);
    const thumbTarget = join(DIR_PUBLIC, `${photo.id}-thumb.webp`);

    const full = existsSync(fullTarget)
      ? await sharp(fullTarget).metadata()
      : await resizeTo(source, fullTarget, FULL_MAX);
    if (!existsSync(thumbTarget)) {
      await resizeTo(source, thumbTarget, THUMB_MAX);
    }

    gallery.push({
      id: photo.id,
      width: full.width ?? photo.width,
      height: full.height ?? photo.height,
      alt: photo.alt_description ?? photo.description ?? 'Foto del Museo del Cibercrimen',
      credit: { name: photo.user.name, profileUrl: photo.user.links.html },
      unsplashUrl: photo.links.html,
    });

    console.log('[museo-process] Procesada:', photo.id, `(${basename(fullTarget)})`);
  }

  await fs.writeFile(join(DIR_PUBLIC, 'index.json'), JSON.stringify(gallery, null, 2), 'utf8');
  console.log(`[museo-process] index.json generado con ${gallery.length} fotos.`);
}

main().catch((error) => {
  console.error('[museo-process] Error inesperado:', error);
  process.exit(0);
});
