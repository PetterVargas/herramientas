'use client';

import { useCallback, useState } from 'react';

import { AlertTriangle, ArrowUpDown, Check, Copy, Link } from 'lucide-react';
import { z } from 'zod';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';

const MAX_INPUT_SIZE = 10000; // 10,000 character limit for security

const UrlInputSchema = z.string().max(MAX_INPUT_SIZE, {
  message: `El texto no puede exceder ${MAX_INPUT_SIZE} caracteres por razones de seguridad`,
});

export function UrlEncoderComponent() {
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

    try {
      const validationResult = UrlInputSchema.safeParse(inputText);

      if (!validationResult.success) {
        setError(validationResult.error.errors[0]?.message || 'Entrada inválida');
        setOutputText('');
        return;
      }

      if (mode === 'encode') {
        try {
          const encoded = encodeURIComponent(inputText);
          setOutputText(encoded);
        } catch {
          setError('Error al codificar: el texto contiene caracteres no válidos');
          setOutputText('');
        }
      } else {
        try {
          const decoded = decodeURIComponent(inputText);
          setOutputText(decoded);
        } catch {
          setError('Error al decodificar: URL encoding inválido o corrupto');
          setOutputText('');
        }
      }
    } catch {
      setError('Error inesperado al procesar el texto');
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

  const addExample = () => {
    const examples = {
      encode: 'https://ejemplo.com/buscar?q=mi consulta&filtro=activo',
      decode: 'https%3A//ejemplo.com/buscar%3Fq%3Dmi%20consulta%26filtro%3Dactivo',
    };

    setInputText(examples[mode]);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <Heading level={3}>{mode === 'encode' ? 'Codificar URL' : 'Decodificar URL'}</Heading>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={addExample}
              className="text-xs"
              data-test="add-example"
            >
              Ejemplo
            </Button>
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
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="input-text">
            {mode === 'encode' ? 'URL o texto a codificar' : 'URL codificada a decodificar'}
          </Label>
          <Textarea
            id="input-text"
            placeholder={
              mode === 'encode'
                ? 'Introduce la URL o texto que quieres codificar...\nEjemplo: https://ejemplo.com/buscar?q=mi consulta&filtro=activo'
                : 'Introduce la URL codificada que quieres decodificar...\nEjemplo: https%3A//ejemplo.com/buscar%3Fq%3Dmi%20consulta%26filtro%3Dactivo'
            }
            value={inputText}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[120px] resize-y"
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
                {mode === 'encode' ? 'URL codificada' : 'URL decodificada'}
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
          Información sobre URL Encoding
        </Heading>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-medium">¿Qué es URL Encoding?</h4>
            <p className="text-muted-foreground text-sm">
              URL encoding (también conocido como percent-encoding) convierte caracteres
              especiales en URLs a un formato seguro para transmisión web. Los caracteres
              se representan con % seguido de su código hexadecimal.
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Caracteres comunes codificados:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-mono">espacio</span>
                  <span className="text-muted-foreground font-mono">%20</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">!</span>
                  <span className="text-muted-foreground font-mono">%21</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">#</span>
                  <span className="text-muted-foreground font-mono">%23</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">$</span>
                  <span className="text-muted-foreground font-mono">%24</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-mono">&amp;</span>
                  <span className="text-muted-foreground font-mono">%26</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">+</span>
                  <span className="text-muted-foreground font-mono">%2B</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">=</span>
                  <span className="text-muted-foreground font-mono">%3D</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">?</span>
                  <span className="text-muted-foreground font-mono">%3F</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Casos de uso comunes:</h4>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              <li>Parámetros de consulta en URLs con espacios o caracteres especiales</li>
              <li>Formularios web que envían datos por GET</li>
              <li>APIs REST con parámetros en la URL</li>
              <li>Redirecciones con URLs como parámetros</li>
              <li>Construcción dinámica de enlaces</li>
            </ul>
          </div>

          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Link className="h-4 w-4 text-blue-600" />
              Buenas prácticas:
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-blue-800 dark:text-blue-200">
              <li>Siempre codifica parámetros de URL que contengan datos de usuario</li>
              <li>No codifiques toda la URL, solo los parámetros necesarios</li>
              <li>Usa las funciones nativas del lenguaje (encodeURIComponent en JS)</li>
              <li>Decodifica URLs antes de mostrarlas al usuario para mejor legibilidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
