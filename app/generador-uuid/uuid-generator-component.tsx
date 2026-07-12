'use client';

import { useCallback, useEffect, useState } from 'react';

import { Check, Copy, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

export function UuidGeneratorComponent() {
  const [uuid, setUuid] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUuid = useCallback(() => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
    setCopied(false);
  }, []);

  const copyToClipboard = async () => {
    if (!uuid) return;

    try {
      await navigator.clipboard.writeText(uuid);
      setCopied(true);
      toast.success('UUID copiado', {
        description: 'UUID ha sido copiado al portapapeles',
      });

      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Error al copiar', {
        description: 'No se pudo copiar el UUID al portapapeles',
      });
    }
  };

  useEffect(() => {
    if (!uuid) {
      generateUuid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-card space-y-4 rounded-lg border p-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              id="generated-uuid"
              type="text"
              value={uuid}
              readOnly
              className="bg-muted/80 border-primary/50 text-foreground dark:bg-muted/90 h-auto rounded-md border-2 px-4 py-3 text-center font-mono text-lg font-bold tracking-wide shadow-md transition-shadow hover:shadow-lg"
              data-test="generated-uuid"
            />

            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              title="Copiar al portapapeles"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={generateUuid}
              title="Generar nuevo UUID"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button onClick={generateUuid} className="mt-4 w-full">
          Generar un nuevo UUID
        </Button>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-4">
          Tips sobre UUIDs
        </Heading>

        <ul className="list-disc space-y-1 pl-5">
          <li>Los UUIDs son únicos globalmente sin coordinación central</li>
          <li>Perfectos como claves primarias en bases de datos distribuidas</li>
          <li>El formato v4 es completamente aleatorio y más seguro que v1</li>
          <li>Usa UUIDs para identificadores de sesión, archivos o transacciones</li>
          <li>La probabilidad de colisión es prácticamente inexistente</li>
        </ul>
      </div>
    </div>
  );
}
