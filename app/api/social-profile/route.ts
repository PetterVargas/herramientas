import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

import {
  parseProfileUrl,
  platforms,
  type SocialProfileResponse,
} from '@/app/identificador-id-red-social/_lib/platforms';

import { ProfileLookupError, profileFetchers } from './fetchers';

const RequestSchema = z.object({
  platform: z.enum(platforms, { error: 'Red social no soportada' }),
  url: z.string().max(500, 'La URL es demasiado larga'),
});

function errorResponse(error: string, status: number) {
  return NextResponse.json<SocialProfileResponse>({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse('Solicitud inválida', 400);
  }

  const validation = RequestSchema.safeParse(body);
  if (!validation.success) {
    return errorResponse(validation.error.issues[0]?.message || 'Solicitud inválida', 400);
  }

  const { platform, url } = validation.data;
  const target = parseProfileUrl(platform, url);
  if (typeof target === 'string') return errorResponse(target, 400);

  try {
    const profile = await profileFetchers[platform](target);
    return NextResponse.json<SocialProfileResponse>({
      success: true,
      data: { ...profile, platform, inputUrl: url.trim(), queriedAt: new Date().toISOString() },
    });
  } catch (error) {
    if (error instanceof ProfileLookupError) return errorResponse(error.message, error.status);
    return errorResponse('No se pudo consultar el perfil', 502);
  }
}
