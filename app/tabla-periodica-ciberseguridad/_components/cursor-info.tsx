'use client';

import { FrameworkElement, getDomainByCode } from './framework-data';

interface CursorInfoProps {
  element: FrameworkElement | null;
  visible: boolean;
}

export function CursorInfo({ element, visible }: CursorInfoProps) {
  if (!element || !visible) {
    return null;
  }

  const domain = getDomainByCode(element.domainCode);

  return (
    <div
      className="pointer-events-none fixed z-50 w-[350px] rounded-lg border border-zinc-700 bg-zinc-900 pb-3 shadow-2xl"
      style={{
        display: visible ? 'block' : 'none',
      }}
    >
      {/* Upper section - Element details */}
      <div className="flex flex-row justify-around py-2 text-white">
        <div
          className="flex w-full flex-col items-center justify-center text-center text-sm"
          style={{
            color: domain?.hexColor || '#dadcca',
          }}
        >
          <div className="w-fit">
            {element.number !== null && (
              <p className="text-xs">{element.number}</p>
            )}
            <div
              className={
                element.number !== null
                  ? 'pt-2 leading-[30px]'
                  : 'leading-[30px]'
              }
            >
              <p className="text-3xl font-bold">{element.domainCode}</p>
              <p className="text-sm font-bold">{element.code}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower section - Details */}
      <div
        className="w-full px-3"
        style={{
          color: domain?.hexColor || '#dadcca',
        }}
      >
        <div className="mt-2 flex flex-col justify-between border-b-[0.5px] border-zinc-700 pb-1 text-xs">
          <span className="text-zinc-400">Control</span>
          <span className="pr-1 font-semibold">{element.code}</span>
        </div>

        <div className="mt-2 flex flex-col justify-between border-b-[0.5px] border-zinc-700 pb-1 text-xs">
          <span className="text-zinc-400">Nombre</span>
          <span className="pr-1">{element.name}</span>
        </div>

        <div className="mt-2 flex flex-col justify-between border-b-[0.5px] border-zinc-700 pb-1 text-xs">
          <span className="text-zinc-400">Dominio</span>
          <span className="pr-1">{element.category}</span>
        </div>

        <div className="mt-2 flex flex-col justify-between border-b-[0.5px] border-zinc-700 pb-1 text-xs">
          <span className="text-zinc-400">Código Dominio</span>
          <span className="pr-1">{element.domainCode}</span>
        </div>

        <div className="mt-2 flex flex-col justify-between pb-1 text-xs">
          <span className="text-zinc-400">Descripción</span>
          <span className="pt-1 pr-1 text-[11px] leading-relaxed">
            {element.description}
          </span>
        </div>
      </div>
    </div>
  );
}
