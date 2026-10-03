import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

import type { WhoisIpResponse, WhoisIpResult } from '@/app/whois-ip-y-dominio/_lib/whois';

import {
  RDAP_REQUEST_HEADERS,
  RDAP_TIMEOUT_MS,
  eventDate,
  flattenContacts,
  hostOf,
  remarkTexts,
  type RdapObject,
} from '../_lib/rdap';

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

interface RdapIpNetwork extends RdapObject {
  name?: string;
  type?: string;
  ipVersion?: string;
  startAddress?: string;
  endAddress?: string;
  parentHandle?: string;
  country?: string;
  cidr0_cidrs?: { v4prefix?: string; v6prefix?: string; length: number }[];
  arin_originas0_originautnums?: number[];
  lacnic_originAutnum?: string[];
}

function normalize(query: string, finalUrl: string, data: RdapIpNetwork): WhoisIpResult {
  const host = hostOf(finalUrl);

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
    registrationDate: eventDate(data, 'registration'),
    lastChangedDate: eventDate(data, 'last changed'),
    remarks: remarkTexts(data),
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
  const timeoutId = setTimeout(() => controller.abort(), RDAP_TIMEOUT_MS);

  try {
    // Sin encodeURIComponent: rdap.org responde 400 si los ":" de IPv6 van codificados.
    // La IP ya está validada por zod, así que no puede alterar la URL.
    const response = await fetch(`${RDAP_BOOTSTRAP_URL}${ip}`, {
      headers: RDAP_REQUEST_HEADERS,
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
