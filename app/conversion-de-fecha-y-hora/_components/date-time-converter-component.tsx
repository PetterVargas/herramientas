'use client';

import { useMemo, useState } from 'react';

import { AlertTriangle, ArrowLeftRight, Check, Clock, Copy, Plus, X } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';

import {
  convertInstant,
  formatOffset,
  getOffsetMinutes,
  getZoneLabel,
  isFixedOffsetZone,
  nowInZone,
  timeZoneGroups,
  zonedTimeToInstant,
} from '../_lib/timezones';

const MAX_TARGETS = 6;

function ZoneSelect({
  id,
  value,
  onChange,
  referenceInstant,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  referenceInstant: number;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} data-test={id}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {timeZoneGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.zones.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                {isFixedOffsetZone(zone.value)
                  ? zone.label
                  : `${zone.label} (${formatOffset(getOffsetMinutes(referenceInstant, zone.value))})`}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

function formatDayDiff(dayDiff: number): string | null {
  if (dayDiff === 0) return null;
  if (dayDiff === 1) return 'Día siguiente';
  if (dayDiff === -1) return 'Día anterior';
  return `${dayDiff > 0 ? '+' : ''}${dayDiff} días`;
}

export function DateTimeConverterComponent() {
  const [date, setDate] = useState('2026-09-09');
  const [time, setTime] = useState('10:59');
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZones, setTargetZones] = useState<string[]>(['America/Bogota']);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const source = useMemo(
    () => zonedTimeToInstant(date, time, sourceZone),
    [date, time, sourceZone],
  );

  const results = useMemo(
    () =>
      source ? targetZones.map((zone) => convertInstant(source.instant, zone, date)) : [],
    [source, targetZones, date],
  );

  const referenceInstant = source?.instant ?? Date.UTC(2026, 8, 9, 10, 59);
  const sourceOffset = source ? getOffsetMinutes(source.instant, sourceZone) : 0;

  const updateTarget = (index: number, zone: string) => {
    setTargetZones((zones) => zones.map((z, i) => (i === index ? zone : z)));
  };

  const removeTarget = (index: number) => {
    setTargetZones((zones) => zones.filter((_, i) => i !== index));
  };

  const addTarget = () => {
    setTargetZones((zones) =>
      zones.length >= MAX_TARGETS ? zones : [...zones, 'America/Mexico_City'],
    );
  };

  const swapFirst = () => {
    const first = results[0];
    if (!first) return;
    const [newDate, newTime] = first.iso.slice(0, 16).split('T');
    setTargetZones((zones) => [sourceZone, ...zones.slice(1)]);
    setSourceZone(first.timeZone);
    setDate(newDate);
    setTime(newTime);
  };

  const setToNow = () => {
    const now = nowInZone(sourceZone);
    setDate(now.date);
    setTime(now.time);
  };

  const copyResult = async (index: number) => {
    const result = results[index];
    if (!result) return;
    const text = `${result.dateLabel}, ${result.timeLabel} (${getZoneLabel(result.timeZone)}, ${formatOffset(result.offsetMinutes)})`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Copiado', {
        description: 'La conversión ha sido copiada al portapapeles',
      });
      setTimeout(() => setCopiedIndex(null), 3000);
    } catch {
      toast.error('Error al copiar', {
        description: 'No se pudo copiar al portapapeles',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Heading level={3}>Fecha y hora de origen</Heading>
          <Button
            variant="outline"
            onClick={setToNow}
            className="flex items-center gap-2"
            data-test="now-button"
          >
            <Clock className="h-4 w-4" />
            Usar hora actual
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="source-date">Fecha</Label>
            <Input
              id="source-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-test="source-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source-time">Hora</Label>
            <Input
              id="source-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              data-test="source-time"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source-zone">Zona horaria</Label>
            <ZoneSelect
              id="source-zone"
              value={sourceZone}
              onChange={setSourceZone}
              referenceInstant={referenceInstant}
            />
          </div>
        </div>

        {!source && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Introduce una fecha y hora válidas.</AlertDescription>
          </Alert>
        )}

        {source && !source.exists && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Esta hora no existe en {getZoneLabel(sourceZone)} por el cambio al horario de
              verano; se ajustó a la hora válida más cercana.
            </AlertDescription>
          </Alert>
        )}

        {source && (
          <p className="text-muted-foreground text-sm">
            Equivale a{' '}
            <span className="text-foreground font-mono">
              {new Date(source.instant).toISOString().slice(0, 16)}Z
            </span>{' '}
            en UTC · Zona de origen: {getZoneLabel(sourceZone)} ({formatOffset(sourceOffset)})
          </p>
        )}
      </div>

      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Heading level={3}>Conversión</Heading>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={swapFirst}
              disabled={results.length === 0}
              className="flex items-center gap-2"
              data-test="swap-button"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Invertir
            </Button>
            <Button
              variant="outline"
              onClick={addTarget}
              disabled={targetZones.length >= MAX_TARGETS}
              className="flex items-center gap-2"
              data-test="add-target-button"
            >
              <Plus className="h-4 w-4" />
              Agregar zona
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {targetZones.map((zone, index) => {
            const result = results[index];
            const dayDiff = result ? formatDayDiff(result.dayDiff) : null;
            return (
              <div key={index} className="space-y-3 rounded-md border p-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`target-zone-${index}`}>Zona horaria de destino</Label>
                    <ZoneSelect
                      id={`target-zone-${index}`}
                      value={zone}
                      onChange={(value) => updateTarget(index, value)}
                      referenceInstant={referenceInstant}
                    />
                  </div>
                  {targetZones.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTarget(index)}
                      aria-label="Quitar zona"
                      data-test={`remove-target-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {result && (
                  <div className="bg-muted flex flex-wrap items-center justify-between gap-3 rounded-md p-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span
                          className="font-mono text-3xl font-semibold"
                          data-test={`result-time-${index}`}
                        >
                          {result.timeLabel}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {formatOffset(result.offsetMinutes)}
                        </span>
                        {dayDiff && (
                          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                            {dayDiff}
                          </span>
                        )}
                      </div>
                      <p className="text-sm first-letter:uppercase">{result.dateLabel}</p>
                      <p className="text-muted-foreground font-mono text-xs">{result.iso}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyResult(index)}
                      className="flex items-center gap-1"
                      data-test={`copy-button-${index}`}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-4">
          Información sobre zonas horarias
        </Heading>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-medium">¿Qué es UTC?</h4>
            <p className="text-muted-foreground text-sm">
              UTC (Tiempo Universal Coordinado) es la referencia horaria mundial. Cada zona
              horaria se expresa como un desplazamiento respecto a UTC: por ejemplo, Bogotá
              está en UTC-5, así que las 10:59 UTC corresponden a las 05:59 en Bogotá.
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-medium">¿Por qué importa en ciberseguridad?</h4>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              <li>Los logs de servidores y SIEM suelen registrarse en UTC</li>
              <li>Correlacionar eventos de un incidente exige una misma referencia horaria</li>
              <li>Las cabeceras de correo incluyen marcas de tiempo con distintos desplazamientos</li>
              <li>Los reportes forenses deben indicar siempre la zona horaria usada</li>
            </ul>
          </div>

          <div className="rounded-md bg-amber-50 p-3 dark:bg-amber-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Horario de verano:
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Ciudades como Nueva York, Madrid o Santiago cambian su desplazamiento durante el
              año. La conversión usa la base de datos de zonas horarias de tu navegador, por lo
              que aplica automáticamente el desplazamiento correcto para la fecha elegida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
