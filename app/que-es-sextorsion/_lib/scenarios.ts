import type { SextortionPhase } from './phases';

export interface SextortionScenario {
  id: number;
  text: string;
  isWarningSign: boolean;
  category?: SextortionPhase;
  explanation: string;
}

export const scenarios: SextortionScenario[] = [
  {
    id: 1,
    text: 'Conoces a alguien muy atractivo en línea que, en la misma noche, ya propone una videollamada íntima.',
    isWarningSign: true,
    category: 'contacto',
    explanation: 'La velocidad inusual para generar intimidad es una señal típica de perfiles usados para sextorsión.',
  },
  {
    id: 2,
    text: 'Una compañera de universidad que conoces en persona te invita a una videollamada grupal para trabajar en un proyecto.',
    isWarningSign: false,
    explanation: 'Es un contacto conocido, con un propósito claro y verificable, sin patrones de riesgo.',
  },
  {
    id: 3,
    text: 'Después de una videollamada íntima, la otra persona te envía una captura de pantalla tuya y pide dinero para no publicarla.',
    isWarningSign: true,
    category: 'amenaza',
    explanation: 'Es el inicio clásico de una extorsión: obtención de material seguido de una amenaza con exigencia económica.',
  },
  {
    id: 4,
    text: 'Recibes un mensaje de "soporte técnico" de tu banco pidiendo tu contraseña para "verificar tu cuenta".',
    isWarningSign: false,
    explanation: 'Es un intento de phishing, no de sextorsión: no involucra contenido íntimo ni las tácticas descritas aquí.',
  },
  {
    id: 5,
    text: 'Pagas la primera exigencia de un extorsionador y, dos días después, te pide el doble de dinero.',
    isWarningSign: true,
    category: 'escalada',
    explanation: 'Pagar no detiene la extorsión: confirma que la víctima cede, y el atacante casi siempre vuelve a pedir más.',
  },
  {
    id: 6,
    text: 'Un desconocido te envía una imagen que parece ser tuya en una situación íntima, pero tú nunca grabaste ni enviaste algo así.',
    isWarningSign: true,
    category: 'obtencion',
    explanation: 'Puede tratarse de una imagen falsa generada con inteligencia artificial (deepfake) a partir de tus fotos públicas.',
  },
  {
    id: 7,
    text: 'Cubres la cámara web de tu computador cuando no la estás usando.',
    isWarningSign: false,
    explanation: 'Es una buena práctica de prevención que reduce el riesgo de grabaciones no autorizadas.',
  },
  {
    id: 8,
    text: 'Alguien te amenaza con enviar una imagen tuya a toda tu lista de contactos en la próxima hora si no le pagas.',
    isWarningSign: true,
    category: 'amenaza',
    explanation: 'La urgencia y la amenaza de exposición masiva buscan que actúes por pánico en vez de pedir ayuda.',
  },
  {
    id: 9,
    text: 'Guardas capturas de pantalla de una conversación sospechosa antes de bloquear a la persona y denunciarla.',
    isWarningSign: false,
    explanation: 'Conservar evidencia antes de bloquear es exactamente la conducta recomendada para poder denunciar.',
  },
  {
    id: 10,
    text: 'Activas la verificación en dos pasos en tus redes sociales y correo electrónico.',
    isWarningSign: false,
    explanation: 'Es una medida de seguridad preventiva que dificulta el robo de cuentas usado para obtener material o contactos.',
  },
  {
    id: 11,
    text: 'Tras negarte a pagar, el extorsionador deja de escribir y no vuelve a contactarte.',
    isWarningSign: false,
    explanation: 'No ceder y denunciar suele ser efectivo: muchos atacantes buscan víctimas fáciles y abandonan si no hay reacción de pánico.',
  },
  {
    id: 12,
    text: 'Un contacto que agregaste hace una semana insiste en que borres el historial de la conversación "por seguridad de ambos".',
    isWarningSign: true,
    category: 'contacto',
    explanation: 'Pedir borrar evidencia es una táctica para evitar que la víctima pueda demostrar el chantaje después.',
  },
];
