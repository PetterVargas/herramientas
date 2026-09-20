import type { jsPDF } from 'jspdf';

const DIVISIONCERO_URL = 'https://divisioncero.com';
const LINK_COLOR: [number, number, number] = [37, 99, 235];

/**
 * Dibuja "Generado por DivisionCero" en (x, y), con "DivisionCero" como link
 * clicable a divisioncero.com. Usa la fuente/tamaño ya configurados en el
 * doc y restaura el color de texto gris estándar de los reportes al salir.
 */
export function drawGeneratedByDivisionCero(doc: jsPDF, x: number, y: number): void {
  const prefix = 'Generado por ';
  doc.setTextColor(120, 120, 120);
  doc.text(prefix, x, y);

  const linkX = x + doc.getTextWidth(prefix);
  doc.setTextColor(...LINK_COLOR);
  doc.textWithLink('DivisionCero', linkX, y, { url: DIVISIONCERO_URL });
  doc.setTextColor(120, 120, 120);
}
