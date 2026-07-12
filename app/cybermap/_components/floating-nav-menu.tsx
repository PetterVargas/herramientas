'use client';

import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { principalWebsiteUtm } from '@/lib/tools';

export function FloatingNavMenu() {
  const navItems = [
    {
      label: 'COR',
      href: `https://kudo.divisioncero.com/framework/cor?${principalWebsiteUtm}`,
      color: '#1d4ed8',
      title: 'Coherencia Organizacional',
    },
    {
      label: 'CAP',
      href: `https://kudo.divisioncero.com/framework/cap?${principalWebsiteUtm}`,
      color: '#7e22ce',
      title: 'Ciberseguridad en Aplicaciones',
    },
    {
      label: 'CCN',
      href: `https://kudo.divisioncero.com/framework/ccn?${principalWebsiteUtm}`,
      color: '#15803d',
      title: 'Continuidad y Cambios del Negocio',
    },
    {
      label: 'CIF',
      href: `https://kudo.divisioncero.com/framework/cif?${principalWebsiteUtm}`,
      color: '#c2410c',
      title: 'Ciberseguridad en Infrastructura',
    },
    {
      label: 'THP',
      href: `https://kudo.divisioncero.com/framework/thp?${principalWebsiteUtm}`,
      color: '#be185d',
      title: 'Ciberseguridad en Talento Humano y Proveedores',
    },
    {
      label: 'CIP',
      href: `https://kudo.divisioncero.com/framework/cip?${principalWebsiteUtm}`,
      color: '#4338ca',
      title: 'Ciberseguridad en Identidad y Puntos Finales',
    },
    {
      label: 'ADR',
      href: `https://kudo.divisioncero.com/framework/adr?${principalWebsiteUtm}`,
      color: '#b91c1c',
      title: 'Análisis, Detección y Respuesta de Ciberseguridad',
    },
    {
      label: 'DIA',
      href: `https://kudo.divisioncero.com/framework/dia?${principalWebsiteUtm}`,
      color: '#0e7490',
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
    <div className="absolute bottom-4 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 transform border border-gray-700 bg-black">
      <nav className="flex w-full items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={startIndex === 0}
          className="flex h-12 w-8 items-center justify-center bg-black text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex flex-1 overflow-hidden">
          {navItems.slice(startIndex, startIndex + 3).map((item, index) => (
            <a
              key={`mobile-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              className="flex h-12 flex-1 items-center justify-center border-r border-gray-700 bg-black text-center transition-colors last:border-r-0 hover:bg-gray-900 md:hidden"
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
              className="hidden h-12 flex-1 items-center justify-center border-r border-gray-700 bg-black text-center transition-colors last:border-r-0 hover:bg-gray-900 md:flex lg:hidden"
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
              className="hidden h-12 flex-1 items-center justify-center border-r border-gray-700 bg-black text-center transition-colors last:border-r-0 hover:bg-gray-900 lg:flex"
              style={{ color: item.color }}
            >
              <span className="font-bold">{item.label}</span>
            </a>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex >= navItems.length - 3}
          className="flex h-12 w-8 items-center justify-center bg-black text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
