import { jsPDF } from 'jspdf';

import { formatDateWithUtcOffset } from '@/lib/datetime';
import { drawGeneratedByDivisionCero } from '@/lib/pdf-report';

import {
  formatRdapDate,
  formatRoles,
  getRegistrantName,
  type WhoisIpResult,
  type WhoisIspInfo,
} from './whois';

const MARGIN_X = 14;
const PAGE_WIDTH = 210;
const PAGE_BOTTOM = 280;
const TOP_Y = 20;
const LABEL_WIDTH = 52;
const VALUE_WIDTH = PAGE_WIDTH - MARGIN_X * 2 - LABEL_WIDTH;

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed <= PAGE_BOTTOM) return y;
  doc.addPage();
  return TOP_Y;
}

function addSectionTitle(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text(title, MARGIN_X, y);
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y + 1.5, PAGE_WIDTH - MARGIN_X, y + 1.5);
  return y + 8;
}

function addRow(doc: jsPDF, label: string, value: string, y: number): number {
  doc.setFontSize(10);
  const lines: string[] = doc.splitTextToSize(value || 'No disponible', VALUE_WIDTH);
  y = ensureSpace(doc, y, lines.length * 5 + 2);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text(label, MARGIN_X, y);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(lines, MARGIN_X + LABEL_WIDTH, y);

  return y + lines.length * 5 + 2;
}

function addParagraph(doc: jsPDF, text: string, y: number): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  const lines: string[] = doc.splitTextToSize(text, PAGE_WIDTH - MARGIN_X * 2);
  y = ensureSpace(doc, y, lines.length * 4.5 + 2);
  doc.text(lines, MARGIN_X, y);
  return y + lines.length * 4.5 + 2;
}

/**
 * Genera el PDF de forma síncrona para que el hash SHA-256 se calcule sobre
 * los bytes definitivos y pueda incluirse en el nombre del archivo.
 */
export function buildWhoisIpReportPdf(
  result: WhoisIpResult,
  isp: WhoisIspInfo | null,
): ArrayBuffer {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text('Reporte WHOIS de Dirección IP', MARGIN_X, TOP_Y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  drawGeneratedByDivisionCero(doc, MARGIN_X, 26);
  doc.text(`Fecha y hora de generación: ${formatDateWithUtcOffset(new Date())}`, MARGIN_X, 31);

  let y = 42;

  y = addSectionTitle(doc, 'Consulta', y);
  y = addRow(doc, 'Dirección IP', result.query, y);
  y = addRow(doc, 'Fecha de consulta', formatDateWithUtcOffset(new Date(result.queriedAt)), y);
  y = addRow(doc, 'Registro regional', result.registry, y);
  y = addRow(doc, 'Servidor WHOIS', result.port43, y);
  y = addRow(doc, 'Fuente RDAP', result.rdapUrl, y);

  y += 6;
  y = addSectionTitle(doc, 'Proveedor de Servicio de Internet (ISP)', y);
  if (isp) {
    y = addRow(doc, 'ISP', isp.isp, y);
    y = addRow(doc, 'Organización', isp.organization, y);
    y = addRow(doc, 'ASN', isp.asn, y);
    y = addRow(doc, 'Dominio del ISP', isp.domain, y);
    y = addRow(doc, 'Ubicación aprox.', isp.location, y);
  } else {
    y = addParagraph(
      doc,
      'No se encontró información del ISP para esta dirección IP (por ejemplo, rangos privados o reservados).',
      y,
    );
  }
  y = addRow(doc, 'Titular del bloque', getRegistrantName(result) || result.name, y);

  y += 6;
  y = addSectionTitle(doc, 'Red asignada', y);
  y = addRow(doc, 'Identificador (handle)', result.handle, y);
  y = addRow(doc, 'Nombre de la red', result.name, y);
  y = addRow(doc, 'Rango', `${result.startAddress} - ${result.endAddress}`, y);
  y = addRow(doc, 'CIDR', result.cidrs.join(', '), y);
  y = addRow(doc, 'Versión IP', result.ipVersion, y);
  y = addRow(doc, 'Tipo de asignación', result.type, y);
  y = addRow(doc, 'Estado', result.status.join(', '), y);
  y = addRow(doc, 'País', result.country, y);
  y = addRow(doc, 'ASN de origen', result.originAsns.join(', '), y);
  y = addRow(doc, 'Red padre', result.parentHandle, y);
  y = addRow(doc, 'Fecha de registro', formatRdapDate(result.registrationDate), y);
  y = addRow(doc, 'Última modificación', formatRdapDate(result.lastChangedDate), y);

  if (result.contacts.length) {
    y += 6;
    y = addSectionTitle(doc, 'Contactos', y);
    for (const contact of result.contacts) {
      y = ensureSpace(doc, y, 20);
      y = addRow(doc, 'Roles', formatRoles(contact.roles), y);
      y = addRow(doc, 'Nombre', contact.name, y);
      y = addRow(doc, 'Identificador', contact.handle, y);
      if (contact.emails.length) y = addRow(doc, 'Correo', contact.emails.join(', '), y);
      if (contact.phones.length) y = addRow(doc, 'Teléfono', contact.phones.join(', '), y);
      if (contact.address) y = addRow(doc, 'Dirección', contact.address, y);
      y += 3;
    }
  }

  if (result.remarks.length) {
    y += 3;
    y = addSectionTitle(doc, 'Observaciones del registro', y);
    for (const remark of result.remarks) {
      y = addParagraph(doc, remark, y);
    }
  }

  y += 6;
  y = ensureSpace(doc, y, 16);
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y, PAGE_WIDTH - MARGIN_X, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  const disclaimer = doc.splitTextToSize(
    'La información WHOIS proviene del protocolo RDAP (sucesor de WHOIS) del registro regional de Internet ' +
      'responsable de la dirección IP; los datos son públicos y los mantiene el titular de la red. ' +
      'Los datos del ISP provienen de un servicio público de consulta por IP (ipwho.is) y la ubicación es aproximada. ' +
      'El PDF se generó en tu navegador.',
    PAGE_WIDTH - MARGIN_X * 2,
  );
  doc.text(disclaimer, MARGIN_X, y);

  return doc.output('arraybuffer');
}
