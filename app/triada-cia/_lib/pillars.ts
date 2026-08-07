export type Pillar = 'confidencialidad' | 'integridad' | 'disponibilidad';

export interface PillarInfo {
  id: Pillar;
  name: string;
  question: string;
  definition: string;
  principle: string;
  attacks: string[];
  controls: string[];
  color: string;
  ring: string;
}

export const pillars: PillarInfo[] = [
  {
    id: 'confidencialidad',
    name: 'Confidencialidad',
    question: '¿Quién puede ver esta información?',
    definition:
      'Garantiza que la información solo sea accesible para las personas, sistemas o procesos autorizados a verla.',
    principle: 'Principio del menor privilegio: cada quien accede solo a lo que necesita.',
    attacks: [
      'Robo o filtración de datos (data breach)',
      'Ataques de phishing para robar credenciales',
      'Espionaje de tráfico de red (sniffing)',
      'Acceso indebido por permisos mal configurados',
    ],
    controls: [
      'Cifrado de datos en reposo y en tránsito',
      'Control de acceso basado en roles (RBAC)',
      'Autenticación multifactor (MFA)',
      'Clasificación y etiquetado de información',
    ],
    color: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500',
  },
  {
    id: 'integridad',
    name: 'Integridad',
    question: '¿Puedo confiar en que esta información no fue alterada?',
    definition:
      'Asegura que la información sea exacta, completa y que no haya sido modificada de forma no autorizada o accidental.',
    principle: 'Toda modificación debe ser rastreable, autorizada y verificable.',
    attacks: [
      'Manipulación de datos en tránsito (man-in-the-middle)',
      'Inyección SQL que altera registros',
      'Malware que modifica archivos o configuraciones',
      'Alteración de logs para ocultar un ataque',
    ],
    controls: [
      'Funciones hash y firmas digitales',
      'Control de versiones y logs de auditoría',
      'Validación de entradas y checksums',
      'Permisos de escritura restringidos',
    ],
    color: 'text-green-600 dark:text-green-400',
    ring: 'ring-green-500',
  },
  {
    id: 'disponibilidad',
    name: 'Disponibilidad',
    question: '¿Puedo acceder a esta información cuando la necesito?',
    definition:
      'Garantiza que los sistemas y datos estén accesibles y operativos para los usuarios autorizados cuando los necesiten.',
    principle: 'Los sistemas deben resistir fallas e interrupciones y recuperarse rápido.',
    attacks: [
      'Ataques de denegación de servicio (DoS/DDoS)',
      'Ransomware que bloquea el acceso a archivos',
      'Fallas de hardware sin redundancia',
      'Cortes de energía o desastres naturales',
    ],
    controls: [
      'Redundancia y balanceo de carga',
      'Copias de seguridad (backups) periódicas',
      'Planes de continuidad y recuperación ante desastres',
      'Monitoreo y mitigación de DDoS',
    ],
    color: 'text-orange-600 dark:text-orange-400',
    ring: 'ring-orange-500',
  },
];

export const pillarById = (id: Pillar) => pillars.find((p) => p.id === id)!;
