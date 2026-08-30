import type { GroomingStage } from './stages';

export interface GroomingScenario {
  id: number;
  text: string;
  isWarningSign: boolean;
  category?: GroomingStage;
  explanation: string;
}

export const scenarios: GroomingScenario[] = [
  {
    id: 1,
    text: 'Un desconocido que conociste en un videojuego te pide que no le cuentes a tus papás que hablan por otra app.',
    isWarningSign: true,
    category: 'aislamiento',
    explanation:
      'Pedir secreto frente a los adultos de confianza es una de las señales más claras de grooming: busca que nadie pueda intervenir.',
  },
  {
    id: 2,
    text: 'Tu profesor de matemáticas crea un grupo de WhatsApp del curso, visible para todos los padres, para enviar las tareas.',
    isWarningSign: false,
    explanation:
      'Es un canal oficial, grupal y transparente para el colegio, sin secretismo ni contacto individual oculto: no corresponde a un patrón de grooming.',
  },
  {
    id: 3,
    text: 'Alguien que dice tener tu misma edad te ofrece regalos o saldo del celular a cambio de fotos.',
    isWarningSign: true,
    category: 'confianza',
    explanation:
      'Ofrecer regalos o dinero a cambio de fotos es una táctica común para generar compromiso y luego pedir cada vez más.',
  },
  {
    id: 4,
    text: 'Un familiar adulto te pide ayuda para elegir una tarjeta de cumpleaños para tu mamá, en una videollamada familiar.',
    isWarningSign: false,
    explanation: 'Es una interacción familiar normal, sin secretismo, sin contenido sexual ni intento de aislamiento.',
  },
  {
    id: 5,
    text: 'Una persona que conociste en línea te dice que eres la única que la entiende y que no hables con tus amigos de la relación.',
    isWarningSign: true,
    category: 'aislamiento',
    explanation:
      'Buscar aislar a la víctima de su red de apoyo (amigos, familia) es una táctica central del grooming para mantener el control.',
  },
  {
    id: 6,
    text: 'Un contacto en línea empieza enviando memes graciosos y, con el tiempo, empieza a enviar imágenes sexuales "para romper el hielo".',
    isWarningSign: true,
    category: 'control',
    explanation:
      'Introducir contenido sexual de forma gradual busca desensibilizar a la víctima y normalizar el siguiente paso.',
  },
  {
    id: 7,
    text: 'Recibes una solicitud de amistad de alguien desconocido con muy pocas fotos y ningún amigo en común, y la rechazas.',
    isWarningSign: false,
    explanation:
      'Rechazar solicitudes de desconocidos es justamente la conducta segura recomendada, no una señal de alerta en sí misma.',
  },
  {
    id: 8,
    text: 'Alguien en línea te amenaza con mostrarle una foto tuya a tus papás si no le envías otra más comprometedora.',
    isWarningSign: true,
    category: 'control',
    explanation:
      'El chantaje para obtener más material es la fase de control: nunca se debe ceder, y hay que buscar ayuda de inmediato.',
  },
  {
    id: 9,
    text: 'Un adulto desconocido en internet te dice que eres muy maduro/a para tu edad y que por eso puede contarte "cosas de adultos".',
    isWarningSign: true,
    category: 'confianza',
    explanation:
      'Halagar la "madurez" es una táctica típica para justificar conversaciones inapropiadas y ganar terreno emocional.',
  },
  {
    id: 10,
    text: 'Tu entrenador deportivo felicita a todo el equipo en el chat grupal por ganar el torneo.',
    isWarningSign: false,
    explanation: 'Es un reconocimiento público y grupal, sin contacto privado ni contenido inapropiado.',
  },
  {
    id: 11,
    text: 'Una persona en línea insiste en pasar de un juego público a una app de mensajes privados donde los mensajes desaparecen solos.',
    isWarningSign: true,
    category: 'aislamiento',
    explanation:
      'Buscar canales privados y sin rastro es una forma de evitar ser detectado por adultos y de eliminar evidencia.',
  },
  {
    id: 12,
    text: 'Un adulto conocido de la familia te saluda por redes sociales y te pregunta cómo te fue en el examen, en un comentario público.',
    isWarningSign: false,
    explanation: 'Es un contacto abierto, público y de bajo riesgo, sin intento de privacidad ni de generar secretismo.',
  },
];
