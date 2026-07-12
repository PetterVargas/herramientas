import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const DomainSchema = z.object({
  domain: z
    .string()
    .min(1, 'Domain required')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*$/,
      'Invalid domain format',
    ),
});

interface DNSResponse {
  Status: number;
  Answer?: Array<{
    name: string;
    type: number;
    data: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = DomainSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error.errors[0]?.message || 'Invalid domain',
        },
        { status: 400 },
      );
    }

    const { domain } = validationResult.data;

    // Use multiple DNS providers for reliability
    const dnsProviders = [
      {
        name: 'cloudflare',
        url: `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=TXT`,
        headers: { Accept: 'application/dns-json' },
      },
      {
        name: 'google',
        url: `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=TXT`,
        headers: { Accept: 'application/json' },
      },
    ];

    let spfRecord = '';
    let dnsError = '';

    // Try each DNS provider
    for (const provider of dnsProviders) {
      // Create AbortController for timeout
      const controller = new AbortController();
      let timeoutId: NodeJS.Timeout | undefined;

      try {
        timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(provider.url, {
          headers: provider.headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          continue; // Try next provider
        }

        const dnsData: DNSResponse = await response.json();

        if (dnsData.Status === 0 && dnsData.Answer) {
          // Find SPF record in TXT records
          for (const record of dnsData.Answer) {
            if (record.type === 16 && record.data) {
              // Clean the record data (remove quotes and escape characters)
              let cleanData = record.data
                .replace(/^"|"$/g, '') // Remove surrounding quotes
                .replace(/\\"/g, '"') // Unescape quotes
                .replace(/\\\\/g, '\\'); // Unescape backslashes

              // Some DNS providers return the record with additional quotes
              cleanData = cleanData.replace(/^"|"$/g, '');

              if (cleanData.toLowerCase().startsWith('v=spf1')) {
                spfRecord = cleanData;
                break;
              }
            }
          }
        }

        if (spfRecord) {
          break; // Found SPF record, no need to try other providers
        }
      } catch (error) {
        dnsError = error instanceof Error ? error.message : 'DNS query failed';
        continue; // Try next provider
      } finally {
        // Always clean up timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    }

    if (!spfRecord) {
      return NextResponse.json({
        success: true,
        data: {
          domain,
          hasSpf: false,
          error: dnsError || 'No SPF record found for this domain',
        },
      });
    }

    // Parse SPF record
    const parsedSpf = parseSPFRecord(spfRecord);

    return NextResponse.json({
      success: true,
      data: {
        domain,
        hasSpf: true,
        rawRecord: spfRecord,
        spfRecord: parsedSpf,
      },
    });
  } catch (error) {
    console.error('SPF validation error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error during SPF validation',
      },
      { status: 500 },
    );
  }
}

function parseSPFRecord(record: string) {
  const mechanisms: string[] = [];
  const qualifiers: { [key: string]: string } = {};
  const includes: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!record.toLowerCase().startsWith('v=spf1')) {
    errors.push('SPF record must start with "v=spf1"');
  }

  const parts = record.split(/\s+/).filter(Boolean);

  for (const part of parts) {
    if (part === 'v=spf1') continue;

    // Check for mechanisms
    if (part.match(/^[+\-~?]?(all|include|a|mx|ptr|exists|ip4|ip6|redirect)(:.*)?$/i)) {
      const qualifier = part.charAt(0);
      if (['+', '-', '~', '?'].includes(qualifier)) {
        qualifiers[part] = getQualifierDescription(qualifier);
      } else {
        qualifiers[part] = 'Pass (default)';
      }
      mechanisms.push(part);

      // Extract includes
      if (part.toLowerCase().includes('include:')) {
        const includeDomain = part.split(/include:/i)[1];
        if (includeDomain) includes.push(includeDomain);
      }

      // Validate IP addresses
      if (part.toLowerCase().includes('ip4:') || part.toLowerCase().includes('ip6:')) {
        const ipPart = part.split(':')[1];
        if (ipPart && !isValidIP(ipPart)) {
          warnings.push(`Invalid IP in mechanism: ${part}`);
        }
      }
    } else {
      warnings.push(`Unknown or malformed mechanism: ${part}`);
    }
  }

  // Check for "all" mechanism
  const hasAll = mechanisms.some((m) => m.toLowerCase().includes('all'));
  if (!hasAll) {
    warnings.push('It is recommended to include an "all" mechanism at the end of the record');
  }

  // Check for too many includes
  if (includes.length > 10) {
    warnings.push('Too many "include" mechanisms may cause performance issues');
  }

  // Check record length
  if (record.length > 255) {
    warnings.push('SPF record exceeds recommended length of 255 characters');
  }

  return {
    record,
    mechanisms,
    qualifiers,
    includes,
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

function getQualifierDescription(qualifier: string): string {
  switch (qualifier) {
    case '+':
      return 'Pass (allowed)';
    case '-':
      return 'Fail (reject)';
    case '~':
      return 'SoftFail (mark as spam)';
    case '?':
      return 'Neutral (no policy)';
    default:
      return 'Pass (default)';
  }
}

function isValidIP(ip: string): boolean {
  // IPv4 validation (with optional CIDR)
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:3[0-2]|[12]?[0-9]))?$/;

  // IPv6 validation (basic, with optional CIDR)
  const ipv6Regex =
    /^(?:[0-9a-fA-F]{1,4}:){1,7}[0-9a-fA-F]{0,4}(?:\/(?:12[0-8]|1[01][0-9]|[1-9]?[0-9]))?$|^::1$|^::$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}
