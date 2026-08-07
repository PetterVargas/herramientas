'use client';

import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Lock,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { steps } from '../_lib/steps';

const AUTOPLAY_MS = 4500;

function AddressBar({
  secure,
  domain,
  highlight,
}: {
  secure: boolean;
  domain: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-background flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
      {secure ? (
        <Lock className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
      ) : (
        <TriangleAlert className="h-4 w-4 shrink-0 text-red-600 dark:text-red-500" />
      )}
      <span className={cn(!secure && 'text-red-600 dark:text-red-500')}>
        {secure ? 'https://' : 'http://'}
      </span>
      <span
        className={cn(
          'font-medium',
          highlight && 'rounded bg-yellow-200/60 px-1 ring-2 ring-yellow-500 dark:bg-yellow-500/20',
        )}
      >
        {domain}
      </span>
      {!secure && (
        <span className="ml-auto text-xs font-semibold text-red-600 dark:text-red-500">
          No seguro
        </span>
      )}
    </div>
  );
}

export function SecureSiteAnimation() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % steps.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [playing]);

  const step = steps[index]!;

  const goTo = (i: number) => {
    setPlaying(false);
    setIndex(((i % steps.length) + steps.length) % steps.length);
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="bg-muted flex items-center gap-1.5 border-b px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        <div className="p-6" key={step.id}>
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {step.state === 'insecure' && <AddressBar secure={false} domain="mibanco-online.com" />}

            {step.state === 'secure' && <AddressBar secure domain="mibanco.com" />}

            {step.state === 'domain-check' && (
              <div className="space-y-3">
                <AddressBar secure domain="mibanco.com" highlight />
                <div className="rounded-md border p-3 text-sm">
                  <p className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CircleCheck className="h-4 w-4 shrink-0" /> mibanco.com — dominio oficial
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-red-600 line-through dark:text-red-500">
                    mibanco-verificacion.com
                  </p>
                </div>
              </div>
            )}

            {step.state === 'certificate' && (
              <div className="space-y-3">
                <AddressBar secure domain="mibanco.com" />
                <div className="rounded-md border p-4 text-sm">
                  <p className="mb-2 flex items-center gap-2 font-semibold">
                    <BadgeCheck className="h-4 w-4 text-green-600 dark:text-green-500" />
                    Certificado digital
                  </p>
                  <dl className="text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <dt>Emitido para:</dt>
                      <dd className="font-mono">mibanco.com</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Emitido por:</dt>
                      <dd className="font-mono">DigiCert Inc</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Válido hasta:</dt>
                      <dd className="font-mono">15 mar. 2027</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {step.state === 'no-warnings' && (
              <div className="space-y-3">
                <AddressBar secure domain="mibanco.com" />
                <div className="flex items-center gap-2 rounded-md border p-3 text-sm text-green-700 dark:text-green-400">
                  <CircleCheck className="h-4 w-4 shrink-0" />
                  0 advertencias de seguridad del navegador
                </div>
              </div>
            )}

            {step.state === 'verified' && (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <ShieldCheck className="h-16 w-16 text-green-600 dark:text-green-500" />
                <p className="text-lg font-semibold">mibanco.com verificado como seguro</p>
                <ul className="text-muted-foreground w-full space-y-1 text-left text-sm">
                  {steps.slice(1, 5).map((s) => (
                    <li key={s.id} className="flex items-center gap-2">
                      <CircleCheck className="h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-500" />
                      {s.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <div key={`desc-${step.id}`} className="animate-in fade-in duration-500">
          <p className="text-sm font-semibold">
            Paso {index + 1} de {steps.length}: {step.title}
          </p>
          <p className="text-muted-foreground text-sm">{step.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Ir al paso ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === index ? 'bg-primary w-6' : 'bg-border w-2',
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goTo(index - 1)}
              aria-label="Paso anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pausar' : 'Reproducir'}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goTo(index + 1)}
              aria-label="Paso siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIndex(0);
                setPlaying(true);
              }}
              aria-label="Reiniciar animación"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
