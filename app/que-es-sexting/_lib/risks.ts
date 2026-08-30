export type SextingRisk = 'control' | 'permanencia' | 'legal' | 'presion';

export interface RiskDef {
  id: SextingRisk;
  name: string;
  question: string;
  definition: string;
  principle: string;
  examples: string[];
  controls: string[];
  color: string;
  ring: string;
}

export const risks: RiskDef[] = [
  {
    id: 'control',
    name: 'Pérdida de control',
    question: '¿Qué pasa después de enviar una imagen íntima?',
    definition:
      'Al enviar una foto o video íntimo, pierdes el control sobre su destino: la otra persona puede reenviarlo, publicarlo o usarlo sin tu permiso, incluso si prometió no hacerlo.',
    principle:
      'La confianza en el momento de enviar no garantiza nada a futuro: relaciones que terminan mal, celulares robados o hackeados pueden exponer el contenido igual.',
    examples: [
      'Reenvío del contenido a otros grupos o contactos sin consentimiento',
      'Publicación en redes sociales o sitios de contenido para adultos',
      'Uso del contenido para memes o burlas ("slut-shaming")',
      'Filtración por robo o hackeo del dispositivo',
    ],
    controls: [
      'Nunca compartas algo que no querrías que viera cualquier persona, para siempre',
      'No cedas a la presión de una pareja, aunque confíes en ella hoy',
      'Activa bloqueo de pantalla y cifrado en tus dispositivos',
    ],
    color: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500',
  },
  {
    id: 'permanencia',
    name: 'Permanencia digital',
    question: '¿Realmente se puede borrar algo de internet?',
    definition:
      'Aunque uses apps que dicen "borrar" los mensajes automáticamente, quien lo recibe puede tomar una captura de pantalla antes de que desaparezca.',
    principle:
      'Una vez que un archivo sale de tu dispositivo, puede haber sido copiado, guardado en la nube o compartido en segundos, sin que puedas evitarlo o saberlo.',
    examples: [
      'Capturas de pantalla en apps de mensajes "efímeros"',
      'Copias de respaldo automáticas en la nube de quien lo recibe',
      'El contenido puede reaparecer años después: al terminar una relación, en una nueva escuela, etc.',
    ],
    controls: [
      'No existe una app 100% segura para enviar contenido íntimo',
      'Piensa en tu "yo del futuro": ¿te afectaría que esto se conociera en 5 años?',
    ],
    color: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500',
  },
  {
    id: 'legal',
    name: 'Consecuencias legales',
    question: '¿Puede el sexting entre menores ser un delito?',
    definition:
      'En la mayoría de países, producir, poseer o distribuir imágenes sexuales de una persona menor de 18 años se considera material de abuso sexual infantil, incluso si ambas partes son menores y lo hicieron de forma consensuada.',
    principle:
      'La ley busca proteger a los menores, y eso significa que reenviar la foto de un compañero o compañera —incluso "sin mala intención"— puede tener consecuencias penales graves.',
    examples: [
      'Reenviar la imagen íntima de un compañero de clase a un grupo de chat',
      'Guardar en el celular una imagen íntima de otro menor de edad',
      'Publicar contenido íntimo de una expareja menor de edad ("pornovenganza")',
    ],
    controls: [
      'Nunca reenvíes contenido íntimo de otra persona, sin importar quién te lo mande',
      'Si recibes ese tipo de contenido, bórralo, no lo compartas y cuéntale a un adulto de confianza',
      'La responsabilidad legal recae en quien comparte sin consentimiento, no en quien aparece en la imagen',
    ],
    color: 'text-red-600 dark:text-red-400',
    ring: 'ring-red-500',
  },
  {
    id: 'presion',
    name: 'Presión y coerción',
    question: '¿Es sexting si me sentí obligado/a?',
    definition:
      'Mucho sexting entre adolescentes no es libremente elegido: ocurre por presión de pareja, del grupo de amigos, o como parte de manipulación (grooming, sextorsión).',
    principle:
      'El consentimiento real requiere libertad para decir que no sin miedo a consecuencias (ruptura, burla, chantaje). Si hay presión, no es una decisión libre.',
    examples: [
      '"Si me quisieras, me mandarías una foto"',
      'Amenazar con terminar la relación si no se envía contenido',
      'Burlas del grupo por "no atreverse"',
      'Un desconocido en línea que insiste tras ganarse la confianza',
    ],
    controls: [
      'Decir que no está bien, incluso dentro de una relación de pareja',
      'Nadie que te quiera de verdad te presiona a hacer algo que te incomoda',
      'Si sientes presión constante, habla con un adulto de confianza',
    ],
    color: 'text-orange-600 dark:text-orange-400',
    ring: 'ring-orange-500',
  },
];
