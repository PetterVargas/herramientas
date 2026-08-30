import type { PiiCategory } from './categories';

export interface PiiScenario {
  id: number;
  text: string;
  isPii: boolean;
  category?: PiiCategory;
  explanation: string;
}

export const scenarios: PiiScenario[] = [
  {
    id: 1,
    text: 'El nombre completo de un cliente guardado en la base de datos de una tienda.',
    isPii: true,
    category: 'directa',
    explanation: 'Identifica de forma directa e inequívoca a una persona específica.',
  },
  {
    id: 2,
    text: 'El color favorito que alguien eligió en una encuesta completamente anónima, sin ningún otro dato asociado.',
    isPii: false,
    explanation:
      'Sin vincularse a ninguna identidad ni a otros datos, esa preferencia no permite identificar a nadie.',
  },
  {
    id: 3,
    text: 'El número de cédula o DNI de una persona.',
    isPii: true,
    category: 'directa',
    explanation: 'Es un identificador único emitido por el Estado: por sí solo señala a una persona exacta.',
  },
  {
    id: 4,
    text: 'La dirección IP con la que un visitante navegó por tu sitio web.',
    isPii: true,
    category: 'indirecta',
    explanation:
      'Por sí sola no revela un nombre, pero junto con los registros del proveedor de internet o de la plataforma puede rastrearse hasta una persona específica. Muchas leyes de protección de datos la consideran dato personal.',
  },
  {
    id: 5,
    text: 'El diagnóstico médico de un paciente registrado en su historia clínica.',
    isPii: true,
    category: 'sensible',
    explanation:
      'Es un dato de salud: su filtración puede derivar en discriminación o daño grave, por lo que requiere protección reforzada.',
  },
  {
    id: 6,
    text: 'El promedio de edad de todos los empleados de una empresa, expresado como una sola cifra agregada.',
    isPii: false,
    explanation:
      'Es un dato estadístico agregado que no permite identificar ni distinguir a ningún individuo dentro del grupo.',
  },
  {
    id: 7,
    text: 'La huella dactilar que alguien usa para desbloquear su celular.',
    isPii: true,
    category: 'sensible',
    explanation: 'Es un dato biométrico: identifica de forma única a la persona y no puede "cambiarse" si se filtra.',
  },
  {
    id: 8,
    text: 'El código postal, la fecha de nacimiento y el género de una persona, guardados juntos en el mismo registro.',
    isPii: true,
    category: 'indirecta',
    explanation:
      'Ninguno de los tres identifica por sí solo, pero combinados son un cuasi-identificador muy fuerte: estudios muestran que esta combinación re-identifica a la mayoría de la población de un país.',
  },
  {
    id: 9,
    text: 'El correo genérico de soporte, info@empresa.com, que reciben varias personas del equipo.',
    isPii: false,
    explanation: 'No está vinculado a una persona física específica: es una cuenta compartida o departamental.',
  },
  {
    id: 10,
    text: 'El correo personal de un empleado, con formato nombre.apellido@empresa.com.',
    isPii: true,
    category: 'directa',
    explanation: 'Identifica de forma directa a una persona concreta dentro de la organización.',
  },
  {
    id: 11,
    text: 'Un dataset de ventas correctamente anonimizado, donde se eliminaron todos los identificadores y solo quedan montos agregados por región.',
    isPii: false,
    explanation:
      'Una anonimización irreversible rompe el vínculo con individuos: al no poder re-identificarse a nadie, deja de ser un dato personal (si solo estuviera "pseudonimizado" y fuera reversible, seguiría siendo PII).',
  },
  {
    id: 12,
    text: 'El historial de ubicaciones GPS minuto a minuto de un usuario de una app de transporte.',
    isPii: true,
    category: 'sensible',
    explanation:
      'La geolocalización precisa y continua puede revelar dónde vive, dónde trabaja y qué lugares sensibles visita (clínicas, templos, sindicatos), por lo que se trata como dato de alto riesgo.',
  },
  {
    id: 13,
    text: 'La afiliación sindical que una persona declaró en un formulario de recursos humanos.',
    isPii: true,
    category: 'sensible',
    explanation: 'Es una categoría especial de dato personal que puede exponer a la persona a discriminación.',
  },
  {
    id: 14,
    text: 'El identificador publicitario (advertising ID) de un teléfono, usado para rastrear su comportamiento entre apps.',
    isPii: true,
    category: 'indirecta',
    explanation:
      'No lleva un nombre asociado, pero permite rastrear y perfilar a un dispositivo (y a quien lo usa) a lo largo del tiempo.',
  },
  {
    id: 15,
    text: 'El nombre de la empresa donde trabaja alguien, mencionado sin referirse a ninguna persona en particular.',
    isPii: false,
    explanation: 'Es información sobre una organización, no sobre un individuo identificable.',
  },
];
