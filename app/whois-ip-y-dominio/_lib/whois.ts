export interface WhoisContact {
  handle: string;
  roles: string[];
  name: string;
  kind: string;
  emails: string[];
  phones: string[];
  address: string;
}

export interface WhoisIpResult {
  query: string;
  queriedAt: string;
  registry: string;
  rdapUrl: string;
  port43: string;
  handle: string;
  name: string;
  type: string;
  ipVersion: string;
  startAddress: string;
  endAddress: string;
  cidrs: string[];
  parentHandle: string;
  country: string;
  status: string[];
  originAsns: string[];
  registrationDate: string;
  lastChangedDate: string;
  remarks: string[];
  contacts: WhoisContact[];
  raw: string;
}

export type WhoisIpResponse =
  | { success: true; data: WhoisIpResult }
  | { success: false; error: string };

export interface WhoisDomainResult {
  /** Lo que escribió el usuario, ya normalizado (sin protocolo ni ruta). */
  query: string;
  /** Dominio que respondió el registro; puede ser el padre si se consultó un subdominio. */
  domain: string;
  queriedAt: string;
  registry: string;
  rdapUrl: string;
  port43: string;
  handle: string;
  status: string[];
  registrar: string;
  registrarIanaId: string;
  registrationDate: string;
  expirationDate: string;
  lastChangedDate: string;
  nameservers: string[];
  /** null cuando el registro no informa si el dominio está firmado. */
  dnssec: boolean | null;
  remarks: string[];
  contacts: WhoisContact[];
  raw: string;
}

export type WhoisDomainResponse =
  | { success: true; data: WhoisDomainResult }
  | { success: false; error: string };

const DOMAIN_LABEL = /^(?!-)[a-z0-9-]{1,63}(?<!-)$/;
const TOP_LEVEL_DOMAIN = /^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/;

/**
 * Acepta un dominio, un subdominio o una URL completa y devuelve el nombre de
 * host en minúsculas (los dominios con tildes o ñ se convierten a punycode).
 * Devuelve null si no es un nombre de dominio válido.
 */
export function normalizeDomain(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;

  let host: string;
  try {
    const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//.test(trimmed);
    host = new URL(hasScheme ? trimmed : `http://${trimmed}`).hostname;
  } catch {
    return null;
  }

  host = host.replace(/\.$/, '');
  if (!host || host.length > 253) return null;

  const labels = host.split('.');
  if (labels.length < 2) return null;
  if (!labels.every((label) => DOMAIN_LABEL.test(label))) return null;
  if (!TOP_LEVEL_DOMAIN.test(labels[labels.length - 1])) return null;
  return host;
}

export const DOMAIN_STATUS_LABELS: Record<string, string> = {
  active: 'Activo',
  ok: 'Activo',
  inactive: 'Inactivo',
  'client transfer prohibited': 'Transferencia bloqueada (registrador)',
  'client update prohibited': 'Modificación bloqueada (registrador)',
  'client delete prohibited': 'Eliminación bloqueada (registrador)',
  'client renew prohibited': 'Renovación bloqueada (registrador)',
  'client hold': 'Suspendido (registrador)',
  'server transfer prohibited': 'Transferencia bloqueada (registro)',
  'server update prohibited': 'Modificación bloqueada (registro)',
  'server delete prohibited': 'Eliminación bloqueada (registro)',
  'server renew prohibited': 'Renovación bloqueada (registro)',
  'server hold': 'Suspendido (registro)',
  'pending delete': 'Pendiente de eliminación',
  'pending transfer': 'Transferencia en curso',
  'redemption period': 'Periodo de redención',
  'auto renew period': 'Periodo de renovación automática',
};

export function formatDomainStatus(status: string[]): string {
  return status.map((value) => DOMAIN_STATUS_LABELS[value] ?? value).join(', ');
}

export function formatDnssec(dnssec: boolean | null): string {
  if (dnssec === null) return 'No disponible';
  return dnssec ? 'Firmado' : 'No firmado';
}

/** Proveedor de Internet que opera la IP; puede diferir del titular del bloque en el WHOIS. */
export interface WhoisIspInfo {
  isp: string;
  organization: string;
  asn: string;
  domain: string;
  location: string;
}

interface IpWhoIsResponse {
  success?: boolean;
  message?: string;
  country?: string;
  region?: string;
  city?: string;
  connection?: { asn?: number; org?: string; isp?: string; domain?: string };
}

/**
 * ipwho.is habilita CORS y se consulta desde el navegador (como en /cual-es-mi-ip),
 * así su límite de consultas se reparte por usuario y no recae en el servidor.
 * Devuelve null si el servicio no tiene datos (p. ej. rangos privados o reservados).
 */
export async function fetchIspInfo(ip: string): Promise<WhoisIspInfo | null> {
  try {
    const response = await fetch(
      `https://ipwho.is/${ip}?fields=success,message,country,region,city,connection`,
    );
    if (!response.ok) return null;

    const data: IpWhoIsResponse = await response.json();
    if (data.success === false || !data.connection) return null;

    return {
      isp: data.connection.isp ?? '',
      organization: data.connection.org ?? '',
      asn: data.connection.asn ? `AS${data.connection.asn}` : '',
      domain: data.connection.domain ?? '',
      location: [data.city, data.region, data.country].filter(Boolean).join(', '),
    };
  } catch {
    return null;
  }
}

/** Titular del bloque según el WHOIS: el contacto con rol "registrant". */
export function getRegistrantName(result: WhoisIpResult): string {
  return result.contacts.find((contact) => contact.roles.includes('registrant'))?.name ?? '';
}

export const ROLE_LABELS: Record<string, string> = {
  registrant: 'Titular',
  administrative: 'Administrativo',
  technical: 'Técnico',
  abuse: 'Abuso',
  noc: 'NOC',
  routing: 'Enrutamiento',
  billing: 'Facturación',
  registrar: 'Registrador',
};

export function formatRoles(roles: string[]): string {
  return roles.map((role) => ROLE_LABELS[role] ?? role).join(', ');
}

/** Las fechas RDAP vienen en UTC (o con offset); se muestran siempre en UTC. */
export function formatRdapDate(value: string): string {
  if (!value) return 'No disponible';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const formatted = new Intl.DateTimeFormat('es-CO', {
    timeZone: 'UTC',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
  return `${formatted} (UTC)`;
}

function ipv4ToNumber(ip: string): number {
  return ip.split('.').reduce((acc, octet) => acc * 256 + Number(octet), 0);
}

const PRIVATE_IPV4_RANGES: [string, number][] = [
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.168.0.0', 16],
  ['224.0.0.0', 3],
];

/** Rangos privados o reservados: su WHOIS solo muestra el bloque reservado por IANA. */
export function isPrivateOrReservedIp(ip: string): boolean {
  if (ip.includes(':')) {
    const lower = ip.toLowerCase();
    return (
      lower === '::' ||
      lower === '::1' ||
      /^f[cd][0-9a-f]{0,2}:/.test(lower) ||
      /^fe[89ab][0-9a-f]?:/.test(lower)
    );
  }
  const value = ipv4ToNumber(ip);
  return PRIVATE_IPV4_RANGES.some(([base, bits]) => {
    const size = 2 ** (32 - bits);
    const start = ipv4ToNumber(base);
    return value >= start && value < start + size;
  });
}
