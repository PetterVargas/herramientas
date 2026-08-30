export type ImpersonationChannel =
  | 'instagram'
  | 'facebook'
  | 'whatsapp'
  | 'whatsapp-business'
  | 'website'
  | 'twitter'
  | 'linkedin'
  | 'tiktok'
  | 'marketplace';

export interface ImpersonationExample {
  id: number;
  channel: ImpersonationChannel;
  channelLabel: string;
  brandType: string;
  handle: string;
  title: string;
  mockup: string;
  signals: string[];
  howToVerify: string[];
}

export const examples: ImpersonationExample[] = [
  {
    id: 1,
    channel: 'instagram',
    channelLabel: 'Instagram',
    brandType: 'Marca de ropa deportiva',
    handle: '@nikee.oficial.co',
    title: 'Sorteo falso con "verificación" comprada',
    mockup:
      '🏆 ¡GANASTE UNAS ZAPATILLAS EDICIÓN LIMITADA! 🏆\nFuiste seleccionado entre nuestros seguidores. Para reclamar, paga solo el envío ($12.990) aquí: nike-premios-co.shop\n¡Solo por hoy!',
    signals: [
      'El nombre de usuario tiene una letra de más ("nikee") para parecerse al oficial',
      'La "verificación" azul puede comprarse en varias plataformas: no garantiza que sea la cuenta real',
      'Pide un pago por adelantado para "reclamar" algo que nunca ganaste',
      'El enlace no lleva al sitio oficial de la marca, sino a una tienda genérica',
    ],
    howToVerify: [
      'Busca la cuenta oficial desde el sitio web de la marca, no desde un enlace que te llegó',
      'Compara el número de publicaciones y la fecha de creación con la cuenta que ya conocías',
      'Ninguna marca seria pide un pago para entregar un premio de un sorteo',
    ],
  },
  {
    id: 2,
    channel: 'facebook',
    channelLabel: 'Facebook',
    brandType: 'Tienda de electrónica',
    handle: 'TecnoMundo Ofertas Oficial',
    title: 'Anuncio patrocinado con 90% de descuento',
    mockup:
      '📢 ANUNCIO · TecnoMundo Ofertas Oficial\n¡Liquidación total! Audífonos originales a $19.990 (antes $189.990). Últimas 6 unidades. Compra aquí: tecnomundo-liquidacion.store',
    signals: [
      'El descuento es exageradamente alto comparado con el precio real del producto',
      'La página se creó hace pocas semanas y tiene muy pocos seguidores para el tamaño que aparenta',
      'El dominio del anuncio no coincide con el sitio web oficial de la tienda',
      'Genera urgencia artificial ("últimas unidades") para evitar que lo pienses dos veces',
    ],
    howToVerify: [
      'Verifica el dominio del enlace antes de hacer clic: pásale el cursor por encima sin entrar',
      'Revisa la sección "Transparencia de la página" de Facebook: fecha de creación y país de administración',
      'Busca el producto directamente en el sitio web oficial de la marca',
    ],
  },
  {
    id: 3,
    channel: 'whatsapp',
    channelLabel: 'WhatsApp',
    brandType: 'Banco',
    handle: 'BancoNacional Seguridad',
    title: '"Confirmación" de una transferencia sospechosa',
    mockup:
      'BancoNacional: Detectamos una transferencia de $2.450.000 desde tu cuenta. Si no la reconoces, confirma tu identidad aquí: bnc-verificacion.app/confirmar\nSi no respondes en 15 min, la transacción se hará efectiva.',
    signals: [
      'Los bancos no usan WhatsApp para pedir que "confirmes tu identidad" con un enlace',
      'El dominio del enlace no es el del banco (termina en ".app", no en el dominio oficial)',
      'Presión de tiempo: "15 minutos" para que actúes sin verificar',
      'El número no está guardado como el contacto oficial verificado del banco',
    ],
    howToVerify: [
      'Llama al banco al número que aparece impreso en tu tarjeta, nunca al que te escribió',
      'Los bancos reales no piden claves, códigos OTP ni datos completos de tarjeta por chat',
      'Revisa tu app o página oficial del banco directamente, sin usar el enlace recibido',
    ],
  },
  {
    id: 4,
    channel: 'whatsapp-business',
    channelLabel: 'WhatsApp Business',
    brandType: 'Marca de tecnología',
    handle: 'Catálogo Oficial CompuTech',
    title: 'Catálogo con celulares a precio irrisorio',
    mockup:
      '🛒 Catálogo CompuTech\nCelular gama alta - $349.000 (antes $3.200.000)\nSolo pago por transferencia anticipada. Stock limitado, ¡escríbenos ya!',
    signals: [
      'El precio es una fracción mínima del valor real del producto',
      'Solo acepta transferencia bancaria directa, sin opción de pago contra entrega ni plataforma con protección al comprador',
      'El catálogo de WhatsApp Business puede crearlo cualquier persona: no certifica que sea la marca real',
      'No hay factura, garantía ni datos legales verificables de una empresa real',
    ],
    howToVerify: [
      'Desconfía de cualquier producto muy por debajo del precio de mercado',
      'Prefiere pagar contra entrega o por plataformas con protección al comprador',
      'Busca el número de WhatsApp en el sitio web oficial de la marca antes de comprar',
    ],
  },
  {
    id: 5,
    channel: 'website',
    channelLabel: 'Sitio web',
    brandType: 'Marketplace de comercio electrónico',
    handle: 'amaz0n-ofertas-hoy.com',
    title: 'Dominio "typosquatting" que imita a un marketplace conocido',
    mockup:
      'Barra de direcciones: amaz0n-ofertas-hoy.com\n"Bienvenido de nuevo" — Inicia sesión con tu correo y contraseña para continuar tu compra.',
    signals: [
      'El dominio reemplaza letras por números o agrega palabras ("amaz0n", "-ofertas-hoy")',
      'No usa el dominio oficial de la marca, aunque el diseño de la página se vea casi idéntico',
      'Pide iniciar sesión con tu cuenta real del marketplace en un sitio que no es el oficial',
      'El candado de "sitio seguro" (HTTPS) solo indica que la conexión está cifrada, no que el sitio sea confiable',
    ],
    howToVerify: [
      'Escribe tú mismo la dirección del sitio oficial en el navegador, en vez de hacer clic en enlaces recibidos',
      'Revisa letra por letra el dominio antes de ingresar cualquier dato',
      'Usa un gestor de contraseñas: no autocompletará tus datos en un dominio falso',
    ],
  },
  {
    id: 6,
    channel: 'twitter',
    channelLabel: 'X (Twitter)',
    brandType: 'Exchange de criptomonedas',
    handle: '@Soporte_CryptoX',
    title: 'Cuenta de "soporte" que responde quejas públicas',
    mockup:
      '@Soporte_CryptoX respondiendo a tu queja pública:\n"Lamentamos el inconveniente. Nuestro equipo de recuperación puede ayudarte, escríbenos a soporte-recuperacion.io con tu frase semilla para verificar tu wallet."',
    signals: [
      'Ninguna plataforma legítima pide tu frase semilla o clave privada, bajo ningún motivo',
      'La cuenta de "soporte" responde de forma pública y casi inmediata a quejas de otros usuarios',
      'El enlace lleva a un dominio distinto al oficial de la plataforma',
      'Se aprovecha de un momento de frustración real (una queja) para ganar confianza',
    ],
    howToVerify: [
      'Nunca compartas tu frase semilla o clave privada con nadie, ni siquiera con "soporte oficial"',
      'Contacta al soporte solo desde la app o el sitio web oficial de la plataforma',
      'Desconfía de cuentas de soporte que interactúan solo respondiendo quejas públicas de otros',
    ],
  },
  {
    id: 7,
    channel: 'linkedin',
    channelLabel: 'LinkedIn',
    brandType: 'Empresa multinacional',
    handle: 'Ana M. — Reclutadora Senior',
    title: 'Oferta de empleo remoto con "kit de bienvenida" pago',
    mockup:
      'Hola, vi tu perfil y encajas perfecto para una vacante remota con salario en USD. Antes de enviarte el contrato, debes adquirir el kit de equipo de trabajo por $89 USD, que la empresa te reembolsa en tu primer pago.',
    signals: [
      'Ninguna empresa real pide que el candidato pague por un "kit de bienvenida" o equipo de trabajo',
      'El proceso de selección se salta entrevistas, pruebas o pasos habituales de contratación',
      'El perfil del reclutador es reciente, con pocas conexiones o publicaciones',
      'Urge a decidir rápido para no "perder" la oportunidad',
    ],
    howToVerify: [
      'Busca la vacante directamente en la página oficial de empleo de la empresa',
      'Verifica al reclutador buscando su nombre junto al de la empresa en fuentes oficiales',
      'Ninguna oferta de empleo legítima requiere un pago del candidato',
    ],
  },
  {
    id: 8,
    channel: 'tiktok',
    channelLabel: 'TikTok',
    brandType: 'Marca de tecnología',
    handle: '@tecnostore.regalos',
    title: 'Regalo de producto a cambio de datos de tarjeta',
    mockup:
      '🎁 ¡Estamos regalando 5 tablets! Solo completa el formulario con tus datos y paga $9.990 de "verificación de envío" con tu tarjeta para reclamar tu premio.',
    signals: [
      'Pedir el número completo de la tarjeta para un "envío gratis" no tiene ningún sentido legítimo',
      'La cuenta no es la cuenta oficial verificada de la marca en la plataforma',
      'El formulario recolecta más datos de los necesarios para un supuesto envío',
      'Combina la emoción de "ganar algo" con presión de tiempo para bajar la guardia',
    ],
    howToVerify: [
      'Las marcas reales no piden el número de tarjeta para "verificar" un envío gratuito',
      'Confirma cualquier promoción desde las redes oficiales enlazadas en el sitio web de la marca',
      'Si piden datos de pago para algo "gratis", es una señal de alerta inmediata',
    ],
  },
  {
    id: 9,
    channel: 'website',
    channelLabel: 'Sitio web',
    brandType: 'Software antivirus',
    handle: 'alerta-seguridad-pc.net',
    title: 'Alerta falsa de virus con "soporte técnico" telefónico',
    mockup:
      '⚠️ ¡ALERTA! Se detectaron 5 virus en tu computador.\nNo cierres esta ventana. Llama de inmediato a Soporte Certificado: +1 800 555 0199',
    signals: [
      'Ningún sitio web puede "escanear" tu computador solo con que lo visites',
      'Usa alarmas visuales y sonoras para generar pánico inmediato',
      'Pide llamar a un número telefónico en vez de usar canales oficiales de soporte',
      'El dominio no pertenece a ninguna marca real de software antivirus',
    ],
    howToVerify: [
      'Cierra la pestaña del navegador sin llamar a ningún número ni hacer clic en botones de la alerta',
      'Ejecuta un análisis solo desde tu antivirus real instalado en el equipo',
      'El soporte técnico real de una marca se contacta desde su sitio web oficial, nunca al revés',
    ],
  },
  {
    id: 10,
    channel: 'marketplace',
    channelLabel: 'Facebook Marketplace',
    brandType: 'Tienda de tecnología',
    handle: 'TecnoMundo Liquidaciones',
    title: 'Vendedor con fotos robadas de una tienda real',
    mockup:
      'Vendo laptop nueva, sellada, $650.000 (precio de tienda: $2.100.000). Solo transferencia, no manejo pago contra entrega. Fotos: catálogo oficial de la tienda.',
    signals: [
      'Las fotos del producto son idénticas a las del catálogo oficial de una tienda real, copiadas sin permiso',
      'El perfil del vendedor es nuevo o tiene muy poca actividad previa',
      'Insiste en mover la conversación fuera de la plataforma y en cobrar solo por transferencia',
      'El precio está muy por debajo del valor real, sin ninguna explicación creíble',
    ],
    howToVerify: [
      'Busca la imagen del producto en un buscador para ver si aparece en otras publicaciones o sitios oficiales',
      'Prefiere vendedores con historial, calificaciones y varias publicaciones previas',
      'Usa siempre métodos de pago con protección al comprador cuando la plataforma lo permita',
    ],
  },
];
