'use client';

import { useState } from 'react';
import { ImageOff, History, Scale, UsersRound, type LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { risks, type SextingRisk } from '../_lib/risks';

const icons: Record<SextingRisk, LucideIcon> = {
  control: ImageOff,
  permanencia: History,
  legal: Scale,
  presion: UsersRound,
};

export function SextingRiskCards() {
  const [active, setActive] = useState<SextingRisk>('control');
  const current = risks.find((r) => r.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {risks.map((risk) => {
          const Icon = icons[risk.id];
          const isActive = risk.id === active;

          return (
            <button
              key={risk.id}
              onClick={() => setActive(risk.id)}
              className="text-left"
              data-test={`risk-tab-${risk.id}`}
            >
              <Card
                className={cn(
                  'h-full cursor-pointer transition-all hover:shadow-md',
                  isActive && `ring-2 ${risk.ring}`,
                )}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <Icon className={cn('h-6 w-6 shrink-0', risk.color)} />
                  <div>
                    <CardTitle className="text-base">{risk.name}</CardTitle>
                    <CardDescription className="text-xs">{risk.question}</CardDescription>
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

            <h4 className="mt-4 mb-2 text-sm font-semibold">Ejemplos de riesgo</h4>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              {current.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Cómo protegerte</h4>
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
