import type {
  Platform,
  ProfileField,
  ProfileTarget,
  SocialProfile,
} from '@/app/identificador-id-red-social/_lib/platforms';

type ProfileData = Omit<SocialProfile, 'platform' | 'inputUrl' | 'queriedAt'>;

export class ProfileLookupError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
// Meta sirve el HTML completo del perfil (con su ID) a su propio rastreador de
// vistas previas de enlaces; a un navegador sin sesión le pide iniciar sesión.
const META_CRAWLER_UA = 'facebookexternalhit/1.1';
const TIMEOUT_MS = 12000;

async function fetchText(url: string, headers: Record<string, string>): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { headers, redirect: 'follow', signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ProfileLookupError('La red social tardó demasiado en responder', 504);
    }
    throw new ProfileLookupError('No se pudo conectar con la red social', 502);
  } finally {
    clearTimeout(timeoutId);
  }
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function metaContent(html: string, property: string): string {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match =
    new RegExp(`<meta[^>]+(?:property|name)="${escaped}"[^>]+content="([^"]*)"`, 'i').exec(html) ??
    new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${escaped}"`, 'i').exec(html);
  return match ? decodeHtml(match[1]).trim() : '';
}

const numberFormatter = new Intl.NumberFormat('es-CO');

function formatCount(value: unknown): string {
  return typeof value === 'number' ? numberFormatter.format(value) : '';
}

function formatDate(date: Date): string {
  if (Number.isNaN(date.getTime())) return '';
  return `${new Intl.DateTimeFormat('es-CO', {
    timeZone: 'UTC',
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)} (UTC)`;
}

function compact(fields: ProfileField[]): ProfileField[] {
  return fields.filter((field) => field.value);
}

async function fetchTikTok({ username }: ProfileTarget): Promise<ProfileData> {
  const profileUrl = `https://www.tiktok.com/@${username}`;
  const response = await fetchText(profileUrl, {
    'User-Agent': BROWSER_UA,
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  });
  if (!response.ok) throw new ProfileLookupError('TikTok no respondió correctamente', 502);

  const html = await response.text();
  const script =
    /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/.exec(html)?.[1];
  if (!script) {
    throw new ProfileLookupError('TikTok bloqueó la consulta. Intenta de nuevo más tarde', 502);
  }

  interface TikTokUserDetail {
    userInfo?: {
      user?: {
        id: string;
        uniqueId: string;
        nickname: string;
        signature: string;
        avatarLarger?: string;
        verified: boolean;
        privateAccount: boolean;
        createTime?: number;
        secUid?: string;
        language?: string;
      };
      stats?: {
        followerCount: number;
        followingCount: number;
        heartCount: number;
        videoCount: number;
      };
    };
  }

  const data = JSON.parse(script) as {
    __DEFAULT_SCOPE__?: { 'webapp.user-detail'?: TikTokUserDetail };
  };
  const user = data.__DEFAULT_SCOPE__?.['webapp.user-detail']?.userInfo?.user;
  const stats = data.__DEFAULT_SCOPE__?.['webapp.user-detail']?.userInfo?.stats;
  if (!user?.id) throw new ProfileLookupError('No se encontró el perfil de TikTok', 404);

  return {
    profileUrl: `https://www.tiktok.com/@${user.uniqueId}`,
    username: user.uniqueId,
    id: user.id,
    name: user.nickname,
    description: user.signature,
    avatarUrl: user.avatarLarger ?? '',
    verified: user.verified,
    isPrivate: user.privateAccount,
    details: compact([
      { label: 'Seguidores', value: formatCount(stats?.followerCount) },
      { label: 'Siguiendo', value: formatCount(stats?.followingCount) },
      { label: 'Me gusta', value: formatCount(stats?.heartCount) },
      { label: 'Videos', value: formatCount(stats?.videoCount) },
      {
        label: 'Cuenta creada',
        value: user.createTime ? formatDate(new Date(user.createTime * 1000)) : '',
      },
      { label: 'secUid', value: user.secUid ?? '' },
      { label: 'Idioma', value: user.language ?? '' },
    ]),
    source: 'Página pública del perfil en tiktok.com',
  };
}

async function fetchInstagram({ username }: ProfileTarget): Promise<ProfileData> {
  const profileUrl = `https://www.instagram.com/${username}/`;
  const response = await fetchText(profileUrl, {
    'User-Agent': META_CRAWLER_UA,
    'Accept-Language': 'en-US,en;q=0.9',
  });
  if (response.status === 404) {
    throw new ProfileLookupError('No se encontró el perfil de Instagram', 404);
  }
  if (!response.ok) throw new ProfileLookupError('Instagram no respondió correctamente', 502);

  const html = await response.text();
  const id =
    /"profile_id":"(\d+)"/.exec(html)?.[1] ?? /"profilePage_(\d+)"/.exec(html)?.[1] ?? '';
  if (!id) {
    throw new ProfileLookupError(
      'No se encontró el perfil de Instagram o Instagram bloqueó la consulta',
      404,
    );
  }

  // og:title: "Nombre (@usuario) • Instagram photos and videos"
  const title = metaContent(html, 'og:title');
  const name = /^(.*?)\s*\(@[^)]+\)/.exec(title)?.[1] ?? '';
  // og:description: "687M Followers, 303 Following, 8,608 Posts - See Instagram photos..."
  const summary = metaContent(html, 'og:description');
  const counts = /^([\d.,]+[KMB]?) Followers, ([\d.,]+[KMB]?) Following, ([\d.,]+[KMB]?) Posts/i.exec(
    summary,
  );

  return {
    profileUrl,
    username,
    id,
    name,
    description: '',
    avatarUrl: metaContent(html, 'og:image'),
    verified: null,
    isPrivate: null,
    details: compact([
      { label: 'Seguidores', value: counts?.[1] ?? '' },
      { label: 'Siguiendo', value: counts?.[2] ?? '' },
      { label: 'Publicaciones', value: counts?.[3] ?? '' },
    ]),
    source: 'Página pública del perfil en instagram.com',
  };
}

async function fetchFacebook({ username, numericId }: ProfileTarget): Promise<ProfileData> {
  const profileUrl = username
    ? `https://www.facebook.com/${username}`
    : `https://www.facebook.com/profile.php?id=${numericId}`;
  const response = await fetchText(profileUrl, {
    'User-Agent': META_CRAWLER_UA,
    'Accept-Language': 'es-ES,es;q=0.9',
  });
  if (response.status === 404) {
    throw new ProfileLookupError('No se encontró el perfil de Facebook', 404);
  }
  if (!response.ok) throw new ProfileLookupError('Facebook no respondió correctamente', 502);

  const html = await response.text();
  const id =
    /fb:\/\/(?:profile|page)\/(?:\?id=)?(\d+)/.exec(html)?.[1] ??
    /"userID":"(\d+)"/.exec(html)?.[1] ??
    /"pageID":"(\d+)"/.exec(html)?.[1] ??
    numericId;
  const name = metaContent(html, 'og:title');

  if (!id || !name) {
    throw new ProfileLookupError(
      'No se encontró el perfil de Facebook, es privado o Facebook bloqueó la consulta',
      404,
    );
  }

  const canonical = metaContent(html, 'og:url');
  const canonicalUsername =
    /facebook\.com\/(?!profile\.php|people\/)([^/?#]+)/.exec(canonical)?.[1] ?? username;

  return {
    profileUrl: canonical || profileUrl,
    username: canonicalUsername,
    id,
    name,
    description: metaContent(html, 'og:description'),
    avatarUrl: metaContent(html, 'og:image'),
    verified: null,
    isPrivate: null,
    details: [],
    source: 'Página pública del perfil en facebook.com',
  };
}

async function fetchX({ username }: ProfileTarget): Promise<ProfileData> {
  // X no expone perfiles sin sesión; FxTwitter (código abierto) consulta la API
  // de X y devuelve el perfil público en JSON.
  const response = await fetchText(`https://api.fxtwitter.com/${username}`, {
    'User-Agent': 'DivisionCero-Herramientas/1.0 (+https://herramientas.divisioncero.com)',
  });

  interface FxUserResponse {
    code: number;
    message: string;
    user?: {
      id: string;
      screen_name: string;
      name: string;
      description: string;
      location: string;
      url: string;
      avatar_url: string;
      followers: number;
      following: number;
      tweets: number;
      likes: number;
      media_count: number;
      joined: string;
      protected: boolean;
      website?: { url: string } | null;
      verification?: { verified: boolean; type?: string } | null;
    };
  }

  let data: FxUserResponse | null = null;
  try {
    data = (await response.json()) as FxUserResponse;
  } catch {
    // Respuesta no JSON: se trata como error más abajo.
  }

  if (response.status === 404 || data?.code === 404) {
    throw new ProfileLookupError('No se encontró el perfil de X', 404);
  }
  const user = data?.user;
  if (!response.ok || !user?.id) {
    throw new ProfileLookupError('X no respondió correctamente. Intenta de nuevo', 502);
  }

  return {
    profileUrl: `https://x.com/${user.screen_name}`,
    username: user.screen_name,
    id: user.id,
    name: user.name,
    description: user.description,
    avatarUrl: user.avatar_url?.replace('_normal.', '_400x400.') ?? '',
    verified: user.verification?.verified ?? null,
    isPrivate: user.protected,
    details: compact([
      { label: 'Seguidores', value: formatCount(user.followers) },
      { label: 'Siguiendo', value: formatCount(user.following) },
      { label: 'Publicaciones', value: formatCount(user.tweets) },
      { label: 'Me gusta', value: formatCount(user.likes) },
      { label: 'Multimedia', value: formatCount(user.media_count) },
      { label: 'Cuenta creada', value: user.joined ? formatDate(new Date(user.joined)) : '' },
      { label: 'Ubicación', value: user.location },
      { label: 'Sitio web', value: user.website?.url ?? '' },
    ]),
    source: 'API pública de FxTwitter (api.fxtwitter.com)',
  };
}

export const profileFetchers: Record<Platform, (target: ProfileTarget) => Promise<ProfileData>> = {
  facebook: fetchFacebook,
  instagram: fetchInstagram,
  tiktok: fetchTikTok,
  x: fetchX,
};
