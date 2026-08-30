export interface ComparisonItem {
  id: string;
  title: string;
  definition: string;
  example: string;
  whenToUse: string;
  risk: string;
  color: string;
}

export const roleComparison: ComparisonItem[] = [
  {
    id: 'fijo',
    title: 'Roles fijos del sistema',
    definition:
      'Vienen predefinidos por la plataforma, con un conjunto de permisos que no se puede editar (ej. Admin, Editor, Lector).',
    example: '"Editor" siempre puede crear y modificar contenido, en cualquier cuenta que lo use.',
    whenToUse: 'Casos genéricos y comunes a todos los clientes, donde no hace falta granularidad extra.',
    risk: 'Poca flexibilidad: si el negocio necesita un permiso a medio camino entre dos roles, no existe.',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'custom',
    title: 'Roles personalizados (custom)',
    definition:
      'Los define el propio negocio combinando permisos específicos y agrupándolos en un rol a medida.',
    example: '"Auditor de Finanzas": solo lectura sobre reportes financieros, sin acceso a ningún otro módulo.',
    whenToUse: 'Cuando distintos equipos necesitan combinaciones de permisos muy específicas.',
    risk: 'Requiere más gestión: hay que mantener y auditar los roles a medida que el negocio cambia.',
    color: 'text-purple-600 dark:text-purple-400',
  },
];

export const authComparison: ComparisonItem[] = [
  {
    id: 'api',
    title: 'Autenticación por API',
    definition:
      'Una aplicación o servicio se identifica ante el servidor con una API Key o un Bearer Token en cada petición HTTP.',
    example: 'Una app interna consulta un endpoint enviando "Authorization: Bearer <token>".',
    whenToUse: 'Integraciones entre sistemas, apps propias, o cuando el cliente es un servicio conocido.',
    risk: 'Si la credencial se filtra, funciona para cualquiera que la tenga hasta que se revoque.',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'mcp',
    title: 'Autenticación por MCP',
    definition:
      'Un agente de IA se conecta a un servidor MCP (Model Context Protocol); la persona usuaria aprueba esa conexión y el servidor valida el token asociado en cada uso.',
    example: 'Un asistente de IA usa una herramienta MCP para leer reportes, actuando en nombre de la persona que lo autorizó.',
    whenToUse: 'Cuando un agente de IA necesita actuar en nombre de una persona sobre sistemas internos.',
    risk: 'El agente hereda los permisos de quien lo autorizó: hay que limitar bien el alcance de esa autorización.',
    color: 'text-amber-600 dark:text-amber-400',
  },
];
