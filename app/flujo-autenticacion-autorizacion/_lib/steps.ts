export type AuthMethod = 'api' | 'mcp';
export type RoleType = 'fijo' | 'custom';

export type FlowNodeId =
  | 'solicitud'
  | 'autenticacion'
  | 'rol'
  | 'autorizacion'
  | 'resultado'
  | 'auditoria';

export interface FlowStepItem {
  label: string;
  status: 'ok' | 'fail' | 'neutral';
}

export interface FlowStep {
  id: number;
  node: FlowNodeId;
  title: string;
  description: string;
  items: FlowStepItem[];
}

export const nodeLabels: Record<FlowNodeId, string> = {
  solicitud: 'Solicitud',
  autenticacion: 'Autenticación',
  rol: 'Identidad y rol',
  autorizacion: 'Autorización',
  resultado: 'Decisión',
  auditoria: 'Auditoría',
};

export function getSteps(authMethod: AuthMethod, roleType: RoleType): FlowStep[] {
  return [
    {
      id: 1,
      node: 'solicitud',
      title: 'Solicitud de acceso',
      description:
        authMethod === 'api'
          ? 'Una aplicación cliente envía una petición HTTP a la API, incluyendo una credencial (API Key o Bearer Token) en el encabezado Authorization.'
          : 'Un agente de IA (por ejemplo, un asistente conectado por Claude) invoca una herramienta o solicita un recurso a través de un servidor MCP.',
      items: [
        {
          label:
            authMethod === 'api'
              ? 'GET /reportes/financieros — Authorization: Bearer •••'
              : 'tool_call: obtener_reportes_financieros',
          status: 'neutral',
        },
      ],
    },
    {
      id: 2,
      node: 'autenticacion',
      title: 'Autenticación: ¿quién eres?',
      description:
        authMethod === 'api'
          ? 'El servidor valida la API Key o el token: revisa que exista, que no haya expirado y que no haya sido revocada.'
          : 'El servidor MCP valida el token OAuth (o de sesión) que la persona usuaria autorizó previamente para ese agente.',
      items: [
        {
          label: authMethod === 'api' ? 'API Key válida y vigente' : 'Token OAuth vigente y aprobado',
          status: 'ok',
        },
        {
          label: authMethod === 'api' ? 'Ejemplo de API Key revocada' : 'Ejemplo de token de sesión revocado',
          status: 'fail',
        },
      ],
    },
    {
      id: 3,
      node: 'rol',
      title: 'Identidad y rol asignado',
      description:
        roleType === 'fijo'
          ? 'La credencial pertenece a una cuenta con un rol fijo del catálogo del sistema: viene predefinido de fábrica y no puede modificarse.'
          : 'La credencial pertenece a una cuenta con un rol personalizado, creado por el negocio combinando permisos específicos a medida.',
      items:
        roleType === 'fijo'
          ? [
              { label: 'Rol: "Editor" (predefinido por el sistema)', status: 'neutral' },
              { label: 'Permisos fijos, iguales para todo Editor', status: 'neutral' },
            ]
          : [
              { label: 'Rol: "Auditor de Finanzas" (creado por el negocio)', status: 'neutral' },
              { label: 'Permisos combinados a medida para ese rol', status: 'neutral' },
            ],
    },
    {
      id: 4,
      node: 'autorizacion',
      title: 'Autorización: ¿qué puedes hacer?',
      description:
        'Se evalúan los permisos del rol contra la acción solicitada: ¿ese rol permite esta operación sobre este recurso específico?',
      items: [
        { label: 'Permiso: leer reportes financieros', status: 'ok' },
        { label: 'Permiso: eliminar reportes financieros', status: 'fail' },
      ],
    },
    {
      id: 5,
      node: 'resultado',
      title: 'Decisión de acceso',
      description:
        'Si el permiso existe, la acción se ejecuta y se entrega el recurso (200 OK). Si no existe, se rechaza sin exponer ningún dato (403 Forbidden).',
      items: [
        { label: 'Permitido → 200 OK, se entrega el recurso', status: 'ok' },
        { label: 'Denegado → 403 Forbidden, sin datos', status: 'fail' },
      ],
    },
    {
      id: 6,
      node: 'auditoria',
      title: 'Registro y auditoría',
      description:
        'Toda solicitud —autorizada o no— queda registrada: quién, cuándo, qué recurso y con qué resultado. Es clave para trazabilidad y cumplimiento.',
      items: [
        {
          label:
            authMethod === 'api'
              ? 'Log: usuario, API Key (id), endpoint, resultado'
              : 'Log: usuario, agente MCP, herramienta invocada, resultado',
          status: 'neutral',
        },
      ],
    },
  ];
}
