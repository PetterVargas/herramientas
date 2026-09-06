'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

const LINK_DISTANCE = 140;

/**
 * Decorative canvas starfield behind the map — drifting, twinkling nodes
 * with faint connecting lines, mirroring the site's hero background
 * (components/hero-universe.tsx in divisioncero.com) but slowed down further
 * so it reads as a calm backdrop the map floats over, not a focal point.
 */
export function MapCosmicBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let color = '77, 174, 132';

    const readColor = () => {
      // Resolve --primary (may be hsl()/oklch()/etc.) to rgb(...) via a
      // throwaway probe element, since computed style normalizes `color`
      // to rgb() regardless of the source color function.
      const probe = document.createElement('div');
      probe.style.color = 'var(--primary)';
      probe.style.display = 'none';
      container.appendChild(probe);
      const resolved = getComputedStyle(probe).color;
      container.removeChild(probe);
      const match = resolved.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (match) color = `${match[1]}, ${match[2]}, ${match[3]}`;
    };

    const createParticles = () => {
      const count = Math.min(90, Math.max(30, Math.round((width * height) / 14000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        r: Math.random() * 1.6 + 0.6,
        twinkleSpeed: Math.random() * 0.001 + 0.0004,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColor();
      createParticles();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.16;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const twinkle = 0.5 + Math.sin(now * p.twinkleSpeed + p.twinklePhase) * 0.3;
        ctx.fillStyle = `rgba(${color}, ${Math.max(0.2, twinkle)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();

    const tick = (time: number) => draw(time * 1000);
    gsap.ticker.add(tick);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    // --primary is theme-independent right now, but re-read on theme
    // toggles too in case that ever changes.
    const themeObserver = new MutationObserver(() => readColor());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <div className="from-primary/5 dark:from-primary/10 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
