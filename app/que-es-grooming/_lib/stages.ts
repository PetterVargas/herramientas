export type GroomingStage = 'contacto' | 'confianza' | 'aislamiento' | 'control';

export interface StageDef {
  id: GroomingStage;
  name: string;
  question: string;
  definition: string;
  principle: string;
  examples: string[];
  controls: string[];
  color: string;
  ring: string;
}

export const stages: StageDef[] = [
  {
    id: 'contacto',
    name: 'Contacto y selección',
    question: '¿Cómo elige el agresor a su víctima?',
    definition:
      'Un adulto (o alguien que finge ser menor) contacta a niños, niñas o adolescentes en redes sociales, videojuegos en línea o apps de mensajería, muchas veces haciéndose pasar por alguien de su edad o con intereses similares.',
    principle:
      'Suele buscar perfiles con poca supervisión, publicaciones públicas o señales de soledad o vulnerabilidad emocional, porque son más fáciles de manipular.',
    examples: [
      'Perfiles falsos con fotos de otra persona más joven',
      'Contacto a través de juegos en línea populares entre menores',
      'Comentarios halagadores en publicaciones públicas',
      'Se presenta como "cazatalentos", modelo o alguien con oportunidades',
    ],
    controls: [
      'Configurar los perfiles como privados y revisar solicitudes de desconocidos',
      'No aceptar solicitudes de personas que no se conocen en persona',
      'Hablar en casa sobre quién los contacta en línea, sin juzgar',
    ],
    color: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500',
  },
  {
    id: 'confianza',
    name: 'Generación de confianza',
    question: '¿Cómo gana la confianza del niño o adolescente?',
    definition:
      'El agresor invierte tiempo en escuchar, halagar y mostrar comprensión, presentándose como el único que "realmente entiende" a la víctima.',
    principle:
      'Explota necesidades emocionales normales (atención, validación, sentirse especial) para crear un vínculo de dependencia difícil de romper.',
    examples: [
      'Halagos constantes sobre la apariencia o la personalidad',
      'Regalos, saldo o dinero, u objetos virtuales de videojuegos',
      'Se presenta como confidente para problemas familiares o escolares',
      'Simula tener los mismos gustos e intereses que la víctima',
    ],
    controls: [
      'Enseñar que ningún adulto "normal" necesita mantener en secreto una amistad con un menor',
      'Fomentar que compartan en casa sus nuevas amistades en línea',
      'Desconfiar de regalos o dinero de desconocidos en internet',
    ],
    color: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500',
  },
  {
    id: 'aislamiento',
    name: 'Aislamiento y secreto',
    question: '¿Cómo aleja a la víctima de su red de apoyo?',
    definition:
      'El agresor insiste en mantener la relación en secreto y busca separar a la víctima de familiares y amigos que podrían notar las señales de alerta.',
    principle:
      'El secreto es la principal herramienta de control: sin testigos ni supervisión, es mucho más fácil escalar el abuso sin ser detectado.',
    examples: [
      '"Esto es solo entre nosotros, no se lo cuentes a nadie"',
      'Mover la conversación a apps con mensajes que se autodestruyen',
      'Generar desconfianza hacia padres o cuidadores ("no te entienden como yo")',
      'Pedir que borre el historial de conversaciones',
    ],
    controls: [
      'Establecer la regla familiar de "ningún secreto con adultos en internet"',
      'Conversar con respeto sobre las apps que usan, sin invadir su privacidad de golpe',
      'Estar atentos a cambios de comportamiento: aislamiento, secretismo con el celular, ansiedad',
    ],
    color: 'text-orange-600 dark:text-orange-400',
    ring: 'ring-orange-500',
  },
  {
    id: 'control',
    name: 'Desensibilización y control',
    question: '¿Cómo introduce el contenido sexual y mantiene el control?',
    definition:
      'El agresor introduce gradualmente temas y contenido sexual (comentarios, imágenes, videollamadas) y, una vez consigue material íntimo, puede usar el chantaje para exigir más.',
    principle:
      'La progresión gradual busca que la víctima normalice cada paso y sienta que ya es "demasiado tarde" para decir que no.',
    examples: [
      'Enviar contenido sexual "para romper el hielo" y pedir reciprocidad',
      'Videollamadas con solicitudes cada vez más comprometedoras',
      'Amenazas de mostrar capturas a familiares o amigos si no coopera',
      'Presión emocional: "si me quisieras, lo harías"',
    ],
    controls: [
      'Recordar: pedir imágenes íntimas a un menor es un delito, sin importar el contexto o quién lo pida',
      'Ante cualquier amenaza o chantaje, buscar ayuda de un adulto de confianza de inmediato',
      'No borrar las conversaciones: son evidencia clave para la denuncia',
    ],
    color: 'text-red-600 dark:text-red-400',
    ring: 'ring-red-500',
  },
];
