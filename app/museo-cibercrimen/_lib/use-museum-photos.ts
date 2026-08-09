'use client';

import { useEffect, useState } from 'react';

import type { GalleryPhoto } from './types';

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function useMuseumPhotos() {
  const [photos, setPhotos] = useState<GalleryPhoto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/museo-cibercrimen/index.json');

        if (!response.ok) {
          throw new Error(`Error cargando la galería: ${response.statusText}`);
        }

        const data = (await response.json()) as GalleryPhoto[];
        setPhotos(shuffle(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido cargando la galería');
        console.error('Error loading museum photos:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadPhotos();
  }, []);

  return { photos, loading, error };
}
