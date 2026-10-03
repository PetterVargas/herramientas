'use client';

import { useState, type FormEvent, type ReactNode } from 'react';

import {
  AlertTriangle,
  Check,
  Copy,
  FileDown,
  Info,
  Loader2,
  Network,
  Search,
  Server,
  Users,
} from 'lucide-react';
import { z } from 'zod';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

import { sha256Hex } from '@/lib/hash';

import { buildWhoisIpReportPdf } from '../_lib/report-pdf';
import {
  fetchIspInfo,
  formatRdapDate,
  formatRoles,
  getRegistrantName,
  isPrivateOrReservedIp,
  type WhoisIpResponse,
  type WhoisIpResult,
  type WhoisIspInfo,
} from '../_lib/whois';

const IpSchema = z.union([z.ipv4(), z.ipv6()]);

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-sm font-medium break-all sm:text-right">
        {value || 'No disponible'}
      </span>
    </div>
  );
}

export function WhoisIpComponent() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<WhoisIpResult | null>(null);
  const [isp, setIsp] = useState<WhoisIspInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [lastHash, setLastHash] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = ip.trim();

    if (!IpSchema.safeParse(trimmed).success) {
      setError('Introduce una dirección IPv4 o IPv6 válida (por ejemplo 8.8.8.8)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsp(null);
    setLastHash(null);
    setShowRaw(false);

    try {
      const [response, ispInfo] = await Promise.all([
        fetch('/api/whois/ip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ip: trimmed }),
        }),
        fetchIspInfo(trimmed),
      ]);
      const data: WhoisIpResponse = await response.json();

      if (!data.success) {
        setError(data.error);
        return;
      }
      setResult(data.data);
      setIsp(ispInfo);
    } catch {
      setError('No se pudo conectar con el servicio WHOIS. Intenta de nuevo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;

    setIsGeneratingPdf(true);
    try {
      const pdfBytes = buildWhoisIpReportPdf(result, isp);
      const hash = await sha256Hex(pdfBytes);
      setLastHash(hash);

      const filename = `reporte-whois-ip-${hash}.pdf`;
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

  const copyRaw = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.raw);
      setCopied(true);
      toast.success('Copiado', { description: 'La respuesta RDAP se copió al portapapeles' });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Error al copiar', { description: 'No se pudo copiar al portapapeles' });
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <Heading level={3}>Consultar WHOIS de una IP</Heading>

        <form onSubmit={handleSubmit} className="space-y-2">
          <Label htmlFor="ip-input">Dirección IP (IPv4 o IPv6)</Label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="ip-input"
              placeholder="Ej: 8.8.8.8 o 2800:3f0:4005::1"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="font-mono"
              autoComplete="off"
              spellCheck={false}
              maxLength={45}
              data-test="ip-input"
            />
            <Button type="submit" disabled={isLoading || !ip.trim()} data-test="lookup-button">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Consultar
            </Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Consultando el registro regional de Internet...
          </div>
        )}

        {result && (
          <>
            <div className="bg-muted/50 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-6">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Dirección IP consultada
                </p>
                <p className="font-mono text-3xl font-bold break-all" data-test="queried-ip">
                  {result.query}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {[isp?.isp, isp?.asn, isp?.location || result.country, result.registry]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <Button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
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

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Server className="text-primary h-4 w-4" />
                <span className="text-sm font-semibold">
                  Proveedor de Servicio de Internet (ISP)
                </span>
              </div>
              {isp ? (
                <div className="space-y-3 rounded-lg border p-4">
                  <p className="text-sm">
                    Esta IP pertenece al ISP{' '}
                    <span className="font-semibold" data-test="isp-name">
                      {isp.isp || isp.organization}
                    </span>
                    {isp.asn && <span className="text-muted-foreground"> ({isp.asn})</span>}
                  </p>
                  <div className="divide-y rounded-lg border">
                    <InfoRow label="ISP" value={isp.isp} />
                    <InfoRow label="Organización" value={isp.organization} />
                    <InfoRow label="ASN" value={isp.asn} />
                    <InfoRow label="Dominio del ISP" value={isp.domain} />
                    <InfoRow label="Ubicación aproximada" value={isp.location} />
                    <InfoRow
                      label="Titular del bloque (WHOIS)"
                      value={getRegistrantName(result) || result.name}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground rounded-lg border p-3 text-sm">
                  No se encontró información del ISP para esta dirección IP. Titular del bloque
                  según el WHOIS: {getRegistrantName(result) || result.name || 'No disponible'}.
                </p>
              )}
            </div>

            {isPrivateOrReservedIp(result.query) && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Esta es una dirección privada o reservada: no pertenece a ninguna organización
                  en Internet y su WHOIS solo muestra el bloque reservado por IANA.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Network className="text-primary h-4 w-4" />
                  <span className="text-sm font-semibold">Red asignada</span>
                </div>
                <div className="divide-y rounded-lg border">
                  <InfoRow label="Identificador" value={result.handle} />
                  <InfoRow label="Nombre de la red" value={result.name} />
                  <InfoRow
                    label="Rango"
                    value={
                      result.startAddress && `${result.startAddress} - ${result.endAddress}`
                    }
                  />
                  <InfoRow label="CIDR" value={result.cidrs.join(', ')} />
                  <InfoRow label="Tipo de asignación" value={result.type} />
                  <InfoRow label="Estado" value={result.status.join(', ')} />
                  <InfoRow label="País" value={result.country} />
                  <InfoRow label="ASN de origen" value={result.originAsns.join(', ')} />
                  <InfoRow label="Red padre" value={result.parentHandle} />
                  <InfoRow
                    label="Fecha de registro"
                    value={formatRdapDate(result.registrationDate)}
                  />
                  <InfoRow
                    label="Última modificación"
                    value={formatRdapDate(result.lastChangedDate)}
                  />
                  <InfoRow label="Registro regional" value={result.registry} />
                  <InfoRow label="Servidor WHOIS" value={result.port43} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Users className="text-primary h-4 w-4" />
                  <span className="text-sm font-semibold">Contactos</span>
                </div>
                {result.contacts.length === 0 ? (
                  <p className="text-muted-foreground rounded-lg border p-3 text-sm">
                    El registro no publica contactos para esta red.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {result.contacts.map((contact, index) => (
                      <div
                        key={`${contact.handle}-${index}`}
                        className="space-y-1 rounded-lg border p-3 text-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-medium">{contact.name || contact.handle}</span>
                          <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs">
                            {formatRoles(contact.roles) || 'Sin rol'}
                          </span>
                        </div>
                        {contact.handle && (
                          <p className="text-muted-foreground font-mono text-xs">
                            {contact.handle}
                          </p>
                        )}
                        {contact.emails.map((email) => (
                          <p key={email} className="break-all">
                            {email}
                          </p>
                        ))}
                        {contact.phones.map((phone) => (
                          <p key={phone} className="text-muted-foreground">
                            {phone}
                          </p>
                        ))}
                        {contact.address && (
                          <p className="text-muted-foreground">{contact.address}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {result.remarks.length > 0 && (
              <div>
                <span className="mb-2 block text-sm font-semibold">
                  Observaciones del registro
                </span>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                  {result.remarks.map((remark, index) => (
                    <li key={index}>{remark}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRaw((value) => !value)}
                  data-test="toggle-raw"
                >
                  {showRaw ? 'Ocultar respuesta RDAP' : 'Ver respuesta RDAP completa'}
                </Button>
                {showRaw && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyRaw}
                    className="flex items-center gap-1"
                    data-test="copy-raw"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? 'Copiado' : 'Copiar JSON'}
                  </Button>
                )}
              </div>
              {showRaw && (
                <pre className="bg-muted max-h-96 overflow-auto rounded-md p-3 font-mono text-xs">
                  {result.raw}
                </pre>
              )}
            </div>
          </>
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
          ¿Qué es el WHOIS de una IP?
        </Heading>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Cada dirección IP pública pertenece a un bloque asignado por uno de los cinco
            registros regionales de Internet (LACNIC, ARIN, RIPE NCC, APNIC y AFRINIC). El WHOIS
            muestra a qué organización se asignó ese bloque, su rango, el país, el sistema
            autónomo (ASN) que la anuncia y los contactos técnicos y de abuso. Esta herramienta
            usa RDAP, el protocolo estándar que reemplaza al WHOIS clásico y entrega los mismos
            datos de forma estructurada.
          </p>

          <div>
            <h4 className="mb-2 font-medium">Usos en ciberseguridad:</h4>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              <li>Identificar el ISP detrás de una IP que aparece en logs o alertas</li>
              <li>Encontrar el contacto de abuso para reportar ataques, spam o phishing</li>
              <li>Documentar evidencias de un incidente con un reporte fechado y verificable</li>
              <li>Validar si una IP pertenece a un proveedor de nube, VPN o red corporativa</li>
            </ul>
          </div>

          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Info className="h-4 w-4 text-blue-600" />
              Sobre el reporte en PDF:
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-blue-800 dark:text-blue-200">
              <li>El PDF se genera en tu navegador a partir de la respuesta WHOIS/RDAP.</li>
              <li>
                Al descargarlo, se calcula el hash SHA-256 del archivo y se incluye en el nombre
                para que puedas verificar su integridad.
              </li>
              <li>
                El titular del bloque (WHOIS) y el ISP pueden ser distintos: un proveedor puede
                recibir el bloque de otra empresa o prestar servicio sobre IPs registradas por un
                tercero. El ISP se obtiene de un servicio público de consulta por IP (ipwho.is).
              </li>
              <li>
                Ninguno de los dos identifica a la persona que usa la dirección; para eso se
                requiere una solicitud formal al ISP.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
