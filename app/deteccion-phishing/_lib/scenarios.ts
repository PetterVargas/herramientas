export interface PhishingScenario {
  id: number;
  channel: 'email' | 'sms';
  from: string;
  subject?: string;
  body: string;
  isPhishing: boolean;
  explanation: string;
  signals: string[];
}

export const scenarios: PhishingScenario[] = [
  {
    id: 1,
    channel: 'email',
    from: 'Seguridad BancoNacional <soporte@banconacional-verificacion.com>',
    subject: 'URGENTE: Tu cuenta será suspendida en 24 horas',
    body: 'Estimado cliente,\n\nHemos detectado actividad inusual en tu cuenta. Para evitar la suspensión permanente, verifica tus datos de inmediato haciendo clic en el siguiente enlace:\n\nhttp://banconacional-verificacion.com/confirmar\n\nSi no verificas en 24 horas, tu cuenta será bloqueada.\n\nAtentamente,\nDepartamento de Seguridad',
    isPhishing: true,
    explanation:
      'Es phishing: el dominio no es el del banco real, usa urgencia y amenaza para presionar, y pide "verificar datos" a través de un enlace.',
    signals: [
      'Dominio del remitente distinto al oficial del banco ("banconacional-verificacion.com")',
      'Urgencia y amenaza de bloqueo en 24 horas',
      'Saludo genérico ("Estimado cliente")',
      'Enlace que pide ingresar datos sensibles',
    ],
  },
  {
    id: 2,
    channel: 'email',
    from: 'Promociones Internacionales <premios@loteria-mundial-oficial.net>',
    subject: '¡FELICIDADES! Has ganado $50,000 USD',
    body: 'Estimado ganador,\n\nTu correo fue seleccionado al azar en nuestro sorteo internacional. Para reclamar tu premio de $50,000 USD, responde con tu nombre completo, número de identificación y una copia de tu pasaporte.\n\nEl premio debe reclamarse en las próximas 48 horas.',
    isPhishing: true,
    explanation:
      'Es phishing: nunca participaste en un sorteo, piden documentos de identidad por correo y usan la urgencia de un plazo corto.',
    signals: [
      'Premio inesperado sin haber participado en ningún sorteo',
      'Solicitud de documentos de identidad sensibles',
      'Plazo artificial de 48 horas para generar presión',
      'Dominio genérico no asociado a una organización verificable',
    ],
  },
  {
    id: 3,
    channel: 'email',
    from: 'Soporte Técnico <support@microsoft-alerts-security.com>',
    subject: 'Tu computadora tiene 3 virus detectados',
    body: 'Hemos detectado actividad de malware en tu equipo asociado a esta cuenta de correo. Llama de inmediato a nuestro número de soporte gratuito +1-800-555-0134 y no apagues tu computadora, o podrías perder todos tus archivos.',
    isPhishing: true,
    explanation:
      'Es phishing: Microsoft no monitorea virus en tu PC por correo ni pide llamar a un número para "soporte". Es una táctica clásica de soporte técnico falso.',
    signals: [
      'Microsoft no detecta ni notifica virus por correo electrónico',
      'Presión para llamar de inmediato a un número telefónico',
      'Amenaza de pérdida de archivos si no actúas ya',
      'Dominio no oficial de Microsoft',
    ],
  },
  {
    id: 4,
    channel: 'email',
    from: 'Roberto Díaz (Gerente General) <r.diaz.gerencia@gmail.com>',
    subject: 'Necesito un favor urgente y confidencial',
    body: 'Hola,\n\nEstoy en una reunión y no puedo hablar por teléfono. Necesito que hagas una transferencia urgente a un proveedor antes de que cierre el banco. Es confidencial, no lo comentes con nadie del equipo. Te paso los datos bancarios en un momento, confírmame que puedes hacerlo ahora.\n\nGracias,\nRoberto',
    isPhishing: true,
    explanation:
      'Es phishing (fraude del CEO / Business Email Compromise): el "gerente" escribe desde una cuenta de Gmail personal, pide secrecía y urgencia para una transferencia, evitando cualquier verificación.',
    signals: [
      'Un ejecutivo real no usaría un Gmail personal para instrucciones financieras',
      'Pide confidencialidad para evitar que alguien verifique la solicitud',
      'Urgencia artificial ("antes de que cierre el banco")',
      'Solicitud de transferencia sin los canales de aprobación habituales',
    ],
  },
  {
    id: 5,
    channel: 'sms',
    from: '+1 (809) 555-0142',
    body: 'DHL: Tu paquete no pudo ser entregado por falta de pago de arancel ($1.99). Paga aquí para reprogramar la entrega: http://dhl-envios-track.info/pago',
    isPhishing: true,
    explanation:
      'Es phishing (smishing): DHL no cobra aranceles vía SMS con enlaces acortados a dominios no oficiales. El monto bajo busca que pagues sin pensarlo dos veces.',
    signals: [
      'Dominio no oficial de DHL',
      'Cobro de un monto pequeño para reducir la sospecha',
      'Enlace corto/sospechoso en un SMS no solicitado',
      'Presión de tiempo para "reprogramar" la entrega',
    ],
  },
  {
    id: 6,
    channel: 'sms',
    from: 'BancoNacional',
    body: 'Tu código de verificación es 482913. No lo compartas con nadie, ni siquiera con personal del banco. Válido por 5 minutos.',
    isPhishing: false,
    explanation:
      'Es un mensaje legítimo: es un código de un solo uso (OTP) para autenticación, no contiene enlaces, no pide datos y advierte explícitamente no compartirlo.',
    signals: [
      'No contiene enlaces ni solicita información',
      'Advierte no compartir el código, incluso con "el banco"',
      'Tiene un tiempo de validez limitado, propio de un 2FA real',
    ],
  },
  {
    id: 7,
    channel: 'email',
    from: 'Cuenta Netflix <info@account.netflix.com>',
    subject: 'Restablece tu contraseña',
    body: 'Hola María,\n\nRecibimos una solicitud para restablecer la contraseña de tu cuenta. Si fuiste tú, haz clic en "Restablecer contraseña" desde la app o entra directamente a netflix.com/tu-cuenta. Si no solicitaste este cambio, puedes ignorar este mensaje de forma segura.\n\nEl equipo de Netflix',
    isPhishing: false,
    explanation:
      'Es legítimo: usa tu nombre real, el dominio coincide con el oficial de Netflix, no amenaza ni presiona, y te invita a ir directamente al sitio en vez de hacer clic ciegamente en un enlace.',
    signals: [
      'Saludo personalizado con tu nombre',
      'Dominio verificado y consistente con el servicio',
      'No hay amenazas ni plazos límite',
      'Sugiere ir directamente al sitio oficial en vez de un enlace',
    ],
  },
  {
    id: 8,
    channel: 'email',
    from: 'Boletín DivisionCero <noreply@divisioncero.com>',
    subject: 'Tu suscripción ha sido confirmada',
    body: 'Hola,\n\nGracias por suscribirte a nuestro boletín de ciberseguridad. Recibirás contenido cada semana. Puedes darte de baja en cualquier momento desde el enlace al final de este correo.\n\nSaludos,\nEquipo de DivisionCero',
    isPhishing: false,
    explanation:
      'Es legítimo: confirma una acción que probablemente hiciste tú mismo (suscribirte), no pide datos ni dinero, y ofrece una opción clara de darte de baja.',
    signals: [
      'Confirma una acción esperada por el usuario',
      'No solicita información sensible ni pagos',
      'Ofrece una opción legítima para darse de baja',
    ],
  },
  {
    id: 9,
    channel: 'email',
    from: 'Recursos Humanos <rrhh@tuempresa-corp.com>',
    subject: 'Revisión de desempeño anual - Adjunto confidencial',
    body: 'Hola equipo,\n\nAdjunto el documento de evaluación de desempeño de este trimestre, según lo discutido en la reunión del lunes. Por favor revísenlo antes del viernes.\n\nArchivo adjunto: Evaluacion_Q3_2026.xlsm (habilitar macros para ver el contenido)\n\nSaludos,\nRRHH',
    isPhishing: true,
    explanation:
      'Es phishing dirigido (spear phishing): referencia detalles reales para parecer creíble, pero pide "habilitar macros" en un archivo .xlsm, una técnica clásica para ejecutar malware.',
    signals: [
      'Pide habilitar macros en un archivo adjunto, técnica común de malware',
      'Extensión .xlsm poco habitual para un documento de RRHH',
      'Usa contexto real (reunión, trimestre) para ganar confianza',
    ],
  },
  {
    id: 10,
    channel: 'sms',
    from: '+52 55 1234 5678',
    body: 'Hola, soy Carlos de logística. ¿Puedes confirmarme tu domicilio completo y tu INE para completar la entrega de hoy? Gracias',
    isPhishing: true,
    explanation:
      'Es phishing: una empresa de logística legítima no solicita tu identificación oficial (INE) por SMS de un número personal para "confirmar una entrega".',
    signals: [
      'Solicita un documento de identidad oficial por SMS',
      'Número de teléfono personal, no un canal corporativo verificado',
      'No hay forma de confirmar que "Carlos" trabaja realmente para la empresa',
    ],
  },
];
