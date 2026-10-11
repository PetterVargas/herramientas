'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { Check, Copy, Eye, EyeOff, Link2, RefreshCcw } from 'lucide-react';
import QRCodeLib from 'qrcode';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import {
  base32Decode,
  buildOtpauthUri,
  generateSecret,
  generateTotp,
  type TotpAlgorithm,
  type TotpOptions,
} from '@/lib/totp';

const DEFAULT_SECRET = 'JBSWY3DPEHPK3PXP';
const ALGORITHMS: TotpAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-512'];
const MIN_PERIOD = 1;
const MAX_PERIOD = 300;

interface Tokens {
  previous: string;
  current: string;
  next: string;
}

function parseAlgorithm(value: string | null): TotpAlgorithm | null {
  if (!value) return null;
  const normalized = value.toUpperCase().replace(/^SHA-?/, 'SHA-');
  return ALGORITHMS.find((alg) => alg === normalized) ?? null;
}

/** Agrupa el código en dos mitades para facilitar su lectura (123 456). */
function formatToken(token: string): string {
  const half = Math.ceil(token.length / 2);
  return `${token.slice(0, half)} ${token.slice(half)}`;
}

export function TotpGeneratorComponent() {
  const [secret, setSecret] = useState(DEFAULT_SECRET);
  const [showSecret, setShowSecret] = useState(true);
  const [digits, setDigits] = useState(6);
  const [period, setPeriod] = useState(30);
  const [algorithm, setAlgorithm] = useState<TotpAlgorithm>('SHA-1');
  const [issuer, setIssuer] = useState('');
  const [account, setAccount] = useState('');

  const [now, setNow] = useState<number | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  const options: TotpOptions = useMemo(
    () => ({ digits, period, algorithm }),
    [digits, period, algorithm],
  );

  // Carga la configuración desde la URL. Se acepta el fragmento (#key=...),
  // que no se envía al servidor, y los parámetros de consulta (?key=...).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const get = (name: string) => hashParams.get(name) ?? params.get(name);

    /* eslint-disable react-hooks/set-state-in-effect */
    const key = get('key') ?? get('secret');
    if (key) setSecret(key);

    const urlDigits = Number(get('digits'));
    if (Number.isInteger(urlDigits) && urlDigits >= 6 && urlDigits <= 8) setDigits(urlDigits);

    const urlPeriod = Number(get('period'));
    if (Number.isInteger(urlPeriod) && urlPeriod >= MIN_PERIOD && urlPeriod <= MAX_PERIOD) {
      setPeriod(urlPeriod);
    }

    const urlAlgorithm = parseAlgorithm(get('algorithm'));
    if (urlAlgorithm) setAlgorithm(urlAlgorithm);

    const urlIssuer = get('issuer');
    if (urlIssuer) setIssuer(urlIssuer);
    const urlAccount = get('account');
    if (urlAccount) setAccount(urlAccount);

    // Inicializa el reloj solo en cliente para evitar mismatch de hidratación.
    setNow(Date.now());
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, []);

  const counter = now === null ? null : Math.floor(now / 1000 / period);
  const secondsRemaining = now === null ? period : period - (Math.floor(now / 1000) % period);

  // Recalcula los códigos solo cuando cambia la ventana de tiempo o la configuración.
  useEffect(() => {
    if (counter === null) return;

    let cancelled = false;
    const windowStart = counter * period * 1000;

    try {
      base32Decode(secret);
    } catch (err) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setError(err instanceof Error ? err.message : 'Clave secreta inválida');
      setTokens(null);
      /* eslint-enable react-hooks/set-state-in-effect */
      return;
    }

    Promise.all([
      generateTotp(secret, options, windowStart - period * 1000),
      generateTotp(secret, options, windowStart),
      generateTotp(secret, options, windowStart + period * 1000),
    ])
      .then(([previous, current, next]) => {
        if (cancelled) return;
        setTokens({ previous, current, next });
        setError(null);
      })
      .catch(() => {
        if (cancelled) return;
        setError('No se pudo calcular el código');
        setTokens(null);
      });

    return () => {
      cancelled = true;
    };
  }, [counter, secret, options, period]);

  const otpauthUri = useMemo(() => {
    if (error) return null;
    return buildOtpauthUri(secret, options, issuer.trim(), account.trim());
  }, [secret, options, issuer, account, error]);

  useEffect(() => {
    if (!otpauthUri) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQrData(null);
      return;
    }

    let cancelled = false;
    QRCodeLib.toDataURL(otpauthUri, {
      width: 220,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
      errorCorrectionLevel: 'M',
    })
      .then((data) => {
        if (!cancelled) setQrData(data);
      })
      .catch(() => {
        if (!cancelled) setQrData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [otpauthUri]);

  const copyText = async (text: string, successTitle: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successTitle);
      return true;
    } catch {
      toast.error('Error al copiar', {
        description: 'No se pudo copiar al portapapeles',
      });
      return false;
    }
  };

  const copyToken = async () => {
    if (!tokens) return;
    if (await copyText(tokens.current, 'Código copiado')) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const copyShareLink = () => {
    const params = new URLSearchParams({
      key: secret,
      digits: String(digits),
      period: String(period),
      algorithm,
    });
    if (issuer.trim()) params.set('issuer', issuer.trim());
    if (account.trim()) params.set('account', account.trim());
    const url = `${window.location.origin}${window.location.pathname}#${params.toString()}`;
    copyText(url, 'Enlace copiado');
  };

  const handleGenerateSecret = useCallback(() => {
    setSecret(generateSecret());
    setShowSecret(true);
  }, []);

  const handlePeriodChange = (value: string) => {
    const parsed = Number(value);
    if (Number.isInteger(parsed)) {
      setPeriod(Math.min(MAX_PERIOD, Math.max(MIN_PERIOD, parsed)));
    }
  };

  const progress = (secondsRemaining / period) * 100;
  const isExpiring = secondsRemaining <= 5;

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="space-y-2">
          <Label htmlFor="totp-secret">Clave secreta (Base32)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="totp-secret"
              type={showSecret ? 'text' : 'password'}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="JBSWY3DPEHPK3PXP"
              autoComplete="off"
              spellCheck={false}
              className="font-mono"
              data-test="totp-secret"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSecret((value) => !value)}
              title={showSecret ? 'Ocultar clave' : 'Mostrar clave'}
            >
              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleGenerateSecret}
              title="Generar clave aleatoria"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="totp-digits">Dígitos</Label>
            <Select value={String(digits)} onValueChange={(value) => setDigits(Number(value))}>
              <SelectTrigger id="totp-digits" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totp-period">Periodo (segundos)</Label>
            <Input
              id="totp-period"
              type="number"
              min={MIN_PERIOD}
              max={MAX_PERIOD}
              value={period}
              onChange={(e) => handlePeriodChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totp-algorithm">Algoritmo</Label>
            <Select
              value={algorithm}
              onValueChange={(value) => setAlgorithm(value as TotpAlgorithm)}
            >
              <SelectTrigger id="totp-algorithm" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALGORITHMS.map((alg) => (
                  <SelectItem key={alg} value={alg}>
                    {alg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={copyToken}
                title="Copiar código"
                className="bg-muted/80 border-primary/50 text-foreground dark:bg-muted/90 flex-1 cursor-pointer rounded-md border-2 px-4 py-4 text-center font-mono text-4xl font-bold tracking-widest shadow-md transition-shadow hover:shadow-lg"
                data-test="totp-token"
              >
                {tokens ? formatToken(tokens.current) : '—'}
              </button>
              <Button variant="outline" size="icon" onClick={copyToken} title="Copiar código">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div className="space-y-1">
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div
                  className={`h-full transition-[width] duration-200 ease-linear ${
                    isExpiring ? 'bg-destructive' : 'bg-primary'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-muted-foreground text-center text-sm">
                Se actualiza en <span className="font-semibold">{secondsRemaining}</span>{' '}
                {secondsRemaining === 1 ? 'segundo' : 'segundos'}
              </p>
            </div>

            {tokens && (
              <div className="text-muted-foreground grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <p>Anterior</p>
                  <p className="font-mono text-base">{formatToken(tokens.previous)}</p>
                </div>
                <div>
                  <p>Siguiente</p>
                  <p className="font-mono text-base">{formatToken(tokens.next)}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <Button variant="outline" onClick={copyShareLink} className="w-full" disabled={!!error}>
          <Link2 className="mr-2 h-4 w-4" />
          Copiar enlace con esta configuración
        </Button>
      </div>

      <div className="bg-card space-y-4 rounded-lg border p-6">
        <Heading level={3}>Agregar a una app autenticadora</Heading>
        <p className="text-muted-foreground text-sm">
          Escanea el código QR con Google Authenticator, Microsoft Authenticator, Authy u otra app
          compatible para comprobar que genera los mismos códigos.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="totp-issuer">Emisor (opcional)</Label>
            <Input
              id="totp-issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="Mi empresa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totp-account">Cuenta (opcional)</Label>
            <Input
              id="totp-account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="usuario@ejemplo.com"
            />
          </div>
        </div>

        {qrData && otpauthUri && (
          <div className="flex flex-col items-center gap-3">
            <Image
              src={qrData}
              alt="Código QR con la URI otpauth"
              width={220}
              height={220}
              unoptimized
              className="rounded-md border"
            />
            <div className="flex w-full items-center space-x-2">
              <Input
                value={otpauthUri}
                readOnly
                className="font-mono text-xs"
                aria-label="URI otpauth"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyText(otpauthUri, 'URI copiada')}
                title="Copiar URI"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-4">
          ¿Cómo funciona TOTP?
        </Heading>

        <ul className="list-disc space-y-1 pl-5">
          <li>
            TOTP (RFC 6238) combina una clave secreta compartida con la hora actual para generar un
            código que cambia cada cierto número de segundos
          </li>
          <li>
            El servidor y tu app calculan el mismo código de forma independiente, sin conexión
          </li>
          <li>
            La configuración estándar es SHA-1, 6 dígitos y 30 segundos; cámbiala solo si el
            servicio lo indica
          </li>
          <li>
            Todos los cálculos se hacen en tu navegador: la clave secreta nunca se envía a ningún
            servidor
          </li>
          <li>
            El enlace para compartir guarda la clave en el fragmento (#) de la URL; trátalo como una
            contraseña
          </li>
        </ul>
      </div>
    </div>
  );
}
