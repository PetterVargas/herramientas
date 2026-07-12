'use client';

import { useCallback, useEffect, useState } from 'react';

import { Check, Copy, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/sonner';

// Usa crypto.getRandomValues (CSPRNG) en vez de Math.random() para que la
// contraseña generada no sea predecible.
function secureRandomIndex(max: number): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0]! % max;
}

export function PasswordGeneratorComponent() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleUppercaseChange = (checked: boolean | 'indeterminate') => {
    setIncludeUppercase(checked === true);
  };

  const handleLowercaseChange = (checked: boolean | 'indeterminate') => {
    setIncludeLowercase(checked === true);
  };

  const handleNumbersChange = (checked: boolean | 'indeterminate') => {
    setIncludeNumbers(checked === true);
  };

  const handleSymbolsChange = (checked: boolean | 'indeterminate') => {
    setIncludeSymbols(checked === true);
  };

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === '') {
      charset = lowercase;
      setIncludeLowercase(true);
    }

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset[secureRandomIndex(charset.length)];
    }

    setPassword(newPassword);
    setCopied(false);
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols, passwordLength]);

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success('Contraseña copiada', {
        description: 'La contraseña ha sido copiada al portapapeles',
      });

      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Error al copiar', {
        description: 'No se pudo copiar la contraseña al portapapeles',
      });
    }
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-card space-y-4 rounded-lg border p-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              id="generated-password"
              type="text"
              value={password}
              readOnly
              className="bg-muted/80 border-primary/50 text-foreground dark:bg-muted/90 h-auto rounded-md border-2 px-4 py-3 text-center font-mono text-3xl font-bold tracking-wide shadow-md transition-shadow hover:shadow-lg"
              data-test="generated-password"
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
              onClick={generatePassword}
              title="Generar nueva contraseña"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password-length">Longitud</Label>
            <span className="text-sm">{passwordLength} caracteres</span>
          </div>
          <Slider
            id="password-length"
            min={4}
            max={64}
            step={1}
            value={[passwordLength]}
            onValueChange={(value: number[]) => setPasswordLength(value[0] ?? passwordLength)}
          />
        </div>

        <div className="space-y-3 pt-4">
          <Label>Incluir caracteres</Label>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-uppercase"
                checked={includeUppercase}
                onCheckedChange={handleUppercaseChange}
              />
              <Label htmlFor="include-uppercase" className="text-sm font-normal">
                Mayúsculas (A-Z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-lowercase"
                checked={includeLowercase}
                onCheckedChange={handleLowercaseChange}
              />
              <Label htmlFor="include-lowercase" className="text-sm font-normal">
                Minúsculas (a-z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-numbers"
                checked={includeNumbers}
                onCheckedChange={handleNumbersChange}
              />
              <Label htmlFor="include-numbers" className="text-sm font-normal">
                Números (0-9)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-symbols"
                checked={includeSymbols}
                onCheckedChange={handleSymbolsChange}
              />
              <Label htmlFor="include-symbols" className="text-sm font-normal">
                Símbolos (!@#$%^&amp;*)
              </Label>
            </div>
          </div>
        </div>

        <Button onClick={generatePassword} className="mt-4 w-full">
          Generar una nueva contraseña
        </Button>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-4">
          Tips de Seguridad en Contraseñas
        </Heading>

        <ul className="list-disc space-y-1 pl-5">
          <li>Usa contraseñas diferentes para cada cuenta</li>
          <li>Las contraseñas largas (16+ caracteres) son más seguras que las cortas y complejas</li>
          <li>Considera usar un administrador de contraseñas para almacenarlas de forma segura</li>
          <li>Activa la autenticación de dos factores (2FA) siempre que sea posible</li>
          <li>Cambia periódicamente las contraseñas de cuentas críticas</li>
        </ul>
      </div>
    </div>
  );
}
