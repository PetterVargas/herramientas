'use client';

import { useMemo, useState } from 'react';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { attackScenarios, crackTimeSeconds, formatDuration } from '../_lib/attack-scenarios';
import { analyzePassword, type Strength } from '../_lib/password-analysis';

const strengthMeta: Record<Strength, { label: string; bar: string; text: string; width: string }> = {
  'muy-debil': { label: 'Muy débil', bar: 'bg-red-500', text: 'text-red-600 dark:text-red-400', width: '20%' },
  debil: { label: 'Débil', bar: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400', width: '40%' },
  regular: { label: 'Regular', bar: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400', width: '60%' },
  fuerte: { label: 'Fuerte', bar: 'bg-green-500', text: 'text-green-600 dark:text-green-400', width: '80%' },
  'muy-fuerte': {
    label: 'Muy fuerte',
    bar: 'bg-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
    width: '100%',
  },
};

export function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);
  const hasPassword = analysis.length > 0;
  const meta = strengthMeta[analysis.strength];

  const poolBadges = [
    { label: 'Minúsculas', active: analysis.pools.lowercase },
    { label: 'Mayúsculas', active: analysis.pools.uppercase },
    { label: 'Números', active: analysis.pools.digits },
    { label: 'Símbolos', active: analysis.pools.symbols },
  ];

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-card space-y-5 rounded-lg border p-6">
        <div className="space-y-2">
          <Label htmlFor="password-input">Escribe una contraseña para analizarla</Label>
          <div className="flex items-center gap-2">
            <Input
              id="password-input"
              type={visible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa una contraseña..."
              autoComplete="off"
              spellCheck={false}
              className="font-mono"
              data-test="password-input"
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="text-muted-foreground hover:text-foreground hover:border-ring/50 shrink-0 rounded-md border p-2 transition-colors"
              aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Fortaleza</span>
            <span className={cn('font-semibold', hasPassword ? meta.text : 'text-muted-foreground')}>
              {hasPassword ? meta.label : '—'}
            </span>
          </div>
          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div
              className={cn('h-full rounded-full transition-all duration-300', meta.bar)}
              style={{ width: hasPassword ? meta.width : '0%' }}
              data-test="strength-bar"
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Entropía estimada: {analysis.effectiveEntropyBits.toFixed(1)} bits · {analysis.length}{' '}
            caracteres
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {poolBadges.map((b) => (
            <Badge
              key={b.label}
              variant={b.active ? 'success' : 'outline'}
              className={cn(!b.active && 'text-muted-foreground opacity-60')}
            >
              {b.label}
            </Badge>
          ))}
        </div>

        {analysis.warnings.length > 0 && (
          <Alert variant="warning">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Puntos débiles detectados</AlertTitle>
            <AlertDescription>
              <ul className="list-disc space-y-1 pl-4">
                {analysis.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">¿Cuánto tardaría en descifrarse?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {attackScenarios.map((scenario) => {
            const seconds = crackTimeSeconds(analysis.effectiveEntropyBits, scenario.guessesPerSecond);
            return (
              <div
                key={scenario.id}
                className="flex flex-col gap-1 border-b pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                data-test={`scenario-${scenario.id}`}
              >
                <div>
                  <p className="text-sm font-medium">{scenario.label}</p>
                  <p className="text-muted-foreground text-xs">{scenario.description}</p>
                </div>
                <span className="font-mono text-sm font-semibold sm:text-right">
                  {hasPassword ? formatDuration(seconds) : '—'}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Alert variant="info">
        <AlertTitle>Privacidad</AlertTitle>
        <AlertDescription>
          Todo el análisis ocurre en tu navegador: la contraseña nunca se envía ni se almacena en
          ningún servidor.
        </AlertDescription>
      </Alert>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-2">
          ¿Cómo se calcula esto?
        </Heading>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Se estima la <strong>entropía</strong> de la contraseña (cuántas combinaciones distintas
          tendría que probar un atacante) según su longitud y los tipos de caracteres usados, y se
          penalizan patrones predecibles o contraseñas comunes. Con esa entropía se calcula, para
          cada escenario, cuánto tardaría en promedio un ataque de fuerza bruta a la velocidad de
          cómputo típica de hardware de descifrado actual. Es una aproximación educativa: los
          tiempos reales dependen del hardware exacto del atacante y de si tu contraseña fue
          filtrada en texto plano por otra vía.
        </p>
      </div>
    </div>
  );
}
