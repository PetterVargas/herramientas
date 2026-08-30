'use client';

import { useState } from 'react';
import { UserRoundSearch, VideoOff, DollarSign, TrendingUp, type LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { phases, type SextortionPhase } from '../_lib/phases';

const icons: Record<SextortionPhase, LucideIcon> = {
  contacto: UserRoundSearch,
  obtencion: VideoOff,
  amenaza: DollarSign,
  escalada: TrendingUp,
};

export function SextortionPhaseCards() {
  const [active, setActive] = useState<SextortionPhase>('contacto');
  const current = phases.find((p) => p.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase) => {
          const Icon = icons[phase.id];
          const isActive = phase.id === active;

          return (
            <button
              key={phase.id}
              onClick={() => setActive(phase.id)}
              className="text-left"
              data-test={`phase-tab-${phase.id}`}
            >
              <Card
                className={cn(
                  'h-full cursor-pointer transition-all hover:shadow-md',
                  isActive && `ring-2 ${phase.ring}`,
                )}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <Icon className={cn('h-6 w-6 shrink-0', phase.color)} />
                  <div>
                    <CardTitle className="text-base">{phase.name}</CardTitle>
                    <CardDescription className="text-xs">{phase.question}</CardDescription>
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
            <h4 className="mb-2 text-sm font-semibold">¿Por qué funciona?</h4>
            <p className="text-muted-foreground text-sm">{current.principle}</p>

            <h4 className="mt-4 mb-2 text-sm font-semibold">Tácticas comunes</h4>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              {current.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Señales de alerta y qué hacer</h4>
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
