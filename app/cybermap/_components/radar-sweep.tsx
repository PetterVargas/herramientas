'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

/**
 * Decorative "radar monitoring" beam that sweeps left to right across the
 * map, echoing the scan-line look of a cybersecurity monitoring console.
 * Purely visual (pointer-events-none, mix-blend-mode: screen) so it never
 * interferes with map clicks or pan/zoom.
 */
export function RadarSweep({ className }: { className?: string }) {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beamEl = beamRef.current;
    if (!beamEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set(beamEl, { left: '-35%' });

    // Velocidad reducida un 70% más sobre la anterior (10.2s / 0.3 = 34s).
    const sweepTween = gsap.to(beamEl, {
      left: '100%',
      duration: 34,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      sweepTween.kill();
    };
  }, []);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ mixBlendMode: 'screen', overflow: 'hidden' }}
    >
      <div
        ref={beamRef}
        className="absolute top-0 bottom-0 w-[35%]"
        // Opacidad del sombreado reducida un 50% (0.35 -> 0.175, 0.55 -> 0.275).
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(77, 174, 132, 0.175) 60%, rgba(150, 255, 210, 0.275) 92%, transparent)',
        }}
      />
    </div>
  );
}
