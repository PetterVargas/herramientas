export interface InboxLink {
  text: string;
  href: string;
}

export interface InboxEmail {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  link?: InboxLink;
  isSafe: boolean;
  reasons: string[];
}

export const emails: InboxEmail[] = [
  {
    id: 1,
    senderName: 'Cuenta Spotify',
    senderEmail: 'no-responder@spotify.com',
    subject: 'Restablece tu contraseña',
    preview: 'Recibimos una solicitud para cambiar tu contraseña...',
    body: 'Hola Ana,\n\nRecibimos una solicitud para cambiar tu contraseña. Si fuiste tú, usa el botón de abajo. Si no reconoces esta solicitud, ignora este correo, tu cuenta sigue segura.',
    link: { text: 'Restablecer contraseña', href: 'https://accounts.spotify.com/es/reset' },
    isSafe: true,
    reasons: [
      'El dominio del remitente coincide exactamente con spotify.com',
      'El texto del enlace y su destino real coinciden y apuntan al dominio oficial',
      'Te llama por tu nombre y no amenaza con cerrar tu cuenta',
    ],
  },
  {
    id: 2,
    senderName: 'PayPal Soporte',
    senderEmail: 'billing@paypal-support-verify.com',
    subject: 'Factura pendiente de $349.00 USD',
    preview: 'Se ha generado un cargo en tu cuenta. Si no reconoces esta compra...',
    body: 'Estimado usuario,\n\nSe generó un cargo de $349.00 USD en tu cuenta. Si no reconoces esta compra, debes cancelar la transacción de inmediato haciendo clic en el enlace. De lo contrario, el cargo se procesará en 12 horas.',
    link: { text: 'Cancelar transacción', href: 'http://paypal-verify-account.ru/cancel' },
    isSafe: false,
    reasons: [
      'El dominio del remitente no es paypal.com, sino un dominio parecido ("paypal-support-verify.com")',
      'El enlace dice "Cancelar transacción" pero apunta a un dominio ruso no relacionado ("paypal-verify-account.ru")',
      'Usa un monto alto y un plazo corto para generar pánico',
      'Saludo genérico ("Estimado usuario")',
    ],
  },
  {
    id: 3,
    senderName: 'Laura Méndez',
    senderEmail: 'laura.mendez@tuempresa-corp.com',
    subject: 'Agenda: reunión de planeación - jueves 10am',
    preview: 'Hola equipo, les comparto la agenda para la reunión del jueves...',
    body: 'Hola equipo,\n\nLes comparto la agenda para la reunión de planeación del jueves a las 10am en la sala de juntas 2. Si tienen puntos adicionales, respóndanme antes del miércoles.\n\nSaludos,\nLaura',
    isSafe: true,
    reasons: [
      'El dominio del remitente coincide con el dominio corporativo real de la empresa',
      'No hay enlaces ni solicitudes de datos sensibles',
      'El contenido es coherente con una comunicación interna habitual',
    ],
  },
  {
    id: 4,
    senderName: 'Google Security',
    senderEmail: 'no-reply@gmail-security-alert.com',
    subject: 'Alerta: inicio de sesión sospechoso detectado',
    preview: 'Detectamos un inicio de sesión desde un dispositivo desconocido...',
    body: 'Detectamos un inicio de sesión sospechoso en tu cuenta desde Rusia. Si no fuiste tú, verifica tu identidad ahora mismo o tu cuenta será cerrada permanentemente en 1 hora.',
    link: { text: 'Verificar mi cuenta', href: 'http://gmail-account-verify.top/login' },
    isSafe: false,
    reasons: [
      'El dominio del remitente no es google.com ni accounts.google.com',
      'El enlace apunta a un dominio ".top" no relacionado con Google',
      'Amenaza de cierre de cuenta en 1 hora para generar pánico',
      'Google nunca pide "verificar identidad" con un enlace externo bajo amenaza',
    ],
  },
  {
    id: 5,
    senderName: 'Tienda Andina',
    senderEmail: 'pedidos@tiendaandina.com',
    subject: 'Tu pedido #48213 ha sido enviado',
    preview: 'Tu pedido va en camino. Número de guía: TA48213CL...',
    body: 'Hola Carlos,\n\nTu pedido #48213 ya fue despachado. Número de guía: TA48213CL. Puedes rastrearlo desde tu cuenta en cualquier momento.\n\nGracias por tu compra.',
    link: { text: 'Ver estado del pedido', href: 'https://tiendaandina.com/mi-cuenta/pedidos/48213' },
    isSafe: true,
    reasons: [
      'El dominio del remitente y del enlace coinciden con la tienda real',
      'No solicita pago adicional ni datos bancarios',
      'Hace referencia a un pedido concreto verificable en tu cuenta',
    ],
  },
  {
    id: 6,
    senderName: 'Netflix',
    senderEmail: 'billing@netfIix-payments.com',
    subject: 'Actualiza tu método de pago para seguir disfrutando',
    preview: 'No pudimos procesar tu pago. Actualiza tus datos para evitar...',
    body: 'No pudimos procesar tu último pago. Actualiza tu método de pago en las próximas 24 horas para evitar la suspensión de tu cuenta.',
    link: { text: 'Actualizar método de pago', href: 'http://netfIix-billing-update.com/pay' },
    isSafe: false,
    reasons: [
      'El dominio usa una "I" mayúscula en vez de una "l" minúscula para imitar "netflix"',
      'El enlace lleva a un dominio distinto al oficial (netflix.com)',
      'Presión de tiempo con amenaza de suspensión en 24 horas',
    ],
  },
  {
    id: 7,
    senderName: 'Recursos Humanos',
    senderEmail: 'beneficios@tuempresa-corp.com',
    subject: 'Recordatorio: inscripción a beneficios 2026',
    preview: 'Hola Sofía, te recordamos que tienes hasta el 15 de este mes...',
    body: 'Hola Sofía,\n\nTe recordamos que tienes hasta el día 15 de este mes para inscribirte a los beneficios de salud 2026 desde el portal interno de RRHH. Si ya lo hiciste, puedes ignorar este mensaje.\n\nSaludos,\nEquipo de RRHH',
    isSafe: true,
    reasons: [
      'Dominio corporativo real, consistente con otras comunicaciones internas',
      'Te dirige al portal interno en lugar de pedir datos por correo',
      'No hay amenazas ni urgencia desproporcionada',
    ],
  },
  {
    id: 8,
    senderName: 'Talento Global RH',
    senderEmail: 'reclutamiento.talentoglobal@outlook.com',
    subject: '¡Felicidades! Fuiste seleccionado para trabajar remoto',
    preview: 'Tras revisar tu perfil, fuiste preseleccionado para un puesto...',
    body: 'Fuiste preseleccionado para un puesto 100% remoto con salario de $2,500 USD/mes. Para iniciar el proceso, necesitamos que pagues $45 USD por el trámite de tu visa de trabajo. Responde con tus datos bancarios para procesar el reembolso junto con tu primer pago.',
    isSafe: false,
    reasons: [
      'Usa un correo gratuito (Outlook) en vez de un dominio corporativo propio',
      'Ninguna empresa legítima cobra a un candidato para "tramitar una visa"',
      'Pide datos bancarios por correo sin ningún proceso de contratación previo',
      'Oferta "demasiado buena" sin haber aplicado a ninguna vacante',
    ],
  },
];
