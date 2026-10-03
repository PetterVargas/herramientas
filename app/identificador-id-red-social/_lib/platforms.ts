export const platforms = ['facebook', 'instagram', 'tiktok', 'x'] as const;

export type Platform = (typeof platforms)[number];

export const PLATFORM_INFO: Record<
  Platform,
  { label: string; placeholder: string; hosts: string[] }
> = {
  facebook: {
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/usuario o profile.php?id=...',
    hosts: ['facebook.com', 'fb.com'],
  },
  instagram: {
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/usuario',
    hosts: ['instagram.com'],
  },
  tiktok: {
    label: 'TikTok',
    placeholder: 'https://www.tiktok.com/@usuario',
    hosts: ['tiktok.com'],
  },
  x: {
    label: 'X (Twitter)',
    placeholder: 'https://x.com/usuario',
    hosts: ['x.com', 'twitter.com'],
  },
};

export interface ProfileField {
  label: string;
  value: string;
}

export interface SocialProfile {
  platform: Platform;
  inputUrl: string;
  profileUrl: string;
  username: string;
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  verified: boolean | null;
  isPrivate: boolean | null;
  /** Estadísticas y datos propios de cada red (seguidores, fecha de creación...). */
  details: ProfileField[];
  source: string;
  queriedAt: string;
}

export type SocialProfileResponse =
  | { success: true; data: SocialProfile }
  | { success: false; error: string };

/** Identificador del perfil extraído de la URL: nombre de usuario o, en Facebook, ID numérico. */
export interface ProfileTarget {
  username: string;
  numericId: string;
}

// Rutas de Facebook/Instagram/X que no son perfiles.
const RESERVED_PATHS = new Set([
  'p',
  'reel',
  'reels',
  'stories',
  'explore',
  'watch',
  'groups',
  'events',
  'share',
  'photo',
  'photos',
  'videos',
  'status',
  'home',
  'search',
  'i',
  'intent',
  'hashtag',
  'login',
]);

const USERNAME_PATTERNS: Record<Platform, RegExp> = {
  facebook: /^[a-zA-Z0-9.]{1,80}$/,
  instagram: /^[a-zA-Z0-9._]{1,30}$/,
  tiktok: /^[a-zA-Z0-9._]{1,24}$/,
  x: /^[a-zA-Z0-9_]{1,15}$/,
};

/**
 * Extrae el usuario (o ID) de la URL del perfil. El servidor nunca visita la
 * URL que escribe el usuario: reconstruye la URL oficial a partir de este
 * identificador ya validado.
 */
export function parseProfileUrl(platform: Platform, rawUrl: string): ProfileTarget | string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return 'Introduce la URL del perfil';

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return 'La URL no es válida';
  }

  const host = url.hostname.toLowerCase().replace(/^(www|m|mobile|web)\./, '');
  const info = PLATFORM_INFO[platform];
  if (!info.hosts.includes(host)) {
    return `La URL no corresponde a ${info.label}. Debe ser de ${info.hosts.join(' o ')}`;
  }

  const segments = url.pathname.split('/').filter(Boolean);

  if (platform === 'facebook') {
    const id = url.searchParams.get('id');
    if (segments[0] === 'profile.php' && id && /^\d{1,20}$/.test(id)) {
      return { username: '', numericId: id };
    }
    // facebook.com/people/Nombre/123456
    if (segments[0] === 'people' && segments[2] && /^\d{1,20}$/.test(segments[2])) {
      return { username: '', numericId: segments[2] };
    }
  }

  let username = segments[0] ?? '';
  if (platform === 'tiktok') {
    if (!username.startsWith('@')) {
      return 'La URL de TikTok debe tener el formato tiktok.com/@usuario';
    }
    username = username.slice(1);
  }

  if (!username || RESERVED_PATHS.has(username.toLowerCase())) {
    return 'La URL debe apuntar directamente al perfil, no a una publicación u otra sección';
  }
  if (!USERNAME_PATTERNS[platform].test(username)) {
    return 'El nombre de usuario de la URL no es válido';
  }

  return {
    username,
    numericId: platform === 'facebook' && /^\d+$/.test(username) ? username : '',
  };
}
