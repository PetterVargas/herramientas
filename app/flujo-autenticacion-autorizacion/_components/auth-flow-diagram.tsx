'use client';

import { Fragment, useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleX,
  KeyRound,
  Pause,
  Play,
  RotateCcw,
  ScrollText,
  Scale,
  Send,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import {
  getSteps,
  nodeLabels,
  type AuthMethod,
  type FlowNodeId,
  type FlowStepItem,
  type RoleType,
} from '../_lib/steps';

const AUTOPLAY_MS = 5000;

const nodeIcons: Record<FlowNodeId, LucideIcon> = {
  solicitud: Send,
  autenticacion: KeyRound,
  rol: Users,
  autorizacion: ShieldCheck,
  resultado: Scale,
  auditoria: ScrollText,
};

function ItemIcon({ status }: { status: FlowStepItem['status'] }) {
  if (status === 'ok') return <CircleCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />;
  if (status === 'fail') return <CircleX className="h-4 w-4 shrink-0 text-red-600 dark:text-red-500" />;
  return <Circle className="text-muted-foreground h-4 w-4 shrink-0" />;
}

const itemBorderClass: Record<FlowStepItem['status'], string> = {
  ok: 'border-green-500 bg-green-50 dark:bg-green-950/50',
  fail: 'border-red-500 bg-red-50 dark:bg-red-950/50',
  neutral: 'border-border bg-background',
};

const itemTextClass: Record<FlowStepItem['status'], string> = {
  ok: 'text-green-700 dark:text-green-400',
  fail: 'text-red-600 dark:text-red-500',
  neutral: 'text-foreground',
};

export function AuthFlowDiagram() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('api');
  const [roleType, setRoleType] = useState<RoleType>('fijo');
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const steps = getSteps(authMethod, roleType);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % steps.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [playing, steps.length]);

  const step = steps[index]!;
  const StepIcon = nodeIcons[step.node];

  const goTo = (i: number) => {
    setPlaying(false);
    setIndex(((i % steps.length) + steps.length) % steps.length);
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold">Método de autenticación</p>
          <Tabs
            value={authMethod}
            onValueChange={(v) => {
              setAuthMethod(v as AuthMethod);
              setIndex(0);
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="api" data-test="tab-auth-api">
                Por API
              </TabsTrigger>
              <TabsTrigger value="mcp" data-test="tab-auth-mcp">
                Por MCP
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Tipo de rol</p>
          <Tabs
            value={roleType}
            onValueChange={(v) => {
              setRoleType(v as RoleType);
              setIndex(0);
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fijo" data-test="tab-role-fijo">
                Roles fijos
              </TabsTrigger>
              <TabsTrigger value="custom" data-test="tab-role-custom">
                Roles custom
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-[560px] items-start">
          {steps.map((s, i) => {
            const Icon = nodeIcons[s.node];
            const status = i < index ? 'done' : i === index ? 'active' : 'upcoming';

            return (
              <Fragment key={s.id}>
                <button
                  onClick={() => goTo(i)}
                  className="flex shrink-0 flex-col items-center gap-1.5"
                  data-test={`node-${s.node}`}
                  aria-label={nodeLabels[s.node]}
                >
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                      status === 'active' && 'bg-primary text-primary-foreground border-primary shadow-xs',
                      status === 'done' && 'bg-primary/10 text-primary border-primary/30',
                      status === 'upcoming' && 'bg-muted text-muted-foreground border-border',
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span
                    className={cn(
                      'max-w-18 text-center text-[11px] font-medium',
                      status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground',
                    )}
                  >
                    {nodeLabels[s.node]}
                  </span>
                </button>

                {i < steps.length - 1 && (
                  <div className={cn('mt-5 h-0.5 flex-1', i < index ? 'bg-primary' : 'bg-border')} />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="bg-muted flex items-center gap-2 border-b px-4 py-2.5">
          <StepIcon className="text-muted-foreground h-4 w-4 shrink-0" />
          <span className="text-sm font-semibold">{step.title}</span>
        </div>

        <div className="p-6" key={step.id}>
          <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 duration-500">
            <p className="text-muted-foreground text-sm">{step.description}</p>

            <ul className="space-y-2">
              {step.items.map((item, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex items-center gap-2 rounded-md border px-3 py-2',
                    itemBorderClass[item.status],
                  )}
                >
                  <ItemIcon status={item.status} />
                  <span className={cn('font-mono text-xs', itemTextClass[item.status])}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <p className="text-muted-foreground text-sm">
          Paso {index + 1} de {steps.length}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Ir al paso ${i + 1}`}
                className={cn('h-2 rounded-full transition-all', i === index ? 'bg-primary w-6' : 'bg-border w-2')}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => goTo(index - 1)} aria-label="Paso anterior">
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
            <Button variant="outline" size="icon" onClick={() => goTo(index + 1)} aria-label="Paso siguiente">
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
