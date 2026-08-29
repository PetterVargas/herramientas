export interface IpGeoInfo {
  ip: string;
  type: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  postal: string;
  latitude: number;
  longitude: number;
  isp: string;
  org: string;
  asn: number | string;
  timezoneId: string;
  timezoneUtc: string;
}

export interface BrowserInfo {
  visitedAt: Date;
  userAgent: string;
  language: string;
  languages: string;
  platform: string;
  screenResolution: string;
  colorDepth: number;
  browserTimezone: string;
  cookiesEnabled: boolean;
  doNotTrack: string;
  onLine: boolean;
  referrer: string;
  pageUrl: string;
}

interface IpWhoIsResponse {
  success?: boolean;
  message?: string;
  ip: string;
  type: string;
  city: string;
  region: string;
  country: string;
  country_code: string;
  postal: string;
  latitude: number;
  longitude: number;
  connection?: { asn: number; org: string; isp: string };
  timezone?: { id: string; utc: string };
}

/**
 * ipwho.is no requiere API key y habilita CORS para consultas desde el
 * navegador, por eso la consulta se hace directo desde el cliente sin pasar
 * por un endpoint propio.
 */
export async function fetchIpGeoInfo(): Promise<IpGeoInfo> {
  const response = await fetch('https://ipwho.is/');

  if (!response.ok) {
    throw new Error('No se pudo consultar el servicio de geolocalización de IP');
  }

  const data: IpWhoIsResponse = await response.json();

  if (data.success === false) {
    throw new Error(data.message || 'No se pudo obtener la información de tu IP');
  }

  return {
    ip: data.ip,
    type: data.type,
    city: data.city || 'Desconocida',
    region: data.region || 'Desconocida',
    country: data.country || 'Desconocido',
    countryCode: data.country_code || '',
    postal: data.postal || 'No disponible',
    latitude: data.latitude,
    longitude: data.longitude,
    isp: data.connection?.isp || 'Desconocido',
    org: data.connection?.org || 'Desconocida',
    asn: data.connection?.asn ?? 'Desconocido',
    timezoneId: data.timezone?.id || 'Desconocida',
    timezoneUtc: data.timezone?.utc || '',
  };
}

export function collectBrowserInfo(): BrowserInfo {
  const nav = navigator;
  const dnt = nav.doNotTrack;

  return {
    visitedAt: new Date(),
    userAgent: nav.userAgent,
    language: nav.language,
    languages: nav.languages?.length ? nav.languages.join(', ') : nav.language,
    platform: nav.platform || 'No disponible',
    screenResolution: `${window.screen.width} x ${window.screen.height} px`,
    colorDepth: window.screen.colorDepth,
    browserTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookiesEnabled: nav.cookieEnabled,
    doNotTrack: dnt === '1' ? 'Activado' : dnt === '0' ? 'Desactivado' : 'No especificado',
    onLine: nav.onLine,
    referrer: document.referrer || 'Acceso directo (sin referencia)',
    pageUrl: window.location.href,
  };
}
