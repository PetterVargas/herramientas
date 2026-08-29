'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, ScanSearch } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { badPracticesTotal, deskItems, type DeskItem } from '../_lib/desk-items';

/**
 * Cada hotspot es el propio dibujo del objeto (sin "chip" ni ícono flotando
 * encima): el botón es transparente y solo cambia con hover/found, para que
 * el puesto de trabajo se lea como una ilustración real, no como una lista
 * de íconos sobre recuadros.
 */
function Hotspot({
  item,
  found,
  onSelect,
  style,
  children,
}: {
  item: DeskItem;
  found: boolean;
  onSelect: (item: DeskItem) => void;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      title={item.label}
      aria-label={item.label}
      data-test={`desk-item-${item.id}`}
      className={cn(
        'absolute cursor-pointer border-0 bg-transparent p-0 transition-transform duration-200 hover:scale-[1.08] focus-visible:scale-[1.08] focus-visible:outline-none',
        found &&
          (item.type === 'bad'
            ? 'drop-shadow-[0_0_7px_rgba(239,68,68,0.65)]'
            : 'drop-shadow-[0_0_7px_rgba(34,197,94,0.65)]'),
      )}
      style={style}
    >
      {children}
      {found && (
        <CheckCircle2
          className={cn(
            'absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-background sm:h-5 sm:w-5',
            item.type === 'bad' ? 'text-red-500' : 'text-green-500',
          )}
        />
      )}
    </button>
  );
}

export function DeskScene() {
  const [foundIds, setFoundIds] = useState<Record<string, boolean>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const itemsById = useMemo(
    () => Object.fromEntries(deskItems.map((item) => [item.id, item])),
    [],
  );

  const foundCount = Object.keys(foundIds).length;
  const allFound = foundCount === badPracticesTotal;
  const activeItem = activeId ? itemsById[activeId] : null;

  const handleSelect = (item: DeskItem) => {
    if (item.type === 'bad' && !foundIds[item.id]) {
      setFoundIds((prev) => ({ ...prev, [item.id]: true }));
    }
    setActiveId(item.id);
  };

  const handleRestart = () => {
    setFoundIds({});
    setActiveId(null);
  };

  const isFound = (id: string) => Boolean(foundIds[id]);

  return (
    <div className="w-full space-y-4">
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ScanSearch className="h-5 w-5 text-primary" />
          <span className="font-semibold">Encuentra las malas prácticas</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {foundCount}/{badPracticesTotal} encontradas
          </span>
          <div className="h-2 w-28 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(foundCount / badPracticesTotal) * 100}%` }}
            />
          </div>
          <Button onClick={handleRestart} variant="outline" size="sm" data-test="restart">
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Reiniciar
          </Button>
        </div>
      </Card>

      <p className="text-muted-foreground text-sm">
        Este es un puesto de trabajo simulado. Pasa el cursor sobre los objetos y haz clic en
        cada uno que represente una{' '}
        <span className="font-medium text-foreground">mala práctica de seguridad</span>. No
        todos los objetos son riesgosos: hay {deskItems.length - badPracticesTotal} que están
        bien.
      </p>

      <div
        className="relative w-full overflow-hidden rounded-2xl border border-border select-none"
        style={{ aspectRatio: '16 / 10' }}
      >
        {/* Pared */}
        <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-800 dark:to-slate-800" />
        {/* Piso */}
        <div className="absolute inset-x-0 bottom-0 top-[58%] bg-gradient-to-b from-stone-200 to-stone-300 dark:from-slate-900 dark:to-black" />
        <div className="absolute inset-x-0 top-[57.3%] h-[1.4%] bg-stone-400/50 dark:bg-black/50" />

        {/* Ventana (decorativa) */}
        <div
          className="absolute rounded-md border-[3px] border-white/80 bg-gradient-to-br from-sky-200 to-sky-300 dark:border-slate-600 dark:from-slate-700 dark:to-slate-600"
          style={{ top: '8%', left: '6%', width: '16%', height: '22%' }}
        >
          <div className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 bg-white/80 dark:bg-slate-500" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/80 dark:bg-slate-500" />
        </div>

        {/* Reloj de pared (decorativo) */}
        <svg
          className="absolute"
          style={{ top: '8%', left: '40%', width: '6%', aspectRatio: '1 / 1' }}
          viewBox="0 0 40 40"
        >
          <circle cx="20" cy="20" r="17" className="fill-white stroke-slate-400 dark:fill-slate-200" strokeWidth="2" />
          <line x1="20" y1="20" x2="20" y2="9" className="stroke-slate-600" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="20" x2="27" y2="22" className="stroke-slate-600" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Repisa con router (decorativo) */}
        <div
          className="absolute rounded-sm bg-amber-800/70"
          style={{ top: '31%', left: '63%', width: '22%', height: '1.4%' }}
        />
        <div
          className="absolute rounded-sm bg-slate-600 dark:bg-slate-400"
          style={{ top: '22%', left: '64%', width: '10%', height: '8.5%' }}
        >
          <div className="absolute -top-[45%] left-[15%] h-[50%] w-[8%] origin-bottom rotate-[-20deg] rounded-full bg-slate-500 dark:bg-slate-300" />
          <div className="absolute -top-[45%] right-[15%] h-[50%] w-[8%] origin-bottom rotate-[20deg] rounded-full bg-slate-500 dark:bg-slate-300" />
          <div className="absolute top-[35%] left-[15%] h-[15%] w-[15%] rounded-full bg-green-400" />
        </div>

        {/* Silla (decorativa, parcialmente oculta tras el escritorio) */}
        <div
          className="absolute rounded-t-2xl rounded-b-md bg-slate-500/80 dark:bg-slate-700/80"
          style={{ top: '35%', left: '68%', width: '13%', height: '48%' }}
        />

        {/* Escritorio */}
        <div
          className="absolute rounded-sm bg-gradient-to-b from-amber-700 to-amber-900 dark:from-amber-900 dark:to-black"
          style={{ top: '58%', left: '3%', width: '81%', height: '28%' }}
        >
          <div className="absolute top-0 right-0 left-0 h-[8%] bg-amber-500/60 dark:bg-amber-700/40" />
        </div>
        {/* Patas del escritorio */}
        <div className="absolute bg-amber-950" style={{ top: '84%', left: '8%', width: '2.2%', height: '14%' }} />
        <div className="absolute bg-amber-950" style={{ top: '84%', left: '79%', width: '2.2%', height: '14%' }} />

        {/* Archivador de piso (buena práctica), separado de la puerta para que no queden superpuestos */}
        <Hotspot
          item={itemsById['locked-cabinet']!}
          found={isFound('locked-cabinet')}
          onSelect={handleSelect}
          style={{ top: '48%', left: '87%', width: '8%', aspectRatio: '50 / 90' }}
        >
          <svg viewBox="0 0 50 90" className="h-full w-full">
            <rect x="4" y="2" width="42" height="86" rx="2" className="fill-slate-400 stroke-slate-600 dark:fill-slate-500 dark:stroke-slate-800" strokeWidth="1.5" />
            <rect x="4" y="30" width="42" height="1.5" className="fill-slate-600" />
            <rect x="4" y="58" width="42" height="1.5" className="fill-slate-600" />
            <rect x="19" y="12" width="12" height="4" rx="1.5" className="fill-slate-200" />
            <rect x="19" y="40" width="12" height="4" rx="1.5" className="fill-slate-200" />
            <rect x="19" y="68" width="12" height="4" rx="1.5" className="fill-slate-200" />
            <circle cx="25" cy="23" r="2.6" className="fill-yellow-300" />
            <polygon points="23.6,25 26.4,25 25,29" className="fill-yellow-300" />
          </svg>
        </Hotspot>

        {/* Monitor: base, cuello y bisel (decorativos) */}
        <div className="absolute rounded-full bg-slate-600 dark:bg-slate-400" style={{ top: '55%', left: '42%', width: '13%', height: '2.6%' }} />
        <div className="absolute rounded-sm bg-slate-600 dark:bg-slate-400" style={{ top: '48%', left: '47.6%', width: '1.8%', height: '7%' }} />
        <div
          className="absolute rounded-lg border-[3px] border-slate-700 bg-slate-800 dark:border-slate-600 dark:bg-slate-900"
          style={{ top: '25%', left: '36%', width: '25%', height: '27%' }}
        />

        {/* Pantalla desbloqueada (mala práctica): dimensionada con margen dentro
            del bisel para que no se desborde del monitor */}
        <Hotspot
          item={itemsById['unlocked-screen']!}
          found={isFound('unlocked-screen')}
          onSelect={handleSelect}
          style={{ top: '26.5%', left: '37.5%', width: '22%', aspectRatio: '100 / 66' }}
        >
          <svg viewBox="0 0 100 66" className="h-full w-full">
            <rect width="100" height="66" rx="2" className="fill-sky-100 dark:fill-sky-950" />
            <rect x="16" y="12" width="32" height="22" rx="2" className="fill-white stroke-sky-400 dark:fill-slate-800 dark:stroke-sky-700" strokeWidth="1.5" />
            <path d="M16 14 L32 27 L48 14" fill="none" className="stroke-sky-400 dark:stroke-sky-700" strokeWidth="1.5" />
            <rect x="16" y="42" width="68" height="3" rx="1.5" className="fill-sky-300 dark:fill-sky-700" />
            <rect x="16" y="49" width="48" height="3" rx="1.5" className="fill-sky-300 dark:fill-sky-700" />
            <rect x="16" y="56" width="58" height="3" rx="1.5" className="fill-sky-300 dark:fill-sky-700" />
          </svg>
        </Hotspot>

        {/* Cámara web (mala práctica) */}
        <Hotspot
          item={itemsById['webcam-uncovered']!}
          found={isFound('webcam-uncovered')}
          onSelect={handleSelect}
          style={{ top: '24.3%', left: '47%', width: '3%', aspectRatio: '1 / 1' }}
        >
          <svg viewBox="0 0 20 20" className="h-full w-full">
            <circle cx="10" cy="10" r="8.5" className="fill-slate-950 stroke-slate-500" strokeWidth="1" />
            <circle cx="7.5" cy="7.5" r="2" className="fill-slate-500/70" />
          </svg>
        </Hotspot>

        {/* Nota con contraseña (mala práctica) */}
        <Hotspot
          item={itemsById['password-note']!}
          found={isFound('password-note')}
          onSelect={handleSelect}
          style={{ top: '26%', left: '60%', width: '6%', aspectRatio: '1 / 1' }}
        >
          <svg viewBox="0 0 60 60" className="h-full w-full">
            <polygon points="3,3 52,3 52,44 42,54 3,54" className="fill-yellow-200 stroke-yellow-400 dark:fill-yellow-300" strokeWidth="1" />
            <polygon points="42,44 52,44 42,54" className="fill-yellow-400 dark:fill-yellow-500" />
            <path d="M10 16 q6 -6 12 0 t12 0" fill="none" className="stroke-slate-600" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 26 q6 6 12 0 t12 0" fill="none" className="stroke-slate-600" strokeWidth="2" strokeLinecap="round" />
            <rect x="10" y="36" width="26" height="2.5" rx="1.2" className="fill-slate-500" />
          </svg>
        </Hotspot>

        {/* Nota con clave wifi (mala práctica) */}
        <Hotspot
          item={itemsById['wifi-note']!}
          found={isFound('wifi-note')}
          onSelect={handleSelect}
          style={{ top: '20%', left: '75%', width: '9%', aspectRatio: '1 / 1' }}
        >
          <svg viewBox="0 0 70 70" className="h-full w-full">
            <polygon points="4,4 62,4 62,52 50,64 4,64" className="fill-yellow-300 stroke-yellow-500 dark:fill-yellow-400" strokeWidth="1" />
            <polygon points="50,52 62,52 50,64" className="fill-yellow-500 dark:fill-yellow-600" />
            <path d="M18 30 a16 16 0 0 1 26 0" fill="none" className="stroke-slate-700" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M23 36 a10 10 0 0 1 16 0" fill="none" className="stroke-slate-700" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="31" cy="42" r="2.4" className="fill-slate-700" />
            <path d="M12 52 h30" className="stroke-slate-500" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
          </svg>
        </Hotspot>

        {/* Puerta entreabierta (mala práctica): termina antes de que empiece
            el archivador (48%) para que no queden superpuestos */}
        <Hotspot
          item={itemsById['door-open']!}
          found={isFound('door-open')}
          onSelect={handleSelect}
          style={{ top: '5%', left: '86%', width: '10%', aspectRatio: '40 / 100' }}
        >
          <svg viewBox="0 0 40 100" className="h-full w-full">
            <rect width="40" height="100" className="fill-slate-900/70 dark:fill-black/80" />
            <polygon points="6,2 34,6 34,98 6,96" className="fill-amber-800 stroke-amber-950 dark:fill-amber-900" strokeWidth="1" />
            <rect x="12" y="16" width="16" height="28" fill="none" className="stroke-amber-950/50" strokeWidth="1" />
            <rect x="12" y="52" width="16" height="28" fill="none" className="stroke-amber-950/50" strokeWidth="1" />
            <circle cx="28" cy="52" r="2.4" className="fill-yellow-300" />
          </svg>
        </Hotspot>

        {/* Teclado y mouse (decorativos) */}
        <div
          className="absolute rounded-sm bg-slate-700 dark:bg-slate-600"
          style={{
            top: '63%',
            left: '38%',
            width: '22%',
            height: '6.5%',
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 6%, transparent 6% 9%), repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 22%, transparent 22% 32%)',
          }}
        />
        <div className="absolute rounded-full bg-slate-700 dark:bg-slate-600" style={{ top: '63%', left: '63%', width: '4.5%', height: '8%' }}>
          <div className="absolute top-[10%] left-1/2 h-[35%] w-[6%] -translate-x-1/2 rounded-full bg-slate-400 dark:bg-slate-300" />
        </div>

        {/* Planta (buena práctica) */}
        <Hotspot
          item={itemsById['plant']!}
          found={isFound('plant')}
          onSelect={handleSelect}
          style={{ top: '40%', left: '4%', width: '9%', aspectRatio: '60 / 90' }}
        >
          <svg viewBox="0 0 60 90" className="h-full w-full">
            <polygon points="14,60 46,60 40,86 20,86" className="fill-orange-300" />
            <path d="M30 60 C30 40 14 34 8 18 C22 22 30 38 30 50 Z" className="fill-green-600" />
            <path d="M30 60 C30 38 46 30 52 12 C38 18 30 34 30 48 Z" className="fill-green-500" />
            <path d="M30 60 C28 36 30 24 26 6 C34 20 34 40 32 56 Z" className="fill-green-700" />
          </svg>
        </Hotspot>

        {/* Libreta (buena práctica) */}
        <Hotspot
          item={itemsById['notebook']!}
          found={isFound('notebook')}
          onSelect={handleSelect}
          style={{ top: '68%', left: '4%', width: '11%', aspectRatio: '60 / 70' }}
        >
          <svg viewBox="0 0 60 70" className="h-full w-full">
            <rect x="10" y="4" width="46" height="62" rx="3" className="fill-white stroke-slate-300" strokeWidth="1.5" />
            <circle cx="10" cy="12" r="2" className="fill-slate-400" />
            <circle cx="10" cy="22" r="2" className="fill-slate-400" />
            <circle cx="10" cy="32" r="2" className="fill-slate-400" />
            <circle cx="10" cy="42" r="2" className="fill-slate-400" />
            <circle cx="10" cy="52" r="2" className="fill-slate-400" />
            <circle cx="10" cy="62" r="2" className="fill-slate-400" />
            <rect x="18" y="16" width="30" height="2" className="fill-sky-200" />
            <rect x="18" y="24" width="30" height="2" className="fill-sky-200" />
            <rect x="18" y="32" width="20" height="2" className="fill-sky-200" />
            <rect x="42" y="4" width="4" height="34" rx="2" transform="rotate(20 44 21)" className="fill-blue-500" />
          </svg>
        </Hotspot>

        {/* Memoria USB (mala práctica) */}
        <Hotspot
          item={itemsById['unknown-usb']!}
          found={isFound('unknown-usb')}
          onSelect={handleSelect}
          style={{ top: '70%', left: '32%', width: '6%', aspectRatio: '60 / 30' }}
        >
          <svg viewBox="0 0 60 30" className="h-full w-full">
            <rect x="18" y="6" width="34" height="18" rx="3" className="fill-slate-700" />
            <rect x="2" y="11" width="18" height="8" rx="1.5" className="fill-slate-300" />
            <circle cx="42" cy="15" r="2" className="fill-red-500" />
          </svg>
        </Hotspot>

        {/* Teléfono desbloqueado (mala práctica) */}
        <Hotspot
          item={itemsById['unlocked-phone']!}
          found={isFound('unlocked-phone')}
          onSelect={handleSelect}
          style={{ top: '68%', left: '17%', width: '7%', aspectRatio: '40 / 80' }}
        >
          <svg viewBox="0 0 40 80" className="h-full w-full">
            <rect x="2" y="2" width="36" height="76" rx="6" className="fill-slate-800 stroke-slate-950" strokeWidth="1.5" />
            <rect x="5" y="8" width="30" height="58" rx="2" className="fill-sky-100 dark:fill-sky-950" />
            <path d="M14 34 v-5 a6 6 0 0 1 11 -3" fill="none" className="stroke-slate-500" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="13" y="34" width="14" height="10" rx="1.5" className="fill-slate-400" />
            <rect x="16" y="70" width="8" height="2" rx="1" className="fill-slate-500" />
          </svg>
        </Hotspot>

        {/* Documentos confidenciales (mala práctica) */}
        <Hotspot
          item={itemsById['confidential-docs']!}
          found={isFound('confidential-docs')}
          onSelect={handleSelect}
          style={{ top: '66%', left: '68%', width: '15%', aspectRatio: '90 / 70' }}
        >
          <svg viewBox="0 0 90 70" className="h-full w-full">
            <g transform="rotate(-8 45 34)">
              <rect x="18" y="10" width="54" height="50" rx="2" className="fill-white stroke-slate-300" strokeWidth="1" />
            </g>
            <g transform="rotate(5 45 34)">
              <rect x="18" y="8" width="54" height="50" rx="2" className="fill-slate-50 stroke-slate-300" strokeWidth="1" />
            </g>
            <rect x="18" y="6" width="54" height="50" rx="2" className="fill-white stroke-slate-300" strokeWidth="1" />
            <rect x="24" y="14" width="30" height="2.5" className="fill-slate-300" />
            <rect x="24" y="20" width="40" height="2.5" className="fill-slate-300" />
            <rect x="24" y="26" width="24" height="2.5" className="fill-slate-300" />
            <g transform="rotate(-18 45 36)">
              <rect x="8" y="34" width="70" height="10" className="fill-red-600" />
              <text x="43" y="41.5" textAnchor="middle" fontSize="7" fontWeight="700" className="fill-white">
                CONFIDENCIAL
              </text>
            </g>
          </svg>
        </Hotspot>

        {/* Gafete olvidado (mala práctica) */}
        <Hotspot
          item={itemsById['badge-left']!}
          found={isFound('badge-left')}
          onSelect={handleSelect}
          style={{ top: '78%', left: '53%', width: '7%', aspectRatio: '50 / 66' }}
        >
          <svg viewBox="0 0 50 66" className="h-full w-full">
            <path d="M18 0 q7 9 14 0" fill="none" className="stroke-slate-400" strokeWidth="2" />
            <rect x="4" y="4" width="42" height="58" rx="4" className="fill-white stroke-slate-300" strokeWidth="1.5" />
            <circle cx="25" cy="22" r="9" className="fill-sky-200" />
            <circle cx="25" cy="19" r="4" className="fill-sky-500" />
            <path d="M16 28 a9 7 0 0 1 18 0" className="fill-sky-500" />
            <rect x="10" y="40" width="30" height="3" rx="1.5" className="fill-slate-300" />
            <rect x="10" y="47" width="22" height="3" rx="1.5" className="fill-slate-300" />
          </svg>
        </Hotspot>

        {/* Cajón con carpeta a la vista (mala práctica) */}
        <Hotspot
          item={itemsById['open-drawer']!}
          found={isFound('open-drawer')}
          onSelect={handleSelect}
          style={{ top: '80%', left: '38%', width: '14%', aspectRatio: '90 / 40' }}
        >
          <svg viewBox="0 0 90 40" className="h-full w-full">
            <path d="M4 14 v-8 h60 v8 z" className="fill-amber-300" />
            <rect x="4" y="14" width="60" height="22" rx="1.5" className="fill-amber-100 stroke-amber-400" strokeWidth="1" />
            <rect x="12" y="22" width="30" height="2.5" className="fill-amber-500/70" />
            <rect x="12" y="28" width="20" height="2.5" className="fill-amber-500/70" />
          </svg>
        </Hotspot>
      </div>

      {allFound && (
        <Card className="border-2 border-green-500 bg-green-50 p-5 text-center dark:bg-green-950/50">
          <p className="text-lg font-semibold">🎉 ¡Felicitaciones!</p>
          <p className="text-muted-foreground text-sm">
            Identificaste las {badPracticesTotal} malas prácticas de seguridad en este puesto de
            trabajo.
          </p>
        </Card>
      )}

      {activeItem && (
        <Card
          className={cn(
            'border-2 p-4',
            activeItem.type === 'bad'
              ? 'border-red-500 bg-red-50 dark:bg-red-950/50'
              : 'border-green-500 bg-green-50 dark:bg-green-950/50',
          )}
        >
          <p className="mb-2 font-semibold">
            {activeItem.type === 'bad' ? '⚠️ Mala práctica: ' : '✔️ Esto está bien: '}
            {activeItem.title}
          </p>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
            {activeItem.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
