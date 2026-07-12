'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import {
  AlertTriangle,
  Download,
  Globe,
  Info,
  Mail,
  MessageCircle,
  QrCode,
  Smartphone,
  Wifi,
} from 'lucide-react';
import QRCodeLib from 'qrcode';
import { z } from 'zod';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';

const MAX_INPUT_SIZE = 2000; // 2,000 character limit for QR codes

const QRInputSchema = z.string().max(MAX_INPUT_SIZE, {
  message: `El texto no puede exceder ${MAX_INPUT_SIZE} caracteres para códigos QR`,
});

type QRType = 'url' | 'whatsapp' | 'email' | 'text' | 'wifi' | 'sms';

async function generateQRCode(text: string, size: number = 300): Promise<string> {
  try {
    const qrDataUrl = await QRCodeLib.toDataURL(text, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });

    return qrDataUrl;
  } catch (error) {
    throw new Error(
      'Error generating QR code: ' + (error instanceof Error ? error.message : 'Unknown error'),
    );
  }
}

export function QRGeneratorComponent() {
  const [inputText, setInputText] = useState('');
  const [qrType, setQRType] = useState<QRType>('url');
  const qrSize = 300;
  const [qrData, setQRData] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatTextForQRType = useCallback((text: string, type: QRType): string => {
    switch (type) {
      case 'url':
        if (text && !text.match(/^https?:\/\//)) {
          return `https://${text}`;
        }
        return text;
      case 'email':
        return text ? `mailto:${text}` : text;
      case 'sms':
        return text ? `sms:${text}` : text;
      case 'wifi':
        return text ? `WIFI:T:WPA;S:${text};P:;H:;` : text;
      case 'whatsapp':
        if (text) {
          const cleanNumber = text.replace(/\D/g, '');
          return cleanNumber ? `https://wa.me/${cleanNumber}` : text;
        }
        return text;
      case 'text':
      default:
        return text;
    }
  }, []);

  const generateQR = useCallback(async () => {
    setError(null);

    if (!inputText.trim()) {
      setQRData(null);
      return;
    }

    try {
      const validationResult = QRInputSchema.safeParse(inputText);

      if (!validationResult.success) {
        setError(validationResult.error.errors[0]?.message || 'Entrada inválida');
        setQRData(null);
        return;
      }

      setIsGenerating(true);

      const formattedText = formatTextForQRType(inputText, qrType);
      const qrDataUrl = await generateQRCode(formattedText, qrSize);
      setQRData(qrDataUrl);
    } catch (err) {
      setError(
        'Error al generar el código QR: ' + (err instanceof Error ? err.message : 'Error desconocido'),
      );
      setQRData(null);
    } finally {
      setIsGenerating(false);
    }
  }, [inputText, qrType, formatTextForQRType]);

  const handleInputChange = (value: string) => {
    setInputText(value);
    setError(null);
  };

  const handleTypeChange = (type: QRType) => {
    setQRType(type);
    setError(null);
  };

  const downloadQR = () => {
    if (!qrData) return;

    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Descargado', {
      description: 'El código QR se ha descargado correctamente',
    });
  };

  const clearAll = () => {
    setInputText('');
    setQRData(null);
    setError(null);
    setQRType('url');
  };

  const addExample = () => {
    const examples: Record<QRType, string> = {
      url: 'https://ejemplo.com',
      whatsapp: '+573001234567',
      email: 'contacto@ejemplo.com',
      text: 'Hola! Este es un código QR de texto',
      wifi: 'MiRedWiFi',
      sms: '+1234567890',
    };

    setInputText(examples[qrType]);
    setError(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQR();
    }, 500);

    return () => clearTimeout(timer);
  }, [generateQR]);

  const getPlaceholder = () => {
    switch (qrType) {
      case 'url':
        return 'Introduce la URL...\nEjemplo: https://ejemplo.com';
      case 'whatsapp':
        return 'Introduce el número de WhatsApp...\nEjemplo: +573001234567';
      case 'email':
        return 'Introduce el email...\nEjemplo: contacto@ejemplo.com';
      case 'text':
        return 'Introduce el texto para el código QR...\nEjemplo: Hola mundo!';
      case 'wifi':
        return 'Introduce el nombre de la red WiFi...\nEjemplo: MiRedWiFi';
      case 'sms':
        return 'Introduce el número de teléfono...\nEjemplo: +1234567890';
      default:
        return 'Introduce el contenido para el código QR...';
    }
  };

  const getTypeIcon = (type: QRType) => {
    switch (type) {
      case 'url':
        return <Globe className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'text':
        return <QrCode className="h-4 w-4" />;
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'sms':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <QrCode className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <Heading level={3}>Generador de Código QR</Heading>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={addExample} className="text-xs" data-test="add-example">
              Ejemplo
            </Button>
            <Button variant="outline" onClick={clearAll} data-test="clear-button">
              Limpiar
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr-type">Tipo de código QR</Label>
              <Select value={qrType} onValueChange={handleTypeChange}>
                <SelectTrigger id="qr-type" data-test="qr-type-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">
                    <div className="flex items-center gap-2">
                      {getTypeIcon('url')}
                      URL/Enlace
                    </div>
                  </SelectItem>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center gap-2">
                      {getTypeIcon('whatsapp')}
                      WhatsApp
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      {getTypeIcon('email')}
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      {getTypeIcon('text')}
                      Texto
                    </div>
                  </SelectItem>
                  <SelectItem value="wifi">
                    <div className="flex items-center gap-2">
                      {getTypeIcon('wifi')}
                      WiFi
                    </div>
                  </SelectItem>
                  <SelectItem value="sms">
                    <div className="flex items-center gap-2">
                      {getTypeIcon('sms')}
                      SMS
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="input-text">Contenido del código QR</Label>
              <Textarea
                id="input-text"
                placeholder={getPlaceholder()}
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
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Código QR generado</Label>
              {isGenerating && <span className="text-muted-foreground text-xs">Generando...</span>}
            </div>

            <div className="flex flex-col items-center space-y-4">
              {qrData ? (
                <>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-4">
                    <Image
                      src={qrData}
                      alt="Código QR generado"
                      className="h-auto max-w-full"
                      width={qrSize}
                      height={qrSize}
                      data-test="qr-image"
                      unoptimized
                    />
                  </div>
                  <Button onClick={downloadQR} className="flex items-center gap-2" data-test="download-button">
                    <Download className="h-4 w-4" />
                    Descargar PNG
                  </Button>
                </>
              ) : (
                <div
                  className="bg-muted flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
                  style={{ width: qrSize, height: qrSize }}
                >
                  <div className="text-muted-foreground text-center">
                    <QrCode className="mx-auto mb-2 h-12 w-12 opacity-50" />
                    <p className="text-sm">El código QR aparecerá aquí</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-4">
          Información sobre Códigos QR
        </Heading>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-medium">¿Qué son los códigos QR?</h4>
            <p className="text-muted-foreground text-sm">
              Los códigos QR (Quick Response) son códigos de barras bidimensionales que
              pueden almacenar información como texto, URLs, datos de contacto y más. Se
              pueden escanear rápidamente con smartphones y otros dispositivos.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium">Tipos soportados:</h4>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                <li>
                  <strong>URL:</strong> Enlaces web (se agrega https:// automáticamente)
                </li>
                <li>
                  <strong>WhatsApp:</strong> Chat directo en WhatsApp
                </li>
                <li>
                  <strong>Email:</strong> Direcciones de correo (formato mailto:)
                </li>
                <li>
                  <strong>Texto:</strong> Texto plano simple
                </li>
                <li>
                  <strong>WiFi:</strong> Información de red inalámbrica
                </li>
                <li>
                  <strong>SMS:</strong> Números de teléfono para mensajes
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Casos de uso comunes:</h4>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                <li>Compartir información de contacto</li>
                <li>Enlaces a sitios web o redes sociales</li>
                <li>Configuración rápida de WiFi</li>
                <li>Chat directo en WhatsApp Business</li>
                <li>Menús de restaurantes digitales</li>
                <li>Soporte técnico vía WhatsApp</li>
              </ul>
            </div>
          </div>

          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Info className="h-4 w-4 text-blue-600" />
              Consejos de uso:
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-blue-800 dark:text-blue-200">
              <li>Mantén el contenido conciso para mejor legibilidad</li>
              <li>Prueba el QR en diferentes dispositivos antes de usar</li>
              <li>Usa tamaños apropiados según el medio (web, impreso)</li>
              <li>Asegúrate de que haya suficiente contraste para escanear</li>
              <li>No incluyas información sensible o confidencial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
