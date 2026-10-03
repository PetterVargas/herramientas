export interface TimeZoneOption {
  value: string;
  label: string;
}

export interface TimeZoneGroup {
  label: string;
  zones: TimeZoneOption[];
}

// Etc/GMT invierte el signo: Etc/GMT+5 equivale a UTC-5.
const fixedOffsets: TimeZoneOption[] = Array.from({ length: 27 }, (_, i) => {
  const offset = i - 12;
  if (offset === 0) return { value: 'UTC', label: 'UTC' };
  const sign = offset > 0 ? '+' : '-';
  const etcSign = offset > 0 ? '-' : '+';
  return {
    value: `Etc/GMT${etcSign}${Math.abs(offset)}`,
    label: `UTC${sign}${Math.abs(offset)}`,
  };
});

export const timeZoneGroups: TimeZoneGroup[] = [
  {
    label: 'Desplazamiento fijo',
    zones: fixedOffsets,
  },
  {
    label: 'América',
    zones: [
      { value: 'America/Bogota', label: 'Bogotá' },
      { value: 'America/Lima', label: 'Lima' },
      { value: 'America/Guayaquil', label: 'Quito / Guayaquil' },
      { value: 'America/Panama', label: 'Panamá' },
      { value: 'America/Mexico_City', label: 'Ciudad de México' },
      { value: 'America/Guatemala', label: 'Guatemala' },
      { value: 'America/Costa_Rica', label: 'San José (Costa Rica)' },
      { value: 'America/Caracas', label: 'Caracas' },
      { value: 'America/La_Paz', label: 'La Paz' },
      { value: 'America/Santo_Domingo', label: 'Santo Domingo' },
      { value: 'America/Santiago', label: 'Santiago de Chile' },
      { value: 'America/Asuncion', label: 'Asunción' },
      { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires' },
      { value: 'America/Montevideo', label: 'Montevideo' },
      { value: 'America/Sao_Paulo', label: 'São Paulo' },
      { value: 'America/New_York', label: 'Nueva York' },
      { value: 'America/Chicago', label: 'Chicago' },
      { value: 'America/Denver', label: 'Denver' },
      { value: 'America/Los_Angeles', label: 'Los Ángeles' },
      { value: 'America/Toronto', label: 'Toronto' },
    ],
  },
  {
    label: 'Europa y África',
    zones: [
      { value: 'Europe/London', label: 'Londres' },
      { value: 'Europe/Lisbon', label: 'Lisboa' },
      { value: 'Europe/Madrid', label: 'Madrid' },
      { value: 'Europe/Paris', label: 'París' },
      { value: 'Europe/Berlin', label: 'Berlín' },
      { value: 'Europe/Rome', label: 'Roma' },
      { value: 'Europe/Moscow', label: 'Moscú' },
      { value: 'Africa/Casablanca', label: 'Casablanca' },
      { value: 'Africa/Lagos', label: 'Lagos' },
      { value: 'Africa/Johannesburg', label: 'Johannesburgo' },
    ],
  },
  {
    label: 'Asia y Oceanía',
    zones: [
      { value: 'Asia/Dubai', label: 'Dubái' },
      { value: 'Asia/Kolkata', label: 'India (Kolkata)' },
      { value: 'Asia/Shanghai', label: 'Shanghái' },
      { value: 'Asia/Singapore', label: 'Singapur' },
      { value: 'Asia/Tokyo', label: 'Tokio' },
      { value: 'Asia/Seoul', label: 'Seúl' },
      { value: 'Australia/Sydney', label: 'Sídney' },
      { value: 'Pacific/Auckland', label: 'Auckland' },
    ],
  },
];

const zoneLabels = new Map(
  timeZoneGroups.flatMap((group) => group.zones.map((z) => [z.value, z.label] as const)),
);

export function getZoneLabel(timeZone: string): string {
  return zoneLabels.get(timeZone) ?? timeZone;
}

export function isFixedOffsetZone(timeZone: string): boolean {
  return timeZone === 'UTC' || timeZone.startsWith('Etc/');
}

interface WallTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

const partsFormatters = new Map<string, Intl.DateTimeFormat>();

function getWallTime(instant: number, timeZone: string): WallTime {
  let formatter = partsFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    partsFormatters.set(timeZone, formatter);
  }
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date(instant)).map((p) => [p.type, p.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

function wallTimeToUtc(w: WallTime): number {
  return Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute);
}

/** Desplazamiento de la zona respecto a UTC, en minutos, en un instante dado. */
export function getOffsetMinutes(instant: number, timeZone: string): number {
  const truncated = Math.floor(instant / 60000) * 60000;
  return (wallTimeToUtc(getWallTime(truncated, timeZone)) - truncated) / 60000;
}

export function formatOffset(offsetMinutes: number): string {
  if (offsetMinutes === 0) return 'UTC';
  const sign = offsetMinutes > 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return `UTC${sign}${hours}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}`;
}

export interface ZonedInstant {
  instant: number;
  /** false si la hora indicada no existe en la zona (salto por horario de verano). */
  exists: boolean;
}

/** Convierte una fecha y hora "de reloj" en una zona horaria al instante UTC correspondiente. */
export function zonedTimeToInstant(
  date: string,
  time: string,
  timeZone: string,
): ZonedInstant | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})/.exec(time);
  if (!dateMatch || !timeMatch) return null;

  const wall: WallTime = {
    year: Number(dateMatch[1]),
    month: Number(dateMatch[2]),
    day: Number(dateMatch[3]),
    hour: Number(timeMatch[1]),
    minute: Number(timeMatch[2]),
  };
  const guess = wallTimeToUtc(wall);
  if (Number.isNaN(guess)) return null;

  const firstOffset = getOffsetMinutes(guess, timeZone);
  let instant = guess - firstOffset * 60000;
  const secondOffset = getOffsetMinutes(instant, timeZone);
  if (secondOffset !== firstOffset) {
    instant = guess - secondOffset * 60000;
  }

  const check = getWallTime(instant, timeZone);
  return { instant, exists: wallTimeToUtc(check) === guess };
}

export interface ConvertedTime {
  timeZone: string;
  offsetMinutes: number;
  dateLabel: string;
  timeLabel: string;
  iso: string;
  /** Diferencia de días de calendario respecto a la fecha de origen. */
  dayDiff: number;
}

export function convertInstant(
  instant: number,
  timeZone: string,
  sourceDate: string,
): ConvertedTime {
  const offsetMinutes = getOffsetMinutes(instant, timeZone);
  const wall = getWallTime(instant, timeZone);
  const date = new Date(instant);

  const dateLabel = new Intl.DateTimeFormat('es-CO', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat('es-CO', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);

  const pad = (n: number) => String(n).padStart(2, '0');
  const absOffset = Math.abs(offsetMinutes);
  const isoOffset =
    offsetMinutes === 0
      ? 'Z'
      : `${offsetMinutes > 0 ? '+' : '-'}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;
  const iso = `${wall.year}-${pad(wall.month)}-${pad(wall.day)}T${pad(wall.hour)}:${pad(wall.minute)}${isoOffset}`;

  const [sy, sm, sd] = sourceDate.split('-').map(Number);
  const dayDiff = Math.round(
    (Date.UTC(wall.year, wall.month - 1, wall.day) - Date.UTC(sy, sm - 1, sd)) / 86400000,
  );

  return { timeZone, offsetMinutes, dateLabel, timeLabel, iso, dayDiff };
}

/** Fecha (YYYY-MM-DD) y hora (HH:mm) actuales en la zona indicada. */
export function nowInZone(timeZone: string): { date: string; time: string } {
  const w = getWallTime(Date.now(), timeZone);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    date: `${w.year}-${pad(w.month)}-${pad(w.day)}`,
    time: `${pad(w.hour)}:${pad(w.minute)}`,
  };
}
