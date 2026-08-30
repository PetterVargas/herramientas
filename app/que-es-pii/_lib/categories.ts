export type PiiCategory = 'directa' | 'indirecta' | 'sensible';

export interface CategoryDef {
  id: PiiCategory;
  name: string;
  question: string;
  definition: string;
  principle: string;
  examples: string[];
  controls: string[];
  color: string;
  ring: string;
}

export const categories: CategoryDef[] = [
  {
    id: 'directa',
    name: 'PII directa',
    question: '¿Identifica a alguien por sí sola?',
    definition:
      'Un dato que, por sí mismo, permite identificar de forma única e inequívoca a una persona específica.',
    principle: 'Basta ese único dato para saber exactamente de quién se trata.',
    examples: [
      'Nombre completo',
      'Número de identificación (cédula, DNI, pasaporte)',
      'Correo electrónico personal',
      'Número de teléfono',
      'Número de tarjeta bancaria',
      'Dirección física completa',
    ],
    controls: [
      'Minimizar qué datos directos se piden y para qué',
      'Cifrar en tránsito y en reposo',
      'Enmascarar o truncar en pantallas y logs (ej. mostrar solo los últimos 4 dígitos)',
      'Controlar el acceso con el principio de mínimo privilegio',
    ],
    color: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500',
  },
  {
    id: 'indirecta',
    name: 'PII indirecta (cuasi-identificador)',
    question: '¿Identifica solo si se combina con otros datos?',
    definition:
      'Un dato que no identifica a una persona por sí solo, pero que combinado con otros datos aparentemente inocuos sí permite identificarla.',
    principle:
      'El riesgo aparece al cruzar varias piezas "anónimas" entre sí. Un estudio clásico mostró que fecha de nacimiento + código postal + género identifican a la mayoría de personas en EE. UU.',
    examples: [
      'Fecha de nacimiento',
      'Código postal',
      'Género',
      'Cargo o profesión',
      'Dirección IP',
      'Identificador publicitario del dispositivo (advertising ID)',
    ],
    controls: [
      'Evaluar el riesgo de re-identificación al combinar datasets',
      'Aplicar técnicas de anonimización o generalización (ej. k-anonimidad)',
      'Reducir la granularidad (ej. rango de edad en vez de fecha exacta)',
      'Aislar bases de datos que, combinadas, podrían re-identificar personas',
    ],
    color: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500',
  },
  {
    id: 'sensible',
    name: 'PII sensible',
    question: '¿Su filtración causaría un daño mayor?',
    definition:
      'Categoría especial de datos personales que, de filtrarse o usarse indebidamente, puede generar discriminación, daño grave o poner en riesgo la seguridad de la persona.',
    principle:
      'Leyes como el GDPR (UE), la LGPD (Brasil) o la Ley 1581 de 2012 (Colombia) exigen consentimiento explícito y medidas de seguridad reforzadas para esta categoría.',
    examples: [
      'Datos de salud (historial médico, diagnósticos)',
      'Datos biométricos (huella, reconocimiento facial)',
      'Orientación sexual e identidad de género',
      'Creencias religiosas, políticas o afiliación sindical',
      'Origen étnico o racial',
      'Datos de menores de edad',
    ],
    controls: [
      'Consentimiento explícito e informado antes de recolectarlos',
      'Cifrado reforzado y acceso restringido a un grupo mínimo de personas',
      'Registro de auditoría de cada acceso',
      'Plan de respuesta a incidentes específico para este tipo de datos',
    ],
    color: 'text-red-600 dark:text-red-400',
    ring: 'ring-red-500',
  },
];
