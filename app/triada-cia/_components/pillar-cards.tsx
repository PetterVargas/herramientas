'use client';

import { useState } from 'react';
import { Eye, ShieldCheck, Zap, type LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { pillars, type Pillar } from '../_lib/pillars';

const icons: Record<Pillar, LucideIcon> = {
  confidencialidad: Eye,
  integridad: ShieldCheck,
  disponibilidad: Zap,
};

export function PillarCards() {
  const [active, setActive] = useState<Pillar>('confidencialidad');
  const current = pillars.find((p) => p.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = icons[pillar.id];
          const isActive = pillar.id === active;

          return (
            <button
              key={pillar.id}
              onClick={() => setActive(pillar.id)}
              className="text-left"
              data-test={`pillar-tab-${pillar.id}`}
            >
              <Card
                className={cn(
                  'h-full cursor-pointer transition-all hover:shadow-md',
                  isActive && `ring-2 ${pillar.ring}`,
                )}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <Icon className={cn('h-6 w-6 shrink-0', pillar.color)} />
                  <div>
                    <CardTitle className="text-base">{pillar.name}</CardTitle>
                    <CardDescription className="text-xs">{pillar.question}</CardDescription>
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
            <h4 className="mb-2 text-sm font-semibold">Principio clave</h4>
            <p className="text-muted-foreground text-sm">{current.principle}</p>

            <h4 className="mt-4 mb-2 text-sm font-semibold">Ataques y amenazas comunes</h4>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              {current.attacks.map((attack) => (
                <li key={attack}>{attack}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Controles y mitigaciones típicas</h4>
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
