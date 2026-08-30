'use client';

import { useState } from 'react';
import { UserRoundSearch, HeartHandshake, EyeOff, ShieldAlert, type LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { stages, type GroomingStage } from '../_lib/stages';

const icons: Record<GroomingStage, LucideIcon> = {
  contacto: UserRoundSearch,
  confianza: HeartHandshake,
  aislamiento: EyeOff,
  control: ShieldAlert,
};

export function GroomingStageCards() {
  const [active, setActive] = useState<GroomingStage>('contacto');
  const current = stages.find((s) => s.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage) => {
          const Icon = icons[stage.id];
          const isActive = stage.id === active;

          return (
            <button
              key={stage.id}
              onClick={() => setActive(stage.id)}
              className="text-left"
              data-test={`stage-tab-${stage.id}`}
            >
              <Card
                className={cn(
                  'h-full cursor-pointer transition-all hover:shadow-md',
                  isActive && `ring-2 ${stage.ring}`,
                )}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <Icon className={cn('h-6 w-6 shrink-0', stage.color)} />
                  <div>
                    <CardTitle className="text-base">{stage.name}</CardTitle>
                    <CardDescription className="text-xs">{stage.question}</CardDescription>
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
