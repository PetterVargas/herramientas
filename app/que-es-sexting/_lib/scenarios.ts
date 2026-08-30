import type { SextingRisk } from './risks';

export interface SextingScenario {
  id: number;
  text: string;
  isRisky: boolean;
  category?: SextingRisk;
  explanation: string;
}

export const scenarios: SextingScenario[] = [
  {
    id: 1,
    text: 'Tu pareja te dice: "si de verdad me quisieras, me mandarías una foto tuya sin ropa".',
    isRisky: true,
    category: 'presion',
    explanation: 'Es una frase clásica de manipulación: el amor real no condiciona ni presiona a compartir contenido íntimo.',
  },
  {
    id: 2,
    text: 'Recibes por error la foto íntima de un compañero de clase y la borras sin reenviarla ni comentarla con nadie.',
    isRisky: false,
    explanation: 'Es la reacción correcta: no reenviar, no comentar y borrar el contenido protege a la persona y evita responsabilidad legal.',
  },
  {
    id: 3,
    text: 'Reenvías a tu grupo de amigos una foto íntima que te compartió tu pareja en confianza.',
    isRisky: true,
    category: 'legal',
    explanation: 'Compartir contenido íntimo sin consentimiento de quien aparece en él puede constituir un delito, incluso entre menores de edad.',
  },
  {
    id: 4,
    text: 'Le cuentas a un amigo (sin mostrar nada) que te sientes presionado/a por tu pareja para enviar fotos.',
    isRisky: false,
    explanation: 'Buscar apoyo y hablarlo con alguien de confianza es una respuesta saludable frente a la presión.',
  },
  {
    id: 5,
    text: 'Usas una app que borra los mensajes automáticamente, así que decides que es "seguro" enviar una foto íntima.',
    isRisky: true,
    category: 'permanencia',
    explanation: 'Ninguna app impide que la otra persona tome una captura de pantalla antes de que el mensaje desaparezca.',
  },
  {
    id: 6,
    text: 'Guardas en tu celular una foto íntima de tu expareja, que también es menor de edad, "por si acaso".',
    isRisky: true,
    category: 'legal',
    explanation: 'Poseer imágenes íntimas de un menor de edad, incluso sin compartirlas, puede ser constitutivo de delito.',
  },
  {
    id: 7,
    text: 'Le dices a tu pareja que no te sientes cómodo/a enviando fotos íntimas y ella lo respeta sin insistir.',
    isRisky: false,
    explanation: 'Respetar un "no" sin presionar es exactamente el comportamiento sano que se espera en una relación.',
  },
  {
    id: 8,
    text: 'Tus amigos se burlan de ti en el grupo por "no atreverte" a enviar una foto íntima a tu pareja.',
    isRisky: true,
    category: 'presion',
    explanation: 'La presión de grupo es una forma de coerción: nadie debería sentirse obligado a hacer algo íntimo para encajar.',
  },
  {
    id: 9,
    text: 'Piensas antes de enviar una foto: "¿me afectaría si esto lo viera cualquier persona dentro de 5 años?" y decides no enviarla.',
    isRisky: false,
    explanation: 'Reflexionar sobre la permanencia digital antes de compartir es justamente la prevención recomendada.',
  },
  {
    id: 10,
    text: 'Publicas una imagen íntima de tu expareja, también menor de edad, después de terminar la relación.',
    isRisky: true,
    category: 'legal',
    explanation: 'Es "pornovenganza": además del daño grave a la víctima, puede constituir un delito con consecuencias penales serias.',
  },
  {
    id: 11,
    text: 'Un desconocido en línea, tras varios días de conversación amistosa, te empieza a pedir fotos cada vez más reveladoras.',
    isRisky: true,
    category: 'presion',
    explanation: 'Escalar gradualmente las peticiones tras ganar confianza es una táctica típica de manipulación (grooming).',
  },
  {
    id: 12,
    text: 'Activas el bloqueo de pantalla con contraseña en tu celular por si lo pierdes o te lo roban.',
    isRisky: false,
    explanation: 'Es una buena práctica de seguridad general que reduce el riesgo de que terceros accedan a contenido privado.',
  },
];
