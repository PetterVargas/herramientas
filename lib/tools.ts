export interface Tool {
  slug: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  iconName:
    | 'Radar'
    | 'BookOpen'
    | 'Map'
    | 'Grid3x3'
    | 'MessageCircleQuestion'
    | 'Network'
    | 'Calendar'
    | 'KeyRound'
    | 'QrCode'
    | 'Hash'
    | 'Mail'
    | 'Binary'
    | 'Link2'
    | 'Fingerprint'
    | 'ShieldCheck'
    | 'Gauge'
    | 'Fish'
    | 'Inbox'
    | 'MonitorCheck';
}

export const tools: Tool[] = [
  {
    slug: 'conan',
    title: 'Conan Rastreo Informático',
    description: 'Tracking basado en direcciones IP para la detección de amenazas.',
    href: `https://app.divisioncero.com/home/conan?`,
    external: true,
    iconName: 'Radar',
  },
  {
    slug: 'framework-kudo',
    title: 'Framework Kudo',
    description: 'Framework de Ciberseguridad open-source para el cumplimiento de tu empresa.',
    href: 'https://kudo.divisioncero.com/sgx',
    external: true,
    iconName: 'BookOpen',
  },
  {
    slug: 'cybermap',
    title: 'CyberMap',
    description: 'Visualiza el panorama de amenazas y ciberataques en tiempo real.',
    href: '/cybermap',
    iconName: 'Map',
  },
  {
    slug: 'tabla-periodica-ciberseguridad',
    title: 'Tabla Periódica de Ciberseguridad',
    description: 'Explora los elementos clave de la Ciberseguridad de forma visual.',
    href: '/tabla-periodica-ciberseguridad',
    iconName: 'Grid3x3',
  },
  {
    slug: 'rompehielos',
    title: 'Rompehielos de Seguridad',
    description: 'Preguntas para romper el hielo y abrir la conversación sobre seguridad.',
    href: '/rompehielos',
    iconName: 'MessageCircleQuestion',
  },
  {
    slug: 'workflow-ciberseguridad',
    title: 'Workflow de Ciberseguridad',
    description: 'Diagramas de flujo para procesos y procedimientos de seguridad.',
    href: '/workflow-ciberseguridad',
    iconName: 'Network',
  },
  {
    slug: 'calendario-ciberseguridad',
    title: 'Calendario de Ciberseguridad',
    description: 'Fechas clave y eventos relevantes de Ciberseguridad.',
    href: '/calendario-ciberseguridad',
    iconName: 'Calendar',
  },
  {
    slug: 'generador-contrasenas',
    title: 'Generador de Contraseñas',
    description: 'Crea contraseñas seguras y aleatorias al instante.',
    href: '/generador-contrasenas',
    iconName: 'KeyRound',
  },
  {
    slug: 'generador-qr',
    title: 'Generador de QR',
    description: 'Genera códigos QR gratis para tus enlaces y campañas.',
    href: '/generador-qr',
    iconName: 'QrCode',
  },
  {
    slug: 'generador-hash',
    title: 'Generador de Hash',
    description: 'Calcula el hash de cualquier texto o archivo.',
    href: '/generador-hash',
    iconName: 'Hash',
  },
  {
    slug: 'validador-spf',
    title: 'Validador SPF',
    description: 'Verifica y valida los registros SPF de tu dominio.',
    href: '/validador-spf',
    iconName: 'Mail',
  },
  {
    slug: 'codificador-base64',
    title: 'Codif/Decod Base64',
    description: 'Codifica y decodifica texto en Base64.',
    href: '/codificador-base64',
    iconName: 'Binary',
  },
  {
    slug: 'codificador-url',
    title: 'Codif/Decod URL',
    description: 'Codifica y decodifica URLs fácilmente.',
    href: '/codificador-url',
    iconName: 'Link2',
  },
  {
    slug: 'generador-uuid',
    title: 'Generador de UUID',
    description: 'Genera identificadores únicos universales (UUID).',
    href: '/generador-uuid',
    iconName: 'Fingerprint',
  },
  {
    slug: 'triada-cia',
    title: 'Tríada CIA',
    description: 'Aprende e identifica Confidencialidad, Integridad y Disponibilidad.',
    href: '/triada-cia',
    iconName: 'ShieldCheck',
  },
  {
    slug: 'analizador-contrasenas',
    title: 'Analizador de Contraseñas',
    description: 'Calcula cuánto tardaría un atacante en descifrar tu contraseña.',
    href: '/analizador-contrasenas',
    iconName: 'Gauge',
  },
  {
    slug: 'deteccion-phishing',
    title: 'Práctica: Detección de Phishing',
    description: 'Practica identificando mensajes de phishing en correos y SMS.',
    href: '/deteccion-phishing',
    iconName: 'Fish',
  },
  {
    slug: 'identificador-correos-seguros',
    title: 'Correos Seguros vs. No Seguros',
    description: 'Revisa una bandeja simulada y distingue correos seguros de maliciosos.',
    href: '/identificador-correos-seguros',
    iconName: 'Inbox',
  },
  {
    slug: 'verificar-sitio-seguro',
    title: '¿Es Seguro Este Sitio?',
    description: 'Animación paso a paso de las señales que confirman un sitio seguro.',
    href: '/verificar-sitio-seguro',
    iconName: 'MonitorCheck',
  },
];
