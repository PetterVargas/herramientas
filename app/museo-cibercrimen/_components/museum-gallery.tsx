'use client';

import { useState } from 'react';
import { Landmark } from 'lucide-react';

import { useMuseumPhotos } from '../_lib/use-museum-photos';
import type { GalleryPhoto } from '../_lib/types';
import { PhotoDialog } from './photo-dialog';

function GallerySkeleton() {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-muted mb-4 animate-pulse rounded-lg break-inside-avoid"
          style={{ height: `${180 + (i % 3) * 60}px` }}
        />
      ))}
    </div>
  );
}

export function MuseumGallery() {
  const { photos, loading, error } = useMuseumPhotos();
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  if (loading) {
    return <GallerySkeleton />;
  }

  if (error || !photos || photos.length === 0) {
    return (
      <div className="border-border text-muted-foreground flex flex-col items-center gap-3 rounded-lg border border-dashed py-20 text-center">
        <Landmark className="h-10 w-10" />
        <p className="max-w-md text-sm">
          Todavía no hay fotos disponibles en el museo. Vuelve a intentarlo en unos minutos.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {photos.map((photo) => (
          <div key={photo.id} className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setSelected(photo)}
              className="focus-visible:ring-ring group block w-full overflow-hidden focus-visible:ring-2 focus-visible:outline-none"
            >
              <img
                src={`/museo-cibercrimen/${photo.id}-thumb.webp`}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            <p className="bg-card px-2 py-1.5 text-xs text-muted-foreground">
              Foto de{' '}
              <a
                href={photo.credit.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-foreground font-medium underline underline-offset-2"
              >
                {photo.credit.name}
              </a>
            </p>
          </div>
        ))}
      </div>

      <PhotoDialog photo={selected} onClose={() => setSelected(null)} />
    </>
  );
}
