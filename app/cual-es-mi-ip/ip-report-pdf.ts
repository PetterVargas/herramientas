import { jsPDF } from 'jspdf';

import { formatDateWithUtcOffset } from '@/lib/datetime';
import { drawGeneratedByDivisionCero } from '@/lib/pdf-report';

import type { BrowserInfo, IpGeoInfo } from './ip-info';

const MARGIN_X = 14;
const PAGE_WIDTH = 210;
const LABEL_WIDTH = 52;
const VALUE_WIDTH = PAGE_WIDTH - MARGIN_X * 2 - LABEL_WIDTH;

function addSectionTitle(doc: jsPDF, title: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text(title, MARGIN_X, y);
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y + 1.5, PAGE_WIDTH - MARGIN_X, y + 1.5);
  return y + 8;
}

function addRow(doc: jsPDF, label: string, value: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(label, MARGIN_X, y);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  const lines: string[] = doc.splitTextToSize(value || 'No disponible', VALUE_WIDTH);
  doc.text(lines, MARGIN_X + LABEL_WIDTH, y);

  return y + lines.length * 5 + 2;
}

/**
 * Genera el PDF de forma síncrona (jsPDF produce el arraybuffer sin pasos
 * async), así el hash SHA-256 se calcula sobre bytes ya definitivos y el
 * nombre del archivo puede incluirlo sin ninguna dependencia circular.
 */
export function buildIpReportPdf(ipInfo: IpGeoInfo, browserInfo: BrowserInfo): ArrayBuffer {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text('Reporte de Dirección IP', MARGIN_X, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  drawGeneratedByDivisionCero(doc, MARGIN_X, 26);
  doc.text(`Fecha y hora de generación: ${formatDateWithUtcOffset(browserInfo.visitedAt)}`, MARGIN_X, 31);

  let y = 42;

  y = addSectionTitle(doc, 'Información de red (según tu IP pública)', y);
  y = addRow(doc, 'Dirección IP', ipInfo.ip, y);
  y = addRow(doc, 'Tipo de IP', ipInfo.type, y);
  y = addRow(doc, 'Ciudad', ipInfo.city, y);
  y = addRow(doc, 'Región', ipInfo.region, y);
  y = addRow(doc, 'País', `${ipInfo.country} (${ipInfo.countryCode})`, y);
  y = addRow(doc, 'Código postal', ipInfo.postal, y);
  y = addRow(doc, 'Coordenadas aprox.', `${ipInfo.latitude}, ${ipInfo.longitude}`, y);
  y = addRow(doc, 'Proveedor (ISP)', ipInfo.isp, y);
  y = addRow(doc, 'Organización', ipInfo.org, y);
  y = addRow(doc, 'ASN', String(ipInfo.asn), y);
  y = addRow(
    doc,
    'Zona horaria (IP)',
    `${ipInfo.timezoneId}${ipInfo.timezoneUtc ? ` (UTC${ipInfo.timezoneUtc})` : ''}`,
    y,
  );

  y += 6;
  y = addSectionTitle(doc, 'Información del navegador y dispositivo', y);
  y = addRow(doc, 'Fecha y hora de visita', formatDateWithUtcOffset(browserInfo.visitedAt), y);
  y = addRow(doc, 'User Agent', browserInfo.userAgent, y);
  y = addRow(doc, 'Idioma preferido', browserInfo.language, y);
  y = addRow(doc, 'Idiomas configurados', browserInfo.languages, y);
  y = addRow(doc, 'Plataforma', browserInfo.platform, y);
  y = addRow(doc, 'Resolución de pantalla', browserInfo.screenResolution, y);
  y = addRow(doc, 'Profundidad de color', `${browserInfo.colorDepth} bits`, y);
  y = addRow(doc, 'Zona horaria (navegador)', browserInfo.browserTimezone, y);
  y = addRow(doc, 'Cookies habilitadas', browserInfo.cookiesEnabled ? 'Sí' : 'No', y);
  y = addRow(doc, 'Do Not Track', browserInfo.doNotTrack, y);
  y = addRow(doc, 'Estado de conexión', browserInfo.onLine ? 'En línea' : 'Sin conexión', y);
  y = addRow(doc, 'Página de referencia', browserInfo.referrer, y);
  y = addRow(doc, 'URL visitada', browserInfo.pageUrl, y);

  y += 6;
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y, PAGE_WIDTH - MARGIN_X, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  const disclaimer = doc.splitTextToSize(
    'Este reporte se generó completamente en tu navegador, sin enviar datos a ningún servidor propio. ' +
      'La información de geolocalización proviene de un servicio público de consulta por IP y es aproximada.',
    PAGE_WIDTH - MARGIN_X * 2,
  );
  doc.text(disclaimer, MARGIN_X, y);

  return doc.output('arraybuffer');
}
