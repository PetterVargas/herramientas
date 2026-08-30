'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { PracticeItem, practiceItems } from '../_lib/practice-items';
import { PracticeDialog } from './practice-dialog';

const categoryLabels: Record<PracticeItem['category'], string> = {
  dispositivos: 'Dispositivos',
  contrasenas: 'Contraseñas',
  red: 'Red y Wi-Fi',
  correo: 'Correo y Phishing',
  fisica: 'Seguridad física',
  colaboracion: 'Colaboración',
};

const categoryDotColors: Record<PracticeItem['category'], string> = {
  dispositivos: 'bg-sky-500',
  contrasenas: 'bg-purple-500',
  red: 'bg-cyan-500',
  correo: 'bg-orange-500',
  fisica: 'bg-amber-500',
  colaboracion: 'bg-green-500',
};

const categoryHoverColors: Record<PracticeItem['category'], string> = {
  dispositivos: 'hover:bg-sky-100 dark:hover:bg-sky-950',
  contrasenas: 'hover:bg-purple-100 dark:hover:bg-purple-950',
  red: 'hover:bg-cyan-100 dark:hover:bg-cyan-950',
  correo: 'hover:bg-orange-100 dark:hover:bg-orange-950',
  fisica: 'hover:bg-amber-100 dark:hover:bg-amber-950',
  colaboracion: 'hover:bg-green-100 dark:hover:bg-green-950',
};

const categoryRevealedColors: Record<PracticeItem['category'], string> = {
  dispositivos: 'bg-sky-200 dark:bg-sky-900',
  contrasenas: 'bg-purple-200 dark:bg-purple-900',
  red: 'bg-cyan-200 dark:bg-cyan-900',
  correo: 'bg-orange-200 dark:bg-orange-900',
  fisica: 'bg-amber-200 dark:bg-amber-900',
  colaboracion: 'bg-green-200 dark:bg-green-900',
};

const categories = Object.keys(categoryLabels) as PracticeItem['category'][];

export function PracticeGrid() {
  const [selectedItem, setSelectedItem] = useState<PracticeItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  const handleItemClick = (item: PracticeItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
    setRevealedIds((prev) => new Set([...prev, item.id]));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleReset = () => {
    setRevealedIds(new Set());
    setSelectedItem(null);
  };

  return (
    <div className="w-full space-y-6">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Progreso: {revealedIds.size}/{practiceItems.length}
            </h3>
            <p className="text-muted-foreground text-sm">
              Haz clic en cualquier cuadro, discutan en equipo si es buena o mala práctica y
              revelen la respuesta
            </p>
          </div>
          <Button variant="outline" onClick={handleReset}>
            Reiniciar
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded ${categoryDotColors[category]}`} />
              <span className="text-xs">{categoryLabels[category]}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-10 md:gap-4">
          {practiceItems.map((item) => {
            const isRevealed = revealedIds.has(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`border-border flex aspect-square min-h-[3.5rem] items-center justify-center rounded-lg border-2 text-lg font-bold transition-all md:min-h-[4rem] md:text-xl ${
                  isRevealed
                    ? categoryRevealedColors[item.category]
                    : `bg-background ${categoryHoverColors[item.category]}`
                } focus:ring-ring hover:scale-105 focus:ring-2 focus:outline-none`}
                data-test={`practice-${item.id}`}
                aria-label={`Práctica ${item.id}`}
              >
                {item.id}
              </button>
            );
          })}
        </div>
      </Card>

      <PracticeDialog item={selectedItem} isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
}
