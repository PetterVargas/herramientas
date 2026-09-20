/** Ej: getTimezoneOffset() de 300 (UTC-5) se convierte en la etiqueta "UTC-5". */
export function getUtcOffsetLabel(date: Date): string {
  const totalMinutes = -date.getTimezoneOffset();
  const sign = totalMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return minutes === 0 ? `UTC${sign}${hours}` : `UTC${sign}${hours}:${String(minutes).padStart(2, '0')}`;
}

/** Fecha/hora local con el offset UTC aclarado entre paréntesis, ej: "15 sept 2026, 8:03:27 a. m. (UTC-5)". */
export function formatDateWithUtcOffset(date: Date): string {
  const local = date.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'medium' });
  return `${local} (${getUtcOffsetLabel(date)})`;
}
