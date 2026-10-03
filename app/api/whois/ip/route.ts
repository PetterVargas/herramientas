import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

import type { WhoisContact, WhoisIpResponse, WhoisIpResult } from '@/app/whois-ip/_lib/whois';

const IpSchema = z.object({
  ip: z.union([z.ipv4(), z.ipv6()], { error: 'Dirección IP inválida' }),
});

// Ver https://about.rdap.org: redirige al servidor RDAP del registro regional responsable.
const RDAP_BOOTSTRAP_URL = 'https://rdap.org/ip/';

const REGISTRIES: Record<string, string> = {
  'rdap.lacnic.net': 'LACNIC',
  'rdap.arin.net': 'ARIN',
  'rdap.db.ripe.net': 'RIPE NCC',
  'rdap.apnic.net': 'APNIC',
  'rdap.afrinic.net': 'AFRINIC',
};

type VCardProperty = [string, Record<string, unknown>, string, unknown];

interface RdapEntity {
  handle?: string;
  roles?: string[];
  vcardArray?: [string, VCardProperty[]];
  entities?: RdapEntity[];
}

interface RdapEvent {
  eventAction: string;
  eventDate: string;
}

interface RdapRemark {
  title?: string;
  description?: string[];
}

interface RdapIpNetwork {
  handle?: string;
  name?: string;
  type?: string;
  ipVersion?: string;
  startAddress?: string;
  endAddress?: string;
  parentHandle?: string;
  country?: string;
  status?: string[];
  port43?: string;
  events?: RdapEvent[];
  remarks?: RdapRemark[];
  entities?: RdapEntity[];
  cidr0_cidrs?: { v4prefix?: string; v6prefix?: string; length: number }[];
  arin_originas0_originautnums?: number[];
  lacnic_originAutnum?: string[];
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
function flattenContacts(entities: RdapEntity[] = []): WhoisContact[] {
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

function normalize(query: string, finalUrl: string, data: RdapIpNetwork): WhoisIpResult {
  const host = (() => {
    try {
      return new URL(finalUrl).hostname;
    } catch {
      return '';
    }
  })();

  const eventDate = (action: string) =>
    data.events?.find((event) => event.eventAction === action)?.eventDate ?? '';

  const originAsns = [
    ...(data.arin_originas0_originautnums ?? []).map((asn) => `AS${asn}`),
    ...(data.lacnic_originAutnum ?? []).map((asn) =>
      /^as/i.test(asn) ? asn.toUpperCase() : `AS${asn}`,
    ),
  ];

  return {
    query,
    queriedAt: new Date().toISOString(),
    registry: REGISTRIES[host] ?? host,
    rdapUrl: finalUrl,
    port43: data.port43 ?? '',
    handle: data.handle ?? '',
    name: data.name ?? '',
    type: data.type ?? '',
    ipVersion: data.ipVersion ?? '',
    startAddress: data.startAddress ?? '',
    endAddress: data.endAddress ?? '',
    cidrs: (data.cidr0_cidrs ?? []).map(
      (cidr) => `${cidr.v4prefix ?? cidr.v6prefix}/${cidr.length}`,
    ),
    parentHandle: data.parentHandle ?? '',
    country: data.country ?? '',
    status: data.status ?? [],
    originAsns,
    registrationDate: eventDate('registration'),
    lastChangedDate: eventDate('last changed'),
    remarks: (data.remarks ?? [])
      .map((remark) => (remark.description ?? []).join(' ').trim())
      .filter(Boolean),
    contacts: flattenContacts(data.entities),
    raw: JSON.stringify(data, null, 2),
  };
}

function errorResponse(error: string, status: number) {
  return NextResponse.json<WhoisIpResponse>({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse('Solicitud inválida', 400);
  }

  const validation = IpSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(validation.error.issues[0]?.message || 'Dirección IP inválida', 400);
  }

  const { ip } = validation.data;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    // Sin encodeURIComponent: rdap.org responde 400 si los ":" de IPv6 van codificados.
    // La IP ya está validada por zod, así que no puede alterar la URL.
    const response = await fetch(`${RDAP_BOOTSTRAP_URL}${ip}`, {
      // rdap.org rechaza (403) las peticiones sin User-Agent.
      headers: {
        Accept: 'application/rdap+json, application/json',
        'User-Agent': 'DivisionCero-Herramientas/1.0 (+https://herramientas.divisioncero.com)',
      },
      redirect: 'follow',
      signal: controller.signal,
    });

    if (response.status === 404) {
      return errorResponse('No se encontró información WHOIS para esta dirección IP', 404);
    }
    if (response.status === 429) {
      return errorResponse(
        'El registro regional limitó las consultas. Intenta de nuevo en unos minutos',
        429,
      );
    }
    if (!response.ok) {
      return errorResponse('El servicio WHOIS/RDAP no respondió correctamente', 502);
    }

    const data: RdapIpNetwork = await response.json();
    if (data.errorCode) {
      return errorResponse(
        data.description?.join(' ') || data.title || 'Error al consultar el WHOIS',
        502,
      );
    }

    return NextResponse.json<WhoisIpResponse>({
      success: true,
      data: normalize(ip, response.url, data),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return errorResponse('La consulta WHOIS tardó demasiado. Intenta de nuevo', 504);
    }
    return errorResponse('No se pudo consultar el WHOIS de la dirección IP', 502);
  } finally {
    clearTimeout(timeoutId);
  }
}
