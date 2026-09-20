'use client';

import { useEffect, useState, type ReactNode } from 'react';

import {
  AlertTriangle,
  FileDown,
  Globe,
  Info,
  Loader2,
  MonitorSmartphone,
} from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { toast } from '@/components/ui/sonner';

import { formatDateWithUtcOffset } from '@/lib/datetime';
import { sha256Hex } from '@/lib/hash';

import { collectBrowserInfo, fetchIpGeoInfo, type BrowserInfo, type IpGeoInfo } from './ip-info';
import { buildIpReportPdf } from './ip-report-pdf';

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-sm font-medium break-all sm:text-right">{value}</span>
    </div>
  );
}

export function IpInfoComponent() {
  const [ipInfo, setIpInfo] = useState<IpGeoInfo | null>(null);
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [lastHash, setLastHash] = useState<string | null>(null);

  useEffect(() => {
    const info = collectBrowserInfo();

    fetchIpGeoInfo()
      .then((geo) => {
        setBrowserInfo(info);
        setIpInfo(geo);
      })
      .catch((err) => {
        setBrowserInfo(info);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleDownloadPdf = async () => {
    if (!ipInfo || !browserInfo) return;

    setIsGeneratingPdf(true);
    try {
      const pdfBytes = buildIpReportPdf(ipInfo, browserInfo);
      const hash = await sha256Hex(pdfBytes);
      setLastHash(hash);

      const filename = `reporte-ip-${hash}.pdf`;
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('PDF descargado', { description: filename });
    } catch (err) {
      toast.error('Error al generar el PDF', {
        description: err instanceof Error ? err.message : 'Error desconocido',
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Heading level={3}>Tu información pública</Heading>
          <Button
            onClick={handleDownloadPdf}
            disabled={isLoading || !ipInfo || isGeneratingPdf}
            data-test="download-pdf"
          >
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="mr-2 h-4 w-4" />
            )}
            Descargar reporte PDF
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Consultando tu dirección IP pública...
          </div>
        )}

        {ipInfo && (
          <div className="bg-muted/50 rounded-lg border p-6 text-center">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Tu dirección IP pública
            </p>
            <p className="font-mono text-3xl font-bold" data-test="public-ip">
              {ipInfo.ip}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {ipInfo.city}, {ipInfo.region}, {ipInfo.country} · {ipInfo.isp}
            </p>
          </div>
        )}

        {ipInfo && browserInfo && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Globe className="text-primary h-4 w-4" />
                <span className="text-sm font-semibold">Información de red</span>
              </div>
              <div className="rounded-lg border divide-y">
                <InfoRow label="Tipo de IP" value={ipInfo.type} />
                <InfoRow label="Ciudad" value={ipInfo.city} />
                <InfoRow label="Región" value={ipInfo.region} />
                <InfoRow label="País" value={`${ipInfo.country} (${ipInfo.countryCode})`} />
                <InfoRow label="Código postal" value={ipInfo.postal} />
                <InfoRow label="Proveedor (ISP)" value={ipInfo.isp} />
                <InfoRow label="Organización" value={ipInfo.org} />
                <InfoRow label="ASN" value={String(ipInfo.asn)} />
                <InfoRow
                  label="Zona horaria (IP)"
                  value={`${ipInfo.timezoneId}${ipInfo.timezoneUtc ? ` (UTC${ipInfo.timezoneUtc})` : ''}`}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <MonitorSmartphone className="text-primary h-4 w-4" />
                <span className="text-sm font-semibold">Navegador y dispositivo</span>
              </div>
              <div className="rounded-lg border divide-y">
                <InfoRow
                  label="Fecha y hora de visita"
                  value={formatDateWithUtcOffset(browserInfo.visitedAt)}
                />
                <InfoRow label="Idioma preferido" value={browserInfo.language} />
                <InfoRow label="Plataforma" value={browserInfo.platform} />
                <InfoRow label="Resolución de pantalla" value={browserInfo.screenResolution} />
                <InfoRow label="Zona horaria (navegador)" value={browserInfo.browserTimezone} />
                <InfoRow
                  label="Cookies habilitadas"
                  value={browserInfo.cookiesEnabled ? 'Sí' : 'No'}
                />
                <InfoRow label="Do Not Track" value={browserInfo.doNotTrack} />
                <InfoRow
                  label="Estado de conexión"
                  value={browserInfo.onLine ? 'En línea' : 'Sin conexión'}
                />
                <InfoRow label="Página de referencia" value={browserInfo.referrer} />
                <InfoRow label="User Agent" value={browserInfo.userAgent} />
              </div>
            </div>
          </div>
        )}

        {lastHash && (
          <div className="bg-muted rounded-md p-3 text-xs">
            <p className="mb-1 font-medium">Hash SHA-256 del último PDF descargado:</p>
            <p className="text-muted-foreground font-mono break-all">{lastHash}</p>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Heading level={3} className="mb-4">
          ¿Qué información recibe un sitio web al visitarlo?
        </Heading>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Cada vez que visitas una página, tu navegador y tu proveedor de internet revelan
            automáticamente cierta información: tu dirección IP pública, una ubicación
            aproximada derivada de esa IP, y datos de tu navegador como el user agent, el
            idioma y la resolución de pantalla. Esta herramienta consulta un servicio público
            de geolocalización por IP y reúne los datos que expone tu propio navegador para
            mostrarte exactamente lo que un sitio web podría ver.
          </p>

          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Info className="h-4 w-4 text-blue-600" />
              Sobre el reporte en PDF:
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-blue-800 dark:text-blue-200">
              <li>El PDF se genera completamente en tu navegador, sin pasar por ningún servidor.</li>
              <li>
                Al descargarlo, se calcula el hash SHA-256 del archivo y se incluye en el nombre
                para que puedas verificar su integridad.
              </li>
              <li>La ubicación por IP es aproximada y puede no corresponder a tu dirección exacta.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
