'use client';

import { useState } from 'react';
import { Fingerprint, Puzzle, ShieldAlert, type LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { categories, type PiiCategory } from '../_lib/categories';

const icons: Record<PiiCategory, LucideIcon> = {
  directa: Fingerprint,
  indirecta: Puzzle,
  sensible: ShieldAlert,
};

export function PiiCategoryCards() {
  const [active, setActive] = useState<PiiCategory>('directa');
  const current = categories.find((c) => c.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((category) => {
          const Icon = icons[category.id];
          const isActive = category.id === active;

          return (
            <button
              key={category.id}
              onClick={() => setActive(category.id)}
              className="text-left"
              data-test={`pii-tab-${category.id}`}
            >
              <Card
                className={cn(
                  'h-full cursor-pointer transition-all hover:shadow-md',
                  isActive && `ring-2 ${category.ring}`,
                )}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <Icon className={cn('h-6 w-6 shrink-0', category.color)} />
                  <div>
                    <CardTitle className="text-base">{category.name}</CardTitle>
                    <CardDescription className="text-xs">{category.question}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={cn('text-xl', current.color)}>{current.name}</CardTitle>
          <CardDescription className="text-base">{current.definition}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold">¿Por qué importa?</h4>
            <p className="text-muted-foreground text-sm">{current.principle}</p>

            <h4 className="mt-4 mb-2 text-sm font-semibold">Ejemplos comunes</h4>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              {current.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Cómo protegerla</h4>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              {current.controls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
