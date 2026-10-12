'use client';

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';

import Script from 'next/script';
import { useTheme } from 'next-themes';

type WidgetSize = 'normal' | 'compact' | 'flexible';

interface TurnstileOptions {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: WidgetSize;
  language?: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export interface TurnstileHandle {
  /** Pide un token nuevo: cada token de Turnstile sirve para una sola consulta. */
  reset: () => void;
}

const SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? '';
const SIZES: WidgetSize[] = ['normal', 'compact', 'flexible'];
const SIZE = SIZES.find((size) => size === process.env.NEXT_PUBLIC_CAPTCHA_WIDGET_SIZE) ?? 'normal';

/**
 * Widget de Cloudflare Turnstile en modo de render explícito. Notifica el token
 * vigente (o null cuando expira o falla) con `onToken`; el token se envía al
 * servidor en el header `x-captcha-token` y se valida con `verifyCaptcha`.
 */
export function TurnstileWidget({
  onToken,
  ref,
}: {
  onToken: (token: string | null) => void;
  ref?: Ref<TurnstileHandle>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [scriptReady, setScriptReady] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current(null);
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!scriptReady || !container || !window.turnstile || !SITE_KEY) return;

    const widgetId = window.turnstile.render(container, {
      sitekey: SITE_KEY,
      size: SIZE,
      theme: resolvedTheme === 'dark' ? 'dark' : 'light',
      language: 'es',
      callback: (token) => onTokenRef.current(token),
      'expired-callback': () => onTokenRef.current(null),
      'error-callback': () => onTokenRef.current(null),
    });
    widgetIdRef.current = widgetId;

    return () => {
      onTokenRef.current(null);
      window.turnstile?.remove(widgetId);
      widgetIdRef.current = null;
    };
  }, [scriptReady, resolvedTheme]);

  if (!SITE_KEY) {
    return (
      <p className="text-destructive text-sm">
        Falta configurar NEXT_PUBLIC_CAPTCHA_SITE_KEY para la verificación anti-bots.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} data-test="captcha-widget" />
    </>
  );
}
