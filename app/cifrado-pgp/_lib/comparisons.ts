export interface ComparisonItem {
  id: string;
  title: string;
  definition: string;
  example: string;
  whenToUse: string;
  risk: string;
  color: string;
}

export const purposeComparison: ComparisonItem[] = [
  {
    id: 'cifrar',
    title: 'Cifrar → Confidencialidad',
    definition:
      'Se cifra el mensaje con la clave pública del destinatario, para que solo quien tenga la clave privada correspondiente pueda leerlo.',
    example: 'Alice cifra un contrato con la clave pública de Bob antes de enviárselo por correo.',
    whenToUse: 'Cuando el contenido es sensible y nadie más debe poder leerlo en tránsito.',
    risk: 'No prueba quién lo envió: cualquiera con la clave pública del destinatario puede cifrarle algo.',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'firmar',
    title: 'Firmar → Autenticidad e integridad',
    definition:
      'Se cifra un hash del mensaje con la clave privada del remitente, para que cualquiera pueda verificar con su clave pública que es auténtico y no fue alterado.',
    example: 'Alice firma un comunicado oficial para que todos puedan comprobar que es realmente suyo.',
    whenToUse: 'Cuando lo importante es demostrar autoría e integridad, aunque el contenido no sea secreto.',
    risk: 'No oculta el contenido: cualquiera puede leer el mensaje, solo se verifica que no fue alterado.',
    color: 'text-purple-600 dark:text-purple-400',
  },
];

export const symmetryComparison: ComparisonItem[] = [
  {
    id: 'simetrico',
    title: 'Cifrado simétrico',
    definition:
      'Usa una única clave para cifrar y descifrar. Es muy rápido, pero esa misma clave debe compartirse de forma segura entre ambas partes.',
    example: 'AES cifra el cuerpo del mensaje en PGP usando una clave de sesión generada al vuelo.',
    whenToUse: 'Para cifrar grandes volúmenes de datos rápidamente, una vez que ambas partes tienen la clave.',
    risk: 'Si la clave se filtra al compartirla, cualquiera con ella puede descifrar todo el contenido.',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'asimetrico',
    title: 'Cifrado asimétrico',
    definition:
      'Usa un par de claves matemáticamente vinculadas: lo que cifra una clave pública, solo lo descifra su clave privada correspondiente.',
    example: 'RSA/ECC cifra en PGP la clave de sesión (no el mensaje completo) con la clave pública del destinatario.',
    whenToUse: 'Para intercambiar una clave de sesión de forma segura sin haberla compartido antes por otro canal.',
    risk: 'Es mucho más lento que el cifrado simétrico para grandes cantidades de datos.',
    color: 'text-amber-600 dark:text-amber-400',
  },
];
