import type { WhoisContact } from '@/app/whois-ip-y-dominio/_lib/whois';

// rdap.org rechaza (403) las peticiones sin User-Agent.
export const RDAP_REQUEST_HEADERS = {
  Accept: 'application/rdap+json, application/json',
  'User-Agent': 'DivisionCero-Herramientas/1.0 (+https://herramientas.divisioncero.com)',
};

export const RDAP_TIMEOUT_MS = 15000;

type VCardProperty = [string, Record<string, unknown>, string, unknown];

export interface RdapEntity {
  handle?: string;
  roles?: string[];
  vcardArray?: [string, VCardProperty[]];
  publicIds?: { type: string; identifier: string }[];
  entities?: RdapEntity[];
}

export interface RdapEvent {
  eventAction: string;
  eventDate: string;
}

export interface RdapRemark {
  title?: string;
  description?: string[];
}

/** Campos comunes a cualquier respuesta RDAP, incluida la de error. */
export interface RdapObject {
  handle?: string;
  status?: string[];
  port43?: string;
  events?: RdapEvent[];
  remarks?: RdapRemark[];
  entities?: RdapEntity[];
  errorCode?: number;
  title?: string;
  description?: string[];
}

function vcardValues(entity: RdapEntity, property: string): string[] {
  const props = entity.vcardArray?.[1] ?? [];
  return props
    .filter(([name]) => name === property)
    .map(([, params, , value]) => {
      if (property === 'adr') {
        const label = params?.label;
        if (typeof label === 'string') return label.replace(/\n+/g, ', ');
        if (Array.isArray(value)) {
          return value.flat().filter(Boolean).join(', ');
        }
      }
      return typeof value === 'string' ? value.replace(/^tel:/, '') : '';
    })
    .filter(Boolean);
}

/** Las entidades RDAP pueden venir anidadas (p. ej. el contacto de abuso dentro del titular). */
export function flattenContacts(entities: RdapEntity[] = []): WhoisContact[] {
  const byHandle = new Map<string, WhoisContact>();

  const visit = (list: RdapEntity[]) => {
    for (const entity of list) {
      const handle = entity.handle ?? '';
      const existing = handle ? byHandle.get(handle) : undefined;
      const roles = entity.roles ?? [];

      if (existing) {
        existing.roles = [...new Set([...existing.roles, ...roles])];
      } else {
        const contact: WhoisContact = {
          handle,
          roles,
          name: vcardValues(entity, 'fn')[0] ?? '',
          kind: vcardValues(entity, 'kind')[0] ?? '',
          emails: [...new Set(vcardValues(entity, 'email'))],
          phones: vcardValues(entity, 'tel'),
          address: vcardValues(entity, 'adr')[0] ?? '',
        };
        byHandle.set(handle || `sin-handle-${byHandle.size}`, contact);
      }

      if (entity.entities?.length) visit(entity.entities);
    }
  };

  visit(entities);
  return [...byHandle.values()];
}

export function findEntity(entities: RdapEntity[] = [], role: string): RdapEntity | undefined {
  for (const entity of entities) {
    if (entity.roles?.includes(role)) return entity;
    const nested = findEntity(entity.entities, role);
    if (nested) return nested;
  }
  return undefined;
}

export function eventDate(data: RdapObject, action: string): string {
  return data.events?.find((event) => event.eventAction === action)?.eventDate ?? '';
}

export function remarkTexts(data: RdapObject): string[] {
  return (data.remarks ?? [])
    .map((remark) => (remark.description ?? []).join(' ').trim())
    .filter(Boolean);
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}
