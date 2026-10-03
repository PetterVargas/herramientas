import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

import {
  normalizeDomain,
  type WhoisDomainResponse,
  type WhoisDomainResult,
} from '@/app/whois-ip-y-dominio/_lib/whois';

import {
  RDAP_REQUEST_HEADERS,
  RDAP_TIMEOUT_MS,
  eventDate,
  findEntity,
  flattenContacts,
  hostOf,
  remarkTexts,
  type RdapObject,
} from '../_lib/rdap';

const DomainSchema = z.object({
  domain: z.string().max(2048),
});

// Ver https://about.rdap.org: redirige al servidor RDAP del registro de cada extensión.
const RDAP_BOOTSTRAP_URL = 'https://rdap.org/domain/';

/**
 * Extensiones con servidor RDAP que no figuran en el directorio de IANA
 * (por eso rdap.org responde 404). Se consultan directamente.
 */
const RDAP_SERVER_OVERRIDES: Record<string, string> = {
  co: 'https://rdap.registry.co/co/domain/',
};

// Se prueban como mucho las cuatro últimas etiquetas: www.ejemplo.gov.co -> ejemplo.gov.co.
const MAX_LOOKUP_LABELS = 4;

interface RdapDomain extends RdapObject {
  ldhName?: string;
  nameservers?: { ldhName?: string }[];
  secureDNS?: { delegationSigned?: boolean };
}

function rdapUrlFor(domain: string): string {
  const tld = domain.slice(domain.lastIndexOf('.') + 1);
  return `${RDAP_SERVER_OVERRIDES[tld] ?? RDAP_BOOTSTRAP_URL}${domain}`;
}

/**
 * Sin una lista de sufijos públicos no se sabe dónde empieza el dominio
 * registrable, así que se prueba del nombre más largo al más corto: el
 * registro responde 404 a los subdominios (www.google.com) y así no se
 * confunde mintic.gov.co con gov.co, que también está registrado.
 */
function lookupCandidates(domain: string): string[] {
  const labels = domain.split('.');
  const candidates: string[] = [];
  for (let size = Math.min(labels.length, MAX_LOOKUP_LABELS); size >= 2; size--) {
    candidates.push(labels.slice(-size).join('.'));
  }
  return candidates;
}

function normalize(query: string, finalUrl: string, data: RdapDomain): WhoisDomainResult {
  const registrar = findEntity(data.entities, 'registrar');
  const contacts = flattenContacts(data.entities);

  return {
    query,
    domain: (data.ldhName ?? '').toLowerCase(),
    queriedAt: new Date().toISOString(),
    registry: hostOf(finalUrl),
    rdapUrl: finalUrl,
    port43: data.port43 ?? '',
    handle: data.handle ?? '',
    status: data.status ?? [],
    registrar:
      contacts.find((contact) => contact.roles.includes('registrar'))?.name ||
      registrar?.handle ||
      '',
    registrarIanaId:
      registrar?.publicIds?.find((id) => id.type === 'IANA Registrar ID')?.identifier ?? '',
    registrationDate: eventDate(data, 'registration'),
    expirationDate: eventDate(data, 'expiration'),
    lastChangedDate: eventDate(data, 'last changed'),
    nameservers: (data.nameservers ?? [])
      .map((nameserver) => (nameserver.ldhName ?? '').toLowerCase())
      .filter(Boolean),
    dnssec:
      typeof data.secureDNS?.delegationSigned === 'boolean'
        ? data.secureDNS.delegationSigned
        : null,
    remarks: remarkTexts(data),
    contacts,
    raw: JSON.stringify(data, null, 2),
  };
}

function errorResponse(error: string, status: number) {
  return NextResponse.json<WhoisDomainResponse>({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse('Solicitud inválida', 400);
  }

  const validation = DomainSchema.safeParse(body);
  const domain = validation.success ? normalizeDomain(validation.data.domain) : null;
  if (!domain) {
    return errorResponse('Dominio inválido', 400);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), RDAP_TIMEOUT_MS);

  try {
    for (const candidate of lookupCandidates(domain)) {
      // El dominio ya está validado (solo letras, números, guiones y puntos), así que no puede alterar la URL.
      const response = await fetch(rdapUrlFor(candidate), {
        headers: RDAP_REQUEST_HEADERS,
        redirect: 'follow',
        signal: controller.signal,
      });

      if (response.status === 404) continue;
      if (response.status === 429) {
        return errorResponse(
          'El registro del dominio limitó las consultas. Intenta de nuevo en unos minutos',
          429,
        );
      }
      if (!response.ok) {
        return errorResponse('El servicio WHOIS/RDAP no respondió correctamente', 502);
      }

      const data: RdapDomain = await response.json();
      if (data.errorCode) {
        if (data.errorCode === 404) continue;
        return errorResponse(
          data.description?.join(' ') || data.title || 'Error al consultar el WHOIS',
          502,
        );
      }

      return NextResponse.json<WhoisDomainResponse>({
        success: true,
        data: normalize(domain, response.url, data),
      });
    }

    const tld = domain.slice(domain.lastIndexOf('.'));
    return errorResponse(
      `No se encontró información WHOIS para ${domain}. Puede que no esté registrado o que el registro de la extensión ${tld} no publique sus datos por RDAP`,
      404,
    );
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return errorResponse('La consulta WHOIS tardó demasiado. Intenta de nuevo', 504);
    }
    return errorResponse('No se pudo consultar el WHOIS del dominio', 502);
  } finally {
    clearTimeout(timeoutId);
  }
}
