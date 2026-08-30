export const categories = [
  'Contraseñas',
  'Utilidades',
  'Criptografía',
  'Correo y Phishing',
  'Navegación Segura',
  'Monitoreo y Amenazas',
  'Rastreo',
  'Aprendizaje y Concientización',
  'Cumplimiento y Gestión',
] as const;

export type Category = (typeof categories)[number];

export interface Tool {
  slug: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  categories: Category[];
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
    | 'MonitorCheck'
    | 'Landmark'
    | 'ScanSearch'
    | 'Globe'
    | 'Scale'
    | 'ClipboardCheck'
    | 'ShieldAlert'
    | 'Users'
    | 'Bug'
    | 'Lock'
    | 'IdCard'
    | 'FileDigit'
    | 'FileSearch'
    | 'FileCode2'
    | 'Code2'
    | 'UserRoundSearch'
    | 'MessageCircleWarning'
    | 'BadgeAlert';
}

export const tools: Tool[] = [
  {
    slug: 'conan',
    title: 'Conan Rastreo Informático',
    description: 'Tracking basado en direcciones IP para la detección de amenazas.',
    href: 'https://app.divisioncero.com/home/conan',
    external: true,
    categories: ['Monitoreo y Amenazas', 'Rastreo'],
    iconName: 'Radar',
  },
  {
    slug: 'framework-kudo',
    title: 'Framework Kudo',
    description: 'Framework de Ciberseguridad open-source para el cumplimiento de tu empresa.',
    href: 'https://kudo.divisioncero.com/sgx',
    external: true,
    categories: ['Cumplimiento y Gestión'],
    iconName: 'BookOpen',
  },
  {
    slug: 'cybermap',
    title: 'CyberMap',
    description: 'Visualiza el panorama de amenazas y ciberataques en tiempo real.',
    href: '/cybermap',
    categories: ['Monitoreo y Amenazas'],
    iconName: 'Map',
  },
  {
    slug: 'tabla-periodica-ciberseguridad',
    title: 'Tabla Periódica de Ciberseguridad',
    description: 'Explora los elementos clave de la Ciberseguridad de forma visual.',
    href: '/tabla-periodica-ciberseguridad',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'Grid3x3',
  },
  {
    slug: 'rompehielos',
    title: 'Rompehielos de Seguridad',
    description: 'Preguntas para romper el hielo y abrir la conversación sobre seguridad.',
    href: '/rompehielos',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'MessageCircleQuestion',
  },
  {
    slug: 'workflow-ciberseguridad',
    title: 'Workflow de Ciberseguridad',
    description: 'Diagramas de flujo para procesos y procedimientos de seguridad.',
    href: '/workflow-ciberseguridad',
    categories: ['Cumplimiento y Gestión'],
    iconName: 'Network',
  },
  {
    slug: 'calendario-ciberseguridad',
    title: 'Calendario de Ciberseguridad',
    description: 'Fechas clave y eventos relevantes de Ciberseguridad.',
    href: '/calendario-ciberseguridad',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'Calendar',
  },
  {
    slug: 'museo-cibercrimen',
    title: 'Museo del Cibercrimen',
    description: 'Una galería visual con hitos, personajes y momentos icónicos del cibercrimen.',
    href: '/museo-cibercrimen',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'Landmark',
  },
  {
    slug: 'generador-contrasenas',
    title: 'Generador de Contraseñas',
    description: 'Crea contraseñas seguras y aleatorias al instante.',
    href: '/generador-contrasenas',
    categories: ['Contraseñas', 'Utilidades'],
    iconName: 'KeyRound',
  },
  {
    slug: 'generador-qr',
    title: 'Generador de QR',
    description: 'Genera códigos QR gratis para tus enlaces y campañas.',
    href: '/generador-qr',
    categories: ['Utilidades'],
    iconName: 'QrCode',
  },
  {
    slug: 'generador-hash',
    title: 'Generador de Hash',
    description: 'Calcula el hash de cualquier texto o archivo.',
    href: '/generador-hash',
    categories: ['Utilidades', 'Criptografía'],
    iconName: 'Hash',
  },
  {
    slug: 'validador-spf',
    title: 'Validador SPF',
    description: 'Verifica y valida los registros SPF de tu dominio.',
    href: '/validador-spf',
    categories: ['Correo y Phishing', 'Utilidades'],
    iconName: 'Mail',
  },
  {
    slug: 'codificador-base64',
    title: 'Codif/Decod Base64',
    description: 'Codifica y decodifica texto en Base64.',
    href: '/codificador-base64',
    categories: ['Utilidades', 'Criptografía'],
    iconName: 'Binary',
  },
  {
    slug: 'codificador-url',
    title: 'Codif/Decod URL',
    description: 'Codifica y decodifica URLs fácilmente.',
    href: '/codificador-url',
    categories: ['Utilidades'],
    iconName: 'Link2',
  },
  {
    slug: 'codificador-hexadecimal',
    title: 'Codif/Decod Hexadecimal',
    description: 'Codifica y decodifica texto en hexadecimal.',
    href: '/codificador-hexadecimal',
    categories: ['Utilidades'],
    iconName: 'Code2',
  },
  {
    slug: 'generador-uuid',
    title: 'Generador de UUID',
    description: 'Genera identificadores únicos universales (UUID).',
    href: '/generador-uuid',
    categories: ['Utilidades'],
    iconName: 'Fingerprint',
  },
  {
    slug: 'triada-cia',
    title: 'Tríada CIA',
    description: 'Aprende e identifica Confidencialidad, Integridad y Disponibilidad.',
    href: '/triada-cia',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'ShieldCheck',
  },
  {
    slug: 'analizador-contrasenas',
    title: 'Analizador de Contraseñas',
    description: 'Calcula cuánto tardaría un atacante en descifrar tu contraseña.',
    href: '/analizador-contrasenas',
    categories: ['Contraseñas'],
    iconName: 'Gauge',
  },
  {
    slug: 'deteccion-phishing',
    title: 'Práctica: Detección de Phishing',
    description: 'Practica identificando mensajes de phishing en correos y SMS.',
    href: '/deteccion-phishing',
    categories: ['Correo y Phishing', 'Aprendizaje y Concientización'],
    iconName: 'Fish',
  },
  {
    slug: 'suplantacion-marcas',
    title: '10 ejemplos de suplantación de marcas',
    description:
      'Ejemplos ilustrados de suplantación de marcas en Instagram, Facebook, WhatsApp, sitios web y más, con señales de alerta y cómo verificar cuentas oficiales.',
    href: '/suplantacion-marcas',
    categories: ['Correo y Phishing', 'Aprendizaje y Concientización'],
    iconName: 'BadgeAlert',
  },
  {
    slug: 'identificador-correos-seguros',
    title: 'Correos Seguros vs. No Seguros',
    description: 'Revisa una bandeja simulada y distingue correos seguros de maliciosos.',
    href: '/identificador-correos-seguros',
    categories: ['Correo y Phishing', 'Aprendizaje y Concientización'],
    iconName: 'Inbox',
  },
  {
    slug: 'verificar-sitio-seguro',
    title: '¿Es Seguro Este Sitio?',
    description: 'Animación paso a paso de las señales que confirman un sitio seguro.',
    href: '/verificar-sitio-seguro',
    categories: ['Navegación Segura', 'Aprendizaje y Concientización'],
    iconName: 'MonitorCheck',
  },
  {
    slug: 'malas-practicas-escritorio',
    title: 'Buenas Prácticas en el Puesto de Trabajo',
    description: 'Encuentra las 10 malas prácticas de seguridad en un escritorio simulado.',
    href: '/malas-practicas-escritorio',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'ScanSearch',
  },
  {
    slug: 'cual-es-mi-ip',
    title: '¿Cuál es mi IP?',
    description: 'Consulta tu IP pública, ubicación aproximada, fecha de conexión y user agent.',
    href: '/cual-es-mi-ip',
    categories: ['Utilidades', 'Rastreo'],
    iconName: 'Globe',
  },
  {
    slug: 'rompehielos-practicas-ciberseguridad',
    title: 'Rompehielos: Buenas y Malas Prácticas',
    description:
      'Dinámica de equipo para discutir y aprender buenas y malas prácticas de ciberseguridad en equipos.',
    href: '/rompehielos-practicas-ciberseguridad',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'Scale',
  },
  {
    slug: 'checklist-buenas-practicas-equipo',
    title: 'Checklist de Buenas Prácticas del Equipo',
    description:
      'Verifica como líder que tu equipo y sus equipos de cómputo cumplan las protecciones básicas de ciberseguridad.',
    href: '/checklist-buenas-practicas-equipo',
    categories: ['Cumplimiento y Gestión', 'Aprendizaje y Concientización'],
    iconName: 'ClipboardCheck',
  },
  {
    slug: 'checklist-incidente-seguridad',
    title: 'Checklist de Mitigación de Incidentes',
    description:
      'Pasos inmediatos ante un incidente de seguridad, como colaborador o como líder del equipo.',
    href: '/checklist-incidente-seguridad',
    categories: ['Cumplimiento y Gestión'],
    iconName: 'ShieldAlert',
  },
  {
    slug: 'flujo-autenticacion-autorizacion',
    title: 'Flujo de Autenticación, Autorización y Roles',
    description:
      'Visualiza paso a paso cómo funcionan la autenticación, la autorización y los roles (fijos o custom) en accesos por API y por MCP.',
    href: '/flujo-autenticacion-autorizacion',
    categories: ['Aprendizaje y Concientización', 'Cumplimiento y Gestión'],
    iconName: 'Users',
  },
  {
    slug: 'detector-codigo-vulnerable',
    title: 'Detector de Código Vulnerable',
    description:
      'Practica identificando código vulnerable vs. seguro: OWASP Top 10, Top 10 de IA/LLM, secretos hardcodeados, SCA, SAST, DAST y pentesting.',
    href: '/detector-codigo-vulnerable',
    categories: ['Aprendizaje y Concientización', 'Cumplimiento y Gestión'],
    iconName: 'Bug',
  },
  {
    slug: 'cifrado-pgp',
    title: 'Cifrado PGP Explicado',
    description:
      'Cómo funciona el cifrado PGP paso a paso: claves públicas y privadas, cifrado híbrido y firma digital.',
    href: '/cifrado-pgp',
    categories: ['Criptografía', 'Aprendizaje y Concientización'],
    iconName: 'Lock',
  },
  {
    slug: 'que-es-pii',
    title: '¿Qué es un dato PII?',
    description:
      'Aprende qué es información de identificación personal (PII), sus categorías y cómo protegerla, con un quiz para practicar.',
    href: '/que-es-pii',
    categories: ['Aprendizaje y Concientización', 'Cumplimiento y Gestión'],
    iconName: 'IdCard',
  },
  {
    slug: 'que-es-grooming',
    title: '¿Qué es el grooming?',
    description:
      'Herramienta didáctica para padres, niños, niñas y adolescentes: fases del grooming, señales de alerta y qué hacer, con un quiz para practicar.',
    href: '/que-es-grooming',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'UserRoundSearch',
  },
  {
    slug: 'que-es-sexting',
    title: '¿Qué es el sexting?',
    description:
      'Herramienta didáctica sobre los riesgos del sexting: pérdida de control, permanencia digital, consecuencias legales y presión, con un quiz para practicar.',
    href: '/que-es-sexting',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'MessageCircleWarning',
  },
  {
    slug: 'que-es-sextorsion',
    title: '¿Qué es la sextorsión?',
    description:
      'Herramienta didáctica sobre cómo opera la sextorsión, sus fases, señales de alerta y qué hacer si ocurre, con un quiz para practicar.',
    href: '/que-es-sextorsion',
    categories: ['Aprendizaje y Concientización'],
    iconName: 'ShieldAlert',
  },
  {
    slug: 'hash-archivo',
    title: 'Hash de Archivo',
    description:
      'Calcula el MD5, SHA-1, SHA-256 y SHA-512 de un archivo (PDF, ZIP, RAR, imágenes u ofimática) sin subirlo a ningún servidor.',
    href: '/hash-archivo',
    categories: ['Utilidades', 'Criptografía'],
    iconName: 'FileDigit',
  },
  {
    slug: 'analizador-metadatos',
    title: 'Analizador de Metadatos',
    description:
      'Descubre los metadatos ocultos de una imagen o documento ofimático (autor, fechas, GPS) y descarga un reporte en PDF.',
    href: '/analizador-metadatos',
    categories: ['Utilidades', 'Rastreo'],
    iconName: 'FileSearch',
  },
  {
    slug: 'visor-hexadecimal',
    title: 'Visor Hexadecimal',
    description:
      'Visualiza el contenido byte a byte de cualquier archivo en hexadecimal y ASCII, con búsqueda de texto o bytes.',
    href: '/visor-hexadecimal',
    categories: ['Utilidades'],
    iconName: 'FileCode2',
  },
];
