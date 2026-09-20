import { jsPDF } from 'jspdf';

import { formatDateWithUtcOffset } from '@/lib/datetime';
import { drawGeneratedByDivisionCero } from '@/lib/pdf-report';

import type { FileHashes } from './hashing';

const MARGIN_X = 14;
const PAGE_WIDTH = 210;

export interface HashReportInput {
  fileName: string;
  fileSize: number;
  fileType: string;
  hashes: FileHashes;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function addHashBlock(doc: jsPDF, label: string, value: string, y: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(label, MARGIN_X, y);
  y += 5;

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  const lines: string[] = doc.splitTextToSize(value, PAGE_WIDTH - MARGIN_X * 2);
  doc.text(lines, MARGIN_X, y);

  return y + lines.length * 4.5 + 6;
}

export function buildHashReportPdf(input: HashReportInput): ArrayBuffer {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text('Reporte de Hash de Archivo', MARGIN_X, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  drawGeneratedByDivisionCero(doc, MARGIN_X, 26);
  doc.text(`Fecha y hora de generación: ${formatDateWithUtcOffset(new Date())}`, MARGIN_X, 31);

  let y = 42;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text('Archivo analizado', MARGIN_X, y);
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y + 1.5, PAGE_WIDTH - MARGIN_X, y + 1.5);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text('Nombre', MARGIN_X, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(doc.splitTextToSize(input.fileName, PAGE_WIDTH - MARGIN_X * 2 - 30), MARGIN_X + 30, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Tamaño', MARGIN_X, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(formatBytes(input.fileSize), MARGIN_X + 30, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Tipo MIME', MARGIN_X, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(input.fileType || 'Desconocido', MARGIN_X + 30, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text('Hashes calculados', MARGIN_X, y);
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y + 1.5, PAGE_WIDTH - MARGIN_X, y + 1.5);
  y += 9;

  y = addHashBlock(doc, 'MD5', input.hashes.MD5, y);
  y = addHashBlock(doc, 'SHA-1', input.hashes.SHA1, y);
  y = addHashBlock(doc, 'SHA-256', input.hashes.SHA256, y);
  y = addHashBlock(doc, 'SHA-512', input.hashes.SHA512, y);

  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN_X, y, PAGE_WIDTH - MARGIN_X, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  const disclaimer = doc.splitTextToSize(
    'Este reporte se generó completamente en tu navegador: el archivo analizado nunca se envió a ningún servidor.',
    PAGE_WIDTH - MARGIN_X * 2,
  );
  doc.text(disclaimer, MARGIN_X, y);

  return doc.output('arraybuffer');
}
