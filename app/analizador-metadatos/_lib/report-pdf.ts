import { jsPDF } from 'jspdf';

import type { AnalysisResult } from './analyze';

const MARGIN_X = 14;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const BOTTOM_MARGIN = 20;
const LABEL_WIDTH = 55;
const VALUE_WIDTH = PAGE_WIDTH - MARGIN_X * 2 - LABEL_WIDTH;

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - BOTTOM_MARGIN) {
    doc.addPage();
    return 20;
  }
  return y;
}

function addSectionTitle(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 14);
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
  const lines: string[] = doc.splitTextToSize(value || 'No disponible', VALUE_WIDTH);
  y = ensureSpace(doc, y, lines.length * 5 + 2);

  doc.text(label, MARGIN_X, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(lines, MARGIN_X + LABEL_WIDTH, y);

  return y + lines.length * 5 + 2;
}

export function buildMetadataReportPdf(result: AnalysisResult): ArrayBuffer {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text('Reporte de Análisis de Metadatos', MARGIN_X, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Generado por Herramientas · DivisionCero', MARGIN_X, 26);
  doc.text(`Fecha de generación: ${new Date().toLocaleString('es-CO')}`, MARGIN_X, 31);
  doc.text(`Archivo analizado: ${result.fileName}`, MARGIN_X, 36);

  let y = 47;

  for (const section of result.sections) {
    y = addSectionTitle(doc, section.title, y);
    for (const row of section.rows) {
      y = addRow(doc, row.sensitive ? `${row.label} (!)` : row.label, row.value, y);
    }
    y += 4;
  }

  if (result.hasSensitiveData) {
    y = ensureSpace(doc, y, 16);
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(180, 60, 30);
    const warning = doc.splitTextToSize(
      '(!) Este archivo contiene metadatos potencialmente sensibles (ubicación, nombres de personas u organización). Considera eliminarlos antes de compartirlo públicamente.',
      PAGE_WIDTH - MARGIN_X * 2,
    );
    doc.text(warning, MARGIN_X, y);
    y += warning.length * 5;
  }

  y = ensureSpace(doc, y, 16);
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y, PAGE_WIDTH - MARGIN_X, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  const disclaimer = doc.splitTextToSize(
    'Este reporte se generó completamente en tu navegador: el archivo analizado nunca se envió a ningún servidor. ' +
      'herramientas.divisioncero.com',
    PAGE_WIDTH - MARGIN_X * 2,
  );
  doc.text(disclaimer, MARGIN_X, y);

  return doc.output('arraybuffer');
}
