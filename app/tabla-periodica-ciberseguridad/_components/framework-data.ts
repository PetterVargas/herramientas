export interface FrameworkElement {
  code: string; // COR-01, CAP-01, etc.
  name: string;
  category: string;
  domainCode: string; // COR, CAP, etc.
  description: string;
  xpos: number; // Grid column position
  ypos: number; // Grid row position
  number: number | null; // Sequential number for reference, null for special elements
  isSpecial?: boolean; // Flag for special H elements
}

export interface Domain {
  code: string;
  name: string;
  color: string; // Tailwind color class
  hexColor: string; // Hex color for direct use
}

export const domains: Domain[] = [
  {
    code: 'COR',
    name: 'Coherencia Organizacional',
    color: 'bg-blue-500',
    hexColor: '#3b82f6',
  },
  {
    code: 'CAP',
    name: 'Ciberseguridad en Aplicaciones',
    color: 'bg-purple-500',
    hexColor: '#a855f7',
  },
  {
    code: 'CCN',
    name: 'Continuidad y Cambios del Negocio',
    color: 'bg-green-500',
    hexColor: '#22c55e',
  },
  {
    code: 'CIF',
    name: 'Ciberseguridad en Infrastructura',
    color: 'bg-yellow-500',
    hexColor: '#eab308',
  },
  {
    code: 'THP',
    name: 'Ciberseguridad en Talento Humano y Proveedores',
    color: 'bg-pink-500',
    hexColor: '#ec4899',
  },
  {
    code: 'CIP',
    name: 'Ciberseguridad en Identidad y Puntos Finales',
    color: 'bg-indigo-500',
    hexColor: '#6366f1',
  },
  {
    code: 'ADR',
    name: 'Análisis, Detección y Respuesta de Ciberseguridad',
    color: 'bg-red-500',
    hexColor: '#ef4444',
  },
  {
    code: 'DIA',
    name: 'Ciberseguridad en Datos e Inteligencia Artificial',
    color: 'bg-cyan-500',
    hexColor: '#06b6d4',
  },
];

export const frameworkElements: FrameworkElement[] = [
  // Column 1 - COR (Coherencia Organizacional) - 4 controles
  {
    code: 'COR-01',
    name: 'Programa de Gestión de Riesgos y Ciberseguridad',
    category: 'Coherencia Organizacional',
    domainCode: 'COR',
    description:
      'Establece un programa integral para gestionar riesgos de ciberseguridad y proteger los activos organizacionales.',
    xpos: 1,
    ypos: 3,
    number: 1,
  },
  {
    code: 'COR-02',
    name: 'Mapeo de Cumplimiento Regulatorio',
    category: 'Coherencia Organizacional',
    domainCode: 'COR',
    description:
      'Identifica y mapea los requisitos regulatorios aplicables a la organización.',
    xpos: 1,
    ypos: 4,
    number: 2,
  },
  {
    code: 'COR-03',
    name: 'Evaluación Independiente basada en Riesgos',
    category: 'Coherencia Organizacional',
    domainCode: 'COR',
    description:
      'Realiza evaluaciones independientes para verificar la efectividad de los controles.',
    xpos: 1,
    ypos: 5,
    number: 3,
  },
  {
    code: 'COR-04',
    name: 'Mejora Continua y Acciones Correctivas',
    category: 'Coherencia Organizacional',
    domainCode: 'COR',
    description:
      'Implementa un proceso de mejora continua basado en lecciones aprendidas.',
    xpos: 1,
    ypos: 6,
    number: 4,
  },
  // Column 2 - CAP (Ciberseguridad en Aplicaciones) - 3 controles
  {
    code: 'CAP-01',
    name: 'Ciberseguridad en el Ciclo de Desarrollo del Software',
    category: 'Ciberseguridad en Aplicaciones',
    domainCode: 'CAP',
    description:
      'Integra prácticas de seguridad en todas las fases del desarrollo de software.',
    xpos: 2,
    ypos: 3,
    number: 5,
  },
  {
    code: 'CAP-02',
    name: 'Automatización en el Ciclo de Desarrollo del Software',
    category: 'Ciberseguridad en Aplicaciones',
    domainCode: 'CAP',
    description:
      'Implementa herramientas automatizadas para pruebas de seguridad en el pipeline CI/CD.',
    xpos: 2,
    ypos: 4,
    number: 6,
  },
  {
    code: 'CAP-03',
    name: 'Ciberseguridad en APIs',
    category: 'Ciberseguridad en Aplicaciones',
    domainCode: 'CAP',
    description:
      'Asegura las interfaces de programación de aplicaciones contra amenazas comunes.',
    xpos: 2,
    ypos: 5,
    number: 7,
  },
  // Column 3 - CCN (Continuidad y Cambios del Negocio) - 3 controles
  {
    code: 'CCN-01',
    name: 'Gestión y Control de Cambios',
    category: 'Continuidad y Cambios del Negocio',
    domainCode: 'CCN',
    description:
      'Establece un proceso formal para gestionar cambios en sistemas críticos.',
    xpos: 3,
    ypos: 3,
    number: 8,
  },
  {
    code: 'CCN-02',
    name: 'Pruebas de Calidad y Seguridad en la Gestión de Cambios',
    category: 'Continuidad y Cambios del Negocio',
    domainCode: 'CCN',
    description:
      'Valida que los cambios no introduzcan vulnerabilidades o degraden la seguridad.',
    xpos: 3,
    ypos: 4,
    number: 9,
  },
  {
    code: 'CCN-03',
    name: 'Revertir Cambios',
    category: 'Continuidad y Cambios del Negocio',
    domainCode: 'CCN',
    description:
      'Define procedimientos para revertir cambios que causen problemas.',
    xpos: 3,
    ypos: 5,
    number: 10,
  },
  // Column 4 - CIF (Ciberseguridad en Infrastructura) - 5 controles
  {
    code: 'CIF-01',
    name: 'Proveedores de Servicio de Nube',
    category: 'Ciberseguridad en Infrastructura',
    domainCode: 'CIF',
    description:
      'Gestiona la seguridad en entornos de nube pública, privada e híbrida.',
    xpos: 4,
    ypos: 3,
    number: 11,
  },
  {
    code: 'CIF-02',
    name: 'Inventario de Activos',
    category: 'Ciberseguridad en Infrastructura',
    domainCode: 'CIF',
    description:
      'Mantiene un registro actualizado de todos los activos tecnológicos.',
    xpos: 4,
    ypos: 4,
    number: 12,
  },
  {
    code: 'CIF-03',
    name: 'Ciberseguridad en la Red y Sistemas',
    category: 'Ciberseguridad en Infrastructura',
    domainCode: 'CIF',
    description:
      'Implementa controles de seguridad en la infraestructura de red.',
    xpos: 4,
    ypos: 5,
    number: 13,
  },
  {
    code: 'CIF-04',
    name: 'Cifrado de Información y Datos',
    category: 'Ciberseguridad en Infrastructura',
    domainCode: 'CIF',
    description:
      'Protege la confidencialidad de datos mediante cifrado en reposo y tránsito.',
    xpos: 4,
    ypos: 6,
    number: 14,
  },
  {
    code: 'CIF-05',
    name: 'Administración y Gestión de Claves',
    category: 'Ciberseguridad en Infrastructura',
    domainCode: 'CIF',
    description:
      'Gestiona el ciclo de vida de claves criptográficas de forma segura.',
    xpos: 4,
    ypos: 7,
    number: 15,
  },
  // Column 5 - THP (Ciberseguridad en Talento Humano y Proveedores) - 4 controles
  {
    code: 'THP-01',
    name: 'Capacitación y Entrenamiento de Ciberseguridad',
    category: 'Ciberseguridad en Talento Humano y Proveedores',
    domainCode: 'THP',
    description:
      'Desarrolla programas de concientización en ciberseguridad para el personal.',
    xpos: 5,
    ypos: 3,
    number: 16,
  },
  {
    code: 'THP-02',
    name: 'Trabajo Remoto',
    category: 'Ciberseguridad en Talento Humano y Proveedores',
    domainCode: 'THP',
    description:
      'Establece controles de seguridad para equipos de trabajo remoto.',
    xpos: 5,
    ypos: 4,
    number: 17,
  },
  {
    code: 'THP-03',
    name: 'Inventario de la Cadena de Suministro',
    category: 'Ciberseguridad en Talento Humano y Proveedores',
    domainCode: 'THP',
    description:
      'Identifica y documenta todos los proveedores y terceros con acceso a sistemas.',
    xpos: 5,
    ypos: 5,
    number: 18,
  },
  {
    code: 'THP-04',
    name: 'Modelo de Responsabilidad Compartida en la Cadena de Suministro',
    category: 'Ciberseguridad en Talento Humano y Proveedores',
    domainCode: 'THP',
    description:
      'Define claramente las responsabilidades de seguridad con proveedores.',
    xpos: 5,
    ypos: 6,
    number: 19,
  },
  // Column 6 - CIP (Ciberseguridad en Identidad y Puntos Finales) - 6 controles
  {
    code: 'CIP-01',
    name: 'Inventario de Identidad',
    category: 'Ciberseguridad en Identidad y Puntos Finales',
    domainCode: 'CIP',
    description:
      'Mantiene un registro de todas las identidades digitales en la organización.',
    xpos: 6,
    ypos: 3,
    number: 20,
  },
  {
    code: 'CIP-02',
    name: 'Ciberseguridad en Autenticación',
    category: 'Ciberseguridad en Identidad y Puntos Finales',
    domainCode: 'CIP',
    description: 'Implementa mecanismos robustos de autenticación multifactor.',
    xpos: 6,
    ypos: 4,
    number: 21,
  },
  {
    code: 'CIP-03',
    name: 'Ciberseguridad en Autorización',
    category: 'Ciberseguridad en Identidad y Puntos Finales',
    domainCode: 'CIP',
    description:
      'Aplica el principio de menor privilegio en el acceso a recursos.',
    xpos: 6,
    ypos: 5,
    number: 22,
  },
  {
    code: 'CIP-04',
    name: 'Aprovisionamiento, cambios y desaprovisionamiento de identidades',
    category: 'Ciberseguridad en Identidad y Puntos Finales',
    domainCode: 'CIP',
    description:
      'Gestiona el ciclo de vida completo de las identidades digitales.',
    xpos: 6,
    ypos: 6,
    number: 23,
  },
  {
    code: 'CIP-05',
    name: 'Inventario de puntos finales',
    category: 'Ciberseguridad en Identidad y Puntos Finales',
    domainCode: 'CIP',
    description:
      'Mantiene un registro actualizado de todos los dispositivos finales.',
    xpos: 6,
    ypos: 7,
    number: 24,
  },
  {
    code: 'CIP-06',
    name: 'Ciberseguridad en Puntos Finales',
    category: 'Ciberseguridad en Identidad y Puntos Finales',
    domainCode: 'CIP',
    description:
      'Protege dispositivos finales contra malware y accesos no autorizados.',
    xpos: 6,
    ypos: 8,
    number: 25,
  },
  // Column 7 - ADR (Análisis, Detección y Respuesta) - 4 controles
  {
    code: 'ADR-01',
    name: 'Protección contra Aplicaciones Maliciosas',
    category: 'Análisis, Detección y Respuesta de Ciberseguridad',
    domainCode: 'ADR',
    description:
      'Implementa soluciones antimalware y de protección contra amenazas.',
    xpos: 7,
    ypos: 3,
    number: 26,
  },
  {
    code: 'ADR-02',
    name: 'Gestión, Identificación y Remediación de Vulnerabilidades',
    category: 'Análisis, Detección y Respuesta de Ciberseguridad',
    domainCode: 'ADR',
    description: 'Identifica y corrige vulnerabilidades de forma proactiva.',
    xpos: 7,
    ypos: 4,
    number: 27,
  },
  {
    code: 'ADR-03',
    name: 'Retención y Monitoreo de Registros',
    category: 'Análisis, Detección y Respuesta de Ciberseguridad',
    domainCode: 'ADR',
    description:
      'Recopila y analiza logs para detectar actividades sospechosas.',
    xpos: 7,
    ypos: 5,
    number: 28,
  },
  {
    code: 'ADR-04',
    name: 'Atención de Eventos y/o Incidentes de Ciberseguridad',
    category: 'Análisis, Detección y Respuesta de Ciberseguridad',
    domainCode: 'ADR',
    description: 'Establece un proceso de respuesta a incidentes de seguridad.',
    xpos: 7,
    ypos: 6,
    number: 29,
  },
  // Column 8 - DIA (Ciberseguridad en Datos e IA) - 7 controles
  {
    code: 'DIA-01',
    name: 'Inventario de Datos',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description:
      'Identifica y clasifica todos los datos sensibles de la organización.',
    xpos: 8,
    ypos: 3,
    number: 30,
  },
  {
    code: 'DIA-02',
    name: 'Inventario de Puntos de Recolección de Datos',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description: 'Mapea todos los puntos donde se recopilan datos de usuarios.',
    xpos: 8,
    ypos: 4,
    number: 31,
  },
  {
    code: 'DIA-03',
    name: 'Ciclo de Vida de los Datos',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description:
      'Gestiona los datos desde su creación hasta su eliminación segura.',
    xpos: 8,
    ypos: 5,
    number: 32,
  },
  {
    code: 'DIA-04',
    name: 'Ciberseguridad en Información y Datos',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description:
      'Implementa controles para proteger la confidencialidad e integridad de los datos.',
    xpos: 8,
    ypos: 6,
    number: 33,
  },
  {
    code: 'DIA-05',
    name: 'Tiempo de Retención de Datos y Derecho al Olvido',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description:
      'Define políticas de retención y procedimientos para el derecho al olvido.',
    xpos: 8,
    ypos: 7,
    number: 34,
  },
  {
    code: 'DIA-06',
    name: 'Ubicación de Información y Datos',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description:
      'Controla la ubicación geográfica donde se almacenan los datos.',
    xpos: 8,
    ypos: 8,
    number: 35,
  },
  {
    code: 'DIA-07',
    name: 'Ciberseguridad en Modelos de Inteligencia Artificial',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description:
      'Asegura los modelos de IA contra ataques de envenenamiento y adversarios.',
    xpos: 8,
    ypos: 9,
    number: 36,
  },
  // Special H elements - Row 10
  {
    code: 'COR-H',
    name: 'Elemento H - Coherencia Organizacional',
    category: 'Coherencia Organizacional',
    domainCode: 'COR',
    description: 'Elemento especial de referencia para el dominio COR',
    xpos: 1,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
  {
    code: 'CAP-H',
    name: 'Elemento H - Ciberseguridad en Aplicaciones',
    category: 'Ciberseguridad en Aplicaciones',
    domainCode: 'CAP',
    description: 'Elemento especial de referencia para el dominio CAP',
    xpos: 2,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
  {
    code: 'CCN-H',
    name: 'Elemento H - Continuidad y Cambios del Negocio',
    category: 'Continuidad y Cambios del Negocio',
    domainCode: 'CCN',
    description: 'Elemento especial de referencia para el dominio CCN',
    xpos: 3,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
  {
    code: 'CIF-H',
    name: 'Elemento H - Ciberseguridad en Infrastructura',
    category: 'Ciberseguridad en Infrastructura',
    domainCode: 'CIF',
    description: 'Elemento especial de referencia para el dominio CIF',
    xpos: 4,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
  {
    code: 'THP-H',
    name: 'Elemento H - Ciberseguridad en Talento Humano y Proveedores',
    category: 'Ciberseguridad en Talento Humano y Proveedores',
    domainCode: 'THP',
    description: 'Elemento especial de referencia para el dominio THP',
    xpos: 5,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
  {
    code: 'CIP-H',
    name: 'Elemento H - Ciberseguridad en Identidad y Puntos Finales',
    category: 'Ciberseguridad en Identidad y Puntos Finales',
    domainCode: 'CIP',
    description: 'Elemento especial de referencia para el dominio CIP',
    xpos: 6,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
  {
    code: 'ADR-H',
    name: 'Elemento H - Análisis, Detección y Respuesta de Ciberseguridad',
    category: 'Análisis, Detección y Respuesta de Ciberseguridad',
    domainCode: 'ADR',
    description: 'Elemento especial de referencia para el dominio ADR',
    xpos: 7,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
  {
    code: 'DIA-H',
    name: 'Elemento H - Ciberseguridad en Datos e Inteligencia Artificial',
    category: 'Ciberseguridad en Datos e Inteligencia Artificial',
    domainCode: 'DIA',
    description: 'Elemento especial de referencia para el dominio DIA',
    xpos: 8,
    ypos: 10,
    number: null,
    isSpecial: true,
  },
];

// Helper function to get domain by code
export function getDomainByCode(code: string): Domain | undefined {
  return domains.find((d) => d.code === code);
}

// Helper function to get elements by domain
export function getElementsByDomain(domainCode: string): FrameworkElement[] {
  return frameworkElements.filter((e) => e.domainCode === domainCode);
}
