'use client';

import { useCallback, useState } from 'react';

import { AlertTriangle, ArrowUpDown, Check, Copy } from 'lucide-react';
import { z } from 'zod';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';

const MAX_INPUT_SIZE = 10000; // 10,000 caracteres por razones de seguridad/rendimiento

const HexInputSchema = z.string().max(MAX_INPUT_SIZE, {
  message: `El texto no puede exceder ${MAX_INPUT_SIZE} caracteres por razones de seguridad`,
});

function encodeHex(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ');
}

function decodeHex(hex: string): string {
  const cleaned = hex.replace(/0x/gi, '').replace(/[\s,:_-]+/g, '');

  if (!cleaned) return '';

  if (!/^[0-9a-fA-F]+$/.test(cleaned)) {
    throw new Error('El texto contiene caracteres que no son hexadecimales válidos (0-9, A-F).');
  }

  if (cleaned.length % 2 !== 0) {
    throw new Error('La cadena hexadecimal tiene un número impar de dígitos: faltan bytes completos.');
  }

  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.slice(i, i + 2), 16);
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('Los bytes decodificados no forman texto UTF-8 válido.');
  }
}

export function HexEncoderComponent() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processText = useCallback(() => {
    setError(null);

    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const validationResult = HexInputSchema.safeParse(inputText);
    if (!validationResult.success) {
      setError(validationResult.error.issues[0]?.message || 'Entrada inválida');
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutputText(encodeHex(inputText));
      } else {
        setOutputText(decodeHex(inputText));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado al procesar el texto');
      setOutputText('');
    }
  }, [inputText, mode]);

  const handleInputChange = (value: string) => {
    setInputText(value);
    setError(null);
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInputText(outputText);
    setOutputText('');
    setError(null);
  };

  const copyToClipboard = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast.success('Copiado', {
        description: 'El resultado ha sido copiado al portapapeles',
      });

      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Error al copiar', {
        description: 'No se pudo copiar al portapapeles',
      });
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setError(null);
    setCopied(false);
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <Heading level={3}>
            {mode === 'encode' ? 'Codificar a Hexadecimal' : 'Decodificar desde Hexadecimal'}
          </Heading>

          <Button
            variant="outline"
            onClick={toggleMode}
            className="flex items-center gap-2"
            data-test="toggle-mode"
          >
            <ArrowUpDown className="h-4 w-4" />
            {mode === 'encode' ? 'Cambiar a Decodificar' : 'Cambiar a Codificar'}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="input-text">
            {mode === 'encode' ? 'Texto a codificar' : 'Hexadecimal a decodificar'}
          </Label>
          <Textarea
            id="input-text"
            placeholder={
              mode === 'encode'
                ? 'Introduce el texto que quieres codificar en hexadecimal...'
                : 'Introduce el hexadecimal a decodificar (con o sin espacios, ej. 48 65 6c 6c 6f)...'
            }
            value={inputText}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[120px] resize-y font-mono"
            data-test="input-text"
          />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>Caracteres: {inputText.length.toLocaleString()}</span>
            <span>Límite máximo: {MAX_INPUT_SIZE.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={processText} className="flex-1" data-test="process-button">
            {mode === 'encode' ? 'Codificar' : 'Decodificar'}
          </Button>
          <Button variant="outline" onClick={clearAll} data-test="clear-button">
            Limpiar
          </Button>
        </div>

        {outputText && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="output-text">
                {mode === 'encode' ? 'Resultado hexadecimal' : 'Texto decodificado'}
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-1"
                data-test="copy-button"
              >
                {copied ? (
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
            <Textarea
              id="output-text"
              value={outputText}
              readOnly
              className="bg-muted min-h-[120px] resize-y font-mono"
              data-test="output-text"
            />
            <div className="text-muted-foreground text-xs">
              Caracteres: {outputText.length.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-4">
          Información sobre codificación hexadecimal
        </Heading>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-medium">¿Qué es la codificación hexadecimal?</h4>
            <p className="text-muted-foreground text-sm">
              Representa cada byte de un texto (codificado en UTF-8) como dos dígitos en base 16
              (0-9 y A-F). Es una forma legible de inspeccionar o transmitir datos binarios, muy
              usada en programación, protocolos de red y análisis de datos.
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Casos de uso comunes:</h4>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              <li>Depuración de datos binarios o payloads de red</li>
              <li>Representar colores, hashes o claves criptográficas</li>
              <li>Inspeccionar el contenido crudo de un archivo</li>
              <li>Interoperar con sistemas que esperan datos en hex</li>
            </ul>
          </div>

          <div className="rounded-md bg-amber-50 p-3 dark:bg-amber-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Consideraciones de seguridad:
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-amber-800 dark:text-amber-200">
              <li>El hexadecimal NO es un método de encriptación, solo codificación</li>
              <li>Los datos codificados en hexadecimal se decodifican trivialmente</li>
              <li>No uses hexadecimal para ocultar información sensible</li>
              <li>Para datos sensibles, usa métodos de encriptación apropiados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
