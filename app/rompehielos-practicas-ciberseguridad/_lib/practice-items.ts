export type PracticeCategory =
  | 'dispositivos'
  | 'contrasenas'
  | 'red'
  | 'correo'
  | 'fisica'
  | 'colaboracion';

export interface PracticeItem {
  id: number;
  category: PracticeCategory;
  verdict: 'buena' | 'mala';
  statement: string;
  explanation: string;
}

export const practiceItems: PracticeItem[] = [
  // Dispositivos
  {
    id: 1,
    category: 'dispositivos',
    verdict: 'mala',
    statement:
      'Alguien encuentra un cable o memoria USB en la sala de reuniones y lo conecta a su laptop de trabajo para ver de quién es.',
    explanation:
      'Un USB de origen desconocido puede contener malware que infecta el equipo apenas se conecta (BadUSB). Nunca se debe conectar hardware desconocido.',
  },
  {
    id: 2,
    category: 'dispositivos',
    verdict: 'buena',
    statement:
      'El equipo activa el bloqueo automático de pantalla tras pocos minutos de inactividad en todos los laptops.',
    explanation:
      'Reduce la ventana de exposición si alguien se aleja de su puesto sin bloquear manualmente el equipo.',
  },
  {
    id: 3,
    category: 'dispositivos',
    verdict: 'mala',
    statement:
      'Un integrante instala software pirata en su equipo de trabajo para ahorrar en licencias.',
    explanation:
      'El software de fuentes no oficiales suele venir modificado con malware y compromete todo el equipo y la red corporativa.',
  },
  {
    id: 4,
    category: 'dispositivos',
    verdict: 'buena',
    statement:
      'El equipo mantiene el sistema operativo y las aplicaciones con actualizaciones automáticas activadas.',
    explanation:
      'Las actualizaciones incluyen parches de seguridad que cierran vulnerabilidades ya conocidas y explotadas activamente.',
  },
  {
    id: 5,
    category: 'dispositivos',
    verdict: 'mala',
    statement: 'Se presta la laptop corporativa a un familiar para usarla durante el fin de semana.',
    explanation:
      'Expone datos y accesos corporativos a una persona sin autorización ni responsabilidad sobre la información de la empresa.',
  },

  // Contraseñas
  {
    id: 6,
    category: 'contrasenas',
    verdict: 'mala',
    statement: 'Todo el equipo usa la misma contraseña compartida para el panel de administración del servidor.',
    explanation:
      'Sin credenciales individuales no hay trazabilidad de quién hizo qué, y si se filtra, compromete el acceso de todos a la vez.',
  },
  {
    id: 7,
    category: 'contrasenas',
    verdict: 'buena',
    statement:
      'El equipo usa un gestor de contraseñas compartido con acceso auditado para las credenciales del proyecto.',
    explanation:
      'Permite rotar credenciales, otorgar o revocar acceso individualmente y mantener un registro de quién las usa.',
  },
  {
    id: 8,
    category: 'contrasenas',
    verdict: 'mala',
    statement:
      'Un desarrollador deja las credenciales de la base de datos escritas directamente en el código que sube al repositorio.',
    explanation:
      'Quedan expuestas en el historial de Git para siempre, incluso si luego se eliminan del archivo actual.',
  },
  {
    id: 9,
    category: 'contrasenas',
    verdict: 'buena',
    statement: 'El equipo activa autenticación multifactor (MFA) en todas las cuentas corporativas críticas.',
    explanation:
      'Aunque una contraseña se filtre, el segundo factor evita que un atacante pueda acceder a la cuenta.',
  },
  {
    id: 10,
    category: 'contrasenas',
    verdict: 'mala',
    statement: 'Alguien reutiliza la contraseña de su correo corporativo en una herramienta externa de terceros.',
    explanation:
      'Si esa herramienta externa sufre una filtración, la misma contraseña queda expuesta para acceder al correo corporativo.',
  },

  // Red y Wi-Fi
  {
    id: 11,
    category: 'red',
    verdict: 'mala',
    statement:
      'Alguien conecta su laptop de trabajo al wifi abierto de una cafetería para revisar el correo, sin usar VPN.',
    explanation:
      'En una red pública sin cifrar, el tráfico puede ser interceptado por cualquiera conectado a la misma red.',
  },
  {
    id: 12,
    category: 'red',
    verdict: 'buena',
    statement: 'El equipo exige usar la VPN corporativa siempre que se trabaje desde una red wifi pública.',
    explanation: 'La VPN cifra el tráfico y evita que terceros en la misma red intercepten información sensible.',
  },
  {
    id: 13,
    category: 'red',
    verdict: 'mala',
    statement: 'Se deja el router de la oficina con el usuario y la contraseña de administración por defecto.',
    explanation:
      'Las credenciales de fábrica son públicas y conocidas; cualquiera en la red podría tomar control del router.',
  },
  {
    id: 14,
    category: 'red',
    verdict: 'buena',
    statement: 'El equipo separa la red de invitados de la red interna donde están los servidores y equipos de trabajo.',
    explanation:
      'Aísla a los visitantes de los sistemas críticos, así un dispositivo comprometido de un invitado no llega a la red interna.',
  },

  // Correo y phishing
  {
    id: 15,
    category: 'correo',
    verdict: 'mala',
    statement:
      'Un integrante hace clic en un enlace de un correo urgente de "IT" pidiendo confirmar su contraseña, sin verificar el remitente.',
    explanation:
      'Es un patrón clásico de phishing: urgencia, solicitud de credenciales y un remitente que aparenta ser confiable.',
  },
  {
    id: 16,
    category: 'correo',
    verdict: 'buena',
    statement: 'El equipo reporta a seguridad cualquier correo sospechoso antes de interactuar con él.',
    explanation:
      'Permite bloquear la campaña de phishing para el resto de la organización antes de que más personas caigan en ella.',
  },
  {
    id: 17,
    category: 'correo',
    verdict: 'mala',
    statement:
      'Se responde con archivos adjuntos de trabajo a un remitente desconocido que dice ser un "proveedor nuevo", sin confirmar por otro canal.',
    explanation:
      'Sin verificar la identidad por un canal distinto, es fácil caer en suplantación de proveedores para robar información.',
  },
  {
    id: 18,
    category: 'correo',
    verdict: 'buena',
    statement:
      'Antes de aprobar una transferencia o un cambio de datos bancarios, el equipo confirma la solicitud por un canal distinto al correo.',
    explanation:
      'Previene el fraude de compromiso de correo corporativo (BEC), donde un atacante suplanta a un proveedor o directivo por correo.',
  },

  // Seguridad física
  {
    id: 19,
    category: 'fisica',
    verdict: 'mala',
    statement:
      'En una videollamada se comparte por error una pantalla con credenciales de prueba y diagramas de arquitectura visibles.',
    explanation:
      'Cualquier participante externo a la llamada puede capturar esa información sensible con una simple captura de pantalla.',
  },
  {
    id: 20,
    category: 'fisica',
    verdict: 'buena',
    statement:
      'El equipo aplica una política de "escritorio limpio": nada con información sensible queda a la vista al terminar la jornada.',
    explanation: 'Evita que visitantes o personal no autorizado vean o fotografíen documentos confidenciales.',
  },
  {
    id: 21,
    category: 'fisica',
    verdict: 'mala',
    statement: 'Alguien sostiene la puerta de acceso a la oficina para que entre una persona sin gafete visible.',
    explanation:
      'Es la técnica de "tailgating": permite que alguien no autorizado entre a instalaciones restringidas sin ser verificado.',
  },
  {
    id: 22,
    category: 'fisica',
    verdict: 'buena',
    statement: 'El equipo verifica la identidad de los visitantes y los acompaña siempre dentro de zonas restringidas.',
    explanation: 'Reduce el riesgo de que alguien no autorizado acceda a áreas o equipos sensibles sin supervisión.',
  },
  {
    id: 23,
    category: 'fisica',
    verdict: 'mala',
    statement: 'Se desecha en la basura normal un documento impreso con datos de clientes en vez de triturarlo.',
    explanation: 'Cualquiera con acceso a la basura podría recuperar información confidencial de clientes.',
  },

  // Colaboración y procesos
  {
    id: 24,
    category: 'colaboracion',
    verdict: 'mala',
    statement: 'El equipo comparte los archivos de un proyecto sensible con un enlace público "para que sea más rápido".',
    explanation: 'Cualquiera con el enlace puede acceder, sin control de quién lo vio, descargó o reenvió.',
  },
  {
    id: 25,
    category: 'colaboracion',
    verdict: 'buena',
    statement: 'El equipo revisa los permisos de acceso a repositorios y carpetas compartidas cada cierto tiempo.',
    explanation: 'Detecta y elimina accesos que ya no deberían existir, reduciendo la superficie de ataque.',
  },
  {
    id: 26,
    category: 'colaboracion',
    verdict: 'mala',
    statement: 'Un desarrollador despliega a producción directamente, sin pasar por revisión de código ni por el pipeline de seguridad.',
    explanation: 'Se saltan controles que detectan vulnerabilidades, credenciales expuestas o errores antes de llegar a producción.',
  },
  {
    id: 27,
    category: 'colaboracion',
    verdict: 'buena',
    statement: 'El equipo realiza simulacros de phishing e incidentes de seguridad de forma periódica.',
    explanation: 'Entrena la capacidad de detección y respuesta del equipo en un entorno controlado, antes de un incidente real.',
  },
  {
    id: 28,
    category: 'colaboracion',
    verdict: 'mala',
    statement: 'Se ignora una alerta de seguridad automatizada porque "seguro es un falso positivo", sin investigarla.',
    explanation: 'Descartar alertas sin revisarlas puede dejar pasar un incidente real que ya está en curso.',
  },
  {
    id: 29,
    category: 'colaboracion',
    verdict: 'buena',
    statement: 'Cuando alguien deja el equipo o cambia de rol, sus accesos se revocan el mismo día.',
    explanation: 'Evita cuentas huérfanas con acceso activo que nadie está monitoreando.',
  },
  {
    id: 30,
    category: 'colaboracion',
    verdict: 'buena',
    statement: 'El equipo documenta y practica un plan de respuesta a incidentes antes de que ocurra uno real.',
    explanation: 'Permite reaccionar con roles y pasos claros bajo presión, en vez de improvisar durante una crisis.',
  },
];
