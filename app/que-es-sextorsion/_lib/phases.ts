export type SextortionPhase = 'contacto' | 'obtencion' | 'amenaza' | 'escalada';

export interface PhaseDef {
  id: SextortionPhase;
  name: string;
  question: string;
  definition: string;
  principle: string;
  examples: string[];
  controls: string[];
  color: string;
  ring: string;
}

export const phases: PhaseDef[] = [
  {
    id: 'contacto',
    name: 'Contacto y engaño',
    question: '¿Cómo consigue el atacante el contacto inicial?',
    definition:
      'El atacante contacta a la víctima con un perfil falso —a menudo haciéndose pasar por alguien atractivo de edad similar—, inicia una conversación romántica o sexual, y rápidamente propone videollamada o intercambio de fotos.',
    principle:
      'Actúan rápido: buscan generar intimidad y urgencia en minutos u horas, no semanas, para reducir el tiempo de reflexión de la víctima.',
    examples: [
      'Perfiles con fotos robadas de otra persona, muy atractivas',
      'Conversación que escala a temas sexuales muy rápidamente',
      'Propuesta de videollamada "para conocerse mejor"',
      'A veces el contacto viene de una cuenta hackeada de alguien conocido',
    ],
    controls: [
      'Desconfía de relaciones en línea que avanzan demasiado rápido',
      'No aceptes videollamadas con desconocidos que insisten en contenido íntimo',
      'Verifica la identidad de la persona por otros medios antes de confiar',
    ],
    color: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500',
  },
  {
    id: 'obtencion',
    name: 'Obtención del material',
    question: '¿Cómo consiguen la imagen o video íntimo?',
    definition:
      'Puede ser una imagen que la víctima envió voluntariamente, una grabación de una videollamada íntima sin su conocimiento, o incluso una imagen manipulada o generada con inteligencia artificial (deepfake) usando fotos públicas de la víctima.',
    principle:
      'No hace falta haber compartido una imagen real: hoy existen sextorsiones basadas completamente en imágenes falsas creadas con IA a partir de fotos normales de redes sociales.',
    examples: [
      'Grabación oculta de una videollamada íntima',
      'Captura de pantalla de contenido enviado en apps "efímeras"',
      'Imágenes o videos falsos generados con IA (deepfakes) a partir de fotos públicas',
      'Hackeo del dispositivo o de una cuenta de la víctima',
    ],
    controls: [
      'Cubre la cámara del computador cuando no la uses',
      'Cuidado con las fotos públicas que pueden usarse para crear falsificaciones',
      'Activa la autenticación en dos pasos en tus cuentas',
    ],
    color: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500',
  },
  {
    id: 'amenaza',
    name: 'Amenaza y exigencia',
    question: '¿Qué exige el atacante?',
    definition:
      'Una vez tiene el material, amenaza con enviarlo a familiares, amigos o publicarlo en redes sociales, exigiendo dinero, más contenido sexual, o ambas cosas.',
    principle:
      'Genera pánico y urgencia deliberadamente (por ejemplo, "tienes una hora") para que la víctima actúe por miedo antes de pensar o pedir ayuda.',
    examples: [
      'Mensajes con capturas de la lista de contactos de la víctima como amenaza',
      'Exigencia de pago por transferencia o criptomonedas',
      'Plazos muy cortos con amenazas de publicación inmediata',
      'Exigencia de más fotos o videos en lugar de dinero',
    ],
    controls: [
      'No respondas por pánico: tómate tiempo para pedir ayuda',
      'Guarda capturas de pantalla de todo (mensajes, perfil, número) como evidencia',
      'No borres la conversación, aunque quieras que desaparezca',
    ],
    color: 'text-orange-600 dark:text-orange-400',
    ring: 'ring-orange-500',
  },
  {
    id: 'escalada',
    name: 'Escalada del chantaje',
    question: '¿Qué pasa si pago o envío más contenido?',
    definition:
      'Pagar o enviar más material casi nunca detiene la extorsión: confirma que la víctima cede ante la presión, y el atacante suele volver a pedir más.',
    principle:
      'Ceder no compra seguridad, alimenta el ciclo: el atacante ya demostró que el miedo funciona con esa víctima.',
    examples: [
      'Nuevas exigencias después de un primer pago',
      'Amenazas repetidas usando el mismo material o pidiendo material nuevo',
      'Contacto con familiares o amigos aunque ya se haya pagado',
    ],
    controls: [
      'Deja de responder y no cedas a nuevas exigencias',
      'Denuncia de inmediato ante la policía y reporta el perfil en la plataforma',
      'Busca apoyo psicológico: no es tu culpa y no estás solo o sola',
    ],
    color: 'text-red-600 dark:text-red-400',
    ring: 'ring-red-500',
  },
];
