'use client';

import { ExternalLink } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { GalleryPhoto } from '../_lib/types';

export function PhotoDialog({
  photo,
  onClose,
}: {
  photo: GalleryPhoto | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={photo !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl gap-3 p-3 sm:rounded-xl">
        {photo && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{photo.alt}</DialogTitle>
              <DialogDescription>Foto del Museo del Cibercrimen, cortesía de Unsplash.</DialogDescription>
            </DialogHeader>

            <img
              src={`/museo-cibercrimen/${photo.id}.webp`}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="max-h-[70vh] w-full rounded-lg object-contain"
            />

            <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 px-1 text-sm">
              <p>
                Foto de{' '}
                <a
                  href={photo.credit.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium underline underline-offset-2"
                >
                  {photo.credit.name}
                </a>{' '}
                en{' '}
                <a
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium underline underline-offset-2"
                >
                  Unsplash
                </a>
              </p>

              <a
                href={photo.unsplashUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-1"
              >
                Ver original
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
