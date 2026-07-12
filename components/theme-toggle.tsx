'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle({
  className,
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita el mismatch de hidratación: resolvedTheme no se conoce en el
  // primer render del servidor (depende de la preferencia del sistema).
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={
        className ??
        'p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
      }
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4.5 w-4.5" />
        ) : (
          <Moon className="h-4.5 w-4.5" />
        )
      ) : (
        <span className="block h-4.5 w-4.5" />
      )}
      {showLabel && <span>{mounted && isDark ? 'Modo claro' : 'Modo oscuro'}</span>}
    </button>
  );
}
