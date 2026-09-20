'use client';

import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export function FloatingNavMenu() {
  const navItems = [
    {
      label: 'COR',
      href: `https://kudo.divisioncero.com/framework/cor`,
      // Verde en armonía con el brillo cyber del mapa (rgba(77, 174, 132)).
      color: '#4dae84',
      title: 'Coherencia Organizacional',
    },
    {
      label: 'CAP',
      href: `https://kudo.divisioncero.com/framework/cap`,
      color: '#4dae84',
      title: 'Ciberseguridad en Aplicaciones',
    },
    {
      label: 'CCN',
      href: `https://kudo.divisioncero.com/framework/ccn`,
      color: '#4dae84',
      title: 'Continuidad y Cambios del Negocio',
    },
    {
      label: 'CIF',
      href: `https://kudo.divisioncero.com/framework/cif`,
      color: '#4dae84',
      title: 'Ciberseguridad en Infrastructura',
    },
    {
      label: 'THP',
      href: `https://kudo.divisioncero.com/framework/thp`,
      color: '#4dae84',
      title: 'Ciberseguridad en Talento Humano y Proveedores',
    },
    {
      label: 'CIP',
      href: `https://kudo.divisioncero.com/framework/cip`,
      color: '#4dae84',
      title: 'Ciberseguridad en Identidad y Puntos Finales',
    },
    {
      label: 'ADR',
      href: `https://kudo.divisioncero.com/framework/adr`,
      color: '#4dae84',
      title: 'Análisis, Detección y Respuesta de Ciberseguridad',
    },
    {
      label: 'DIA',
      href: `https://kudo.divisioncero.com/framework/dia`,
      color: '#4dae84',
      title: 'Ciberseguridad en Datos e Inteligencia Artificial',
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(navItems.length - 3, prev + 1));
  };

  return (
    <div className="border-border bg-background/95 absolute bottom-2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 transform border shadow-lg backdrop-blur-sm">
      <nav className="flex w-full items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={startIndex === 0}
          className="bg-background text-foreground hover:bg-muted flex h-6 w-5 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
        >
          <ChevronLeft size={10} />
        </button>

        <div className="flex flex-1 overflow-hidden">
          {navItems.slice(startIndex, startIndex + 3).map((item, index) => (
            <a
              key={`mobile-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              className="border-border bg-background hover:bg-muted flex h-6 flex-1 items-center justify-center border-r text-center text-[10px] transition-colors last:border-r-0 md:hidden"
              style={{ color: item.color }}
            >
              <span className="font-bold">{item.label}</span>
            </a>
          ))}

          {navItems.map((item, index) => (
            <a
              key={`tablet-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              className="border-border bg-background hover:bg-muted hidden h-6 flex-1 items-center justify-center border-r text-center text-[10px] transition-colors last:border-r-0 md:flex lg:hidden"
              style={{ color: item.color }}
            >
              <span className="font-bold">{item.label}</span>
            </a>
          ))}

          {navItems.map((item, index) => (
            <a
              key={`desktop-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              className="border-border bg-background hover:bg-muted hidden h-6 flex-1 items-center justify-center border-r text-center text-[10px] transition-colors last:border-r-0 lg:flex"
              style={{ color: item.color }}
            >
              <span className="font-bold">{item.label}</span>
            </a>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex >= navItems.length - 3}
          className="bg-background text-foreground hover:bg-muted flex h-6 w-5 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
        >
          <ChevronRight size={10} />
        </button>
      </nav>
    </div>
  );
}
