'use client';

import { useEffect, useRef, useState } from 'react';

import { Maximize2, Minimize2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export function ToolFullscreen({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    // Escape cierra el modo de pantalla completa cuando la Fullscreen API no
    // está disponible y estamos usando el overlay fijo como respaldo.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else {
        setIsFullscreen((prev) => !prev);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative',
        className,
        // Con `!` forzamos estas reglas por encima de clases del propio
        // contenedor (container, max-w-*, mx-auto, h-[...]) que de otro modo
        // dejarían huecos sin cubrir en el overlay de pantalla completa.
        isFullscreen &&
          'fixed! inset-0! z-50! m-0! h-screen! max-h-none! w-screen! max-w-none! overflow-auto! bg-background p-4! md:p-8!',
      )}
    >
      <button
        type="button"
        onClick={toggleFullscreen}
        className="text-muted-foreground/70 hover:bg-muted hover:text-foreground absolute top-1.5 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-md transition-colors"
        title={isFullscreen ? 'Salir de pantalla completa' : 'Ampliar a pantalla completa'}
        aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Ampliar a pantalla completa'}
      >
        {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
      </button>

      {children}
    </div>
  );
}
