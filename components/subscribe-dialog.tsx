'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const YOUFORM_ORIGIN = 'https://app.youform.com';
const YOUFORM_SCRIPT = `${YOUFORM_ORIGIN}/embed.js`;
// Tiempo que se deja ver el mensaje de agradecimiento antes de cerrar.
const CLOSE_AFTER_SUBMIT_MS = 5000;

/**
 * Botón del banner superior que abre el formulario de suscripción (Youform)
 * en un popup. El script de Youform se carga la primera vez que se abre, para
 * no sumar el iframe del formulario a cada visita.
 */
export function SubscribeDialog({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // El formulario avisa con `youformComplete` cuando se envía (el script de
  // embed de Youform no expone este evento, así que se escucha aquí).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    function onMessage(e: MessageEvent) {
      if (e.origin !== YOUFORM_ORIGIN || e.data !== 'youformComplete') return;
      clearTimeout(timer);
      timer = setTimeout(() => dialogRef.current?.close(), CLOSE_AFTER_SUBMIT_MS);
    }
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(timer);
    };
  }, []);

  function open() {
    dialogRef.current?.showModal();
    if (!document.querySelector(`script[src="${YOUFORM_SCRIPT}"]`)) {
      const script = document.createElement('script');
      script.src = YOUFORM_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="font-medium underline hover:text-white/80 transition-colors cursor-pointer"
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Suscríbete a DivisionCero"
        // Cierra al hacer clic en el fondo (fuera del contenido).
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-4 pt-12">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar"
            className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
          <div
            data-youform-embed
            data-form="tzdfeooh"
            data-base-url="https://app.youform.com"
            data-width="100%"
            data-height="700"
          />
        </div>
      </dialog>
    </>
  );
}
