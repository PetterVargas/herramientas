export type PgpMode = 'confidencialidad' | 'autenticidad';

export type FlowNodeId =
  | 'llaves'
  | 'mensaje'
  | 'criptografia'
  | 'transito'
  | 'recepcion'
  | 'resultado';

export interface FlowStepItem {
  label: string;
  status: 'ok' | 'fail' | 'neutral';
}

export interface FlowStep {
  id: number;
  node: FlowNodeId;
  title: string;
  description: string;
  items: FlowStepItem[];
}

export const nodeLabels: Record<PgpMode, Record<FlowNodeId, string>> = {
  confidencialidad: {
    llaves: 'Par de claves',
    mensaje: 'Mensaje',
    criptografia: 'Cifrado',
    transito: 'Tránsito',
    recepcion: 'Descifrado',
    resultado: 'Resultado',
  },
  autenticidad: {
    llaves: 'Par de claves',
    mensaje: 'Hash',
    criptografia: 'Firma',
    transito: 'Tránsito',
    recepcion: 'Verificación',
    resultado: 'Resultado',
  },
};

export function getSteps(mode: PgpMode): FlowStep[] {
  if (mode === 'confidencialidad') {
    return [
      {
        id: 1,
        node: 'llaves',
        title: 'Bob genera su par de claves',
        description:
          'Bob crea un par de claves matemáticamente vinculadas: una pública, que puede compartir libremente (incluso publicarla), y una privada, que guarda en secreto y nunca comparte con nadie.',
        items: [
          { label: 'Clave pública de Bob → la comparte con quien quiera escribirle', status: 'neutral' },
          { label: 'Clave privada de Bob → se queda solo con él', status: 'ok' },
        ],
      },
      {
        id: 2,
        node: 'mensaje',
        title: 'Alice redacta el mensaje',
        description:
          'Alice quiere enviarle a Bob información confidencial y necesita asegurarse de que nadie más, ni siquiera un intermediario, pueda leerla.',
        items: [{ label: 'Mensaje en texto plano: "Reunión confirmada a las 3pm..."', status: 'neutral' }],
      },
      {
        id: 3,
        node: 'criptografia',
        title: 'Cifrado híbrido con la clave pública de Bob',
        description:
          'Cifrar todo el mensaje directamente con RSA sería lento. Por eso PGP usa cifrado híbrido: genera una clave de sesión simétrica aleatoria, cifra el mensaje con ella (rápido), y luego cifra esa clave de sesión con la clave pública de Bob.',
        items: [
          { label: 'Clave de sesión (AES) cifra el mensaje completo', status: 'ok' },
          { label: 'Clave pública de Bob cifra esa clave de sesión', status: 'ok' },
        ],
      },
      {
        id: 4,
        node: 'transito',
        title: 'El mensaje viaja por un canal inseguro',
        description:
          'El mensaje cifrado y la clave de sesión cifrada se envían por correo o cualquier canal, sin importar que alguien los intercepte en el camino.',
        items: [
          { label: 'Un atacante intercepta el tráfico', status: 'neutral' },
          { label: 'No puede leerlo: no tiene la clave privada de Bob', status: 'ok' },
        ],
      },
      {
        id: 5,
        node: 'recepcion',
        title: 'Bob descifra con su clave privada',
        description:
          'Bob usa su clave privada para descifrar la clave de sesión, y con esa clave de sesión descifra el mensaje original.',
        items: [
          { label: 'Clave privada de Bob descifra la clave de sesión', status: 'ok' },
          { label: 'La clave de sesión descifra el mensaje completo', status: 'ok' },
        ],
      },
      {
        id: 6,
        node: 'resultado',
        title: 'Confidencialidad garantizada',
        description:
          'Solo Bob, el único que tiene la clave privada correspondiente, pudo leer el mensaje original. Cualquier otra persona que lo intercepte solo ve datos cifrados.',
        items: [
          { label: 'Mensaje leído únicamente por Bob', status: 'ok' },
          { label: 'Sin la clave privada de Bob, el mensaje es inútil', status: 'ok' },
        ],
      },
    ];
  }

  return [
    {
      id: 1,
      node: 'llaves',
      title: 'Alice genera su par de claves',
      description:
        'Alice también tiene su propio par de claves: usará su clave privada para firmar, y compartirá su clave pública para que cualquiera pueda verificar esa firma.',
      items: [
        { label: 'Clave pública de Alice → la publica o comparte', status: 'neutral' },
        { label: 'Clave privada de Alice → se queda solo con ella', status: 'ok' },
      ],
    },
    {
      id: 2,
      node: 'mensaje',
      title: 'Alice calcula el hash del mensaje',
      description:
        'Antes de firmar, PGP genera un hash (huella digital) del contenido: una función como SHA-256 produce un resumen único, y cualquier cambio en el mensaje —por mínimo que sea— altera ese resumen por completo.',
      items: [{ label: 'Mensaje → función hash → resumen único de longitud fija', status: 'neutral' }],
    },
    {
      id: 3,
      node: 'criptografia',
      title: 'Alice firma el hash con su clave privada',
      description:
        'Alice cifra ese hash con su clave privada. El resultado es la firma digital, que se adjunta al mensaje original (que puede viajar en claro o también cifrado si además se quiere confidencialidad).',
      items: [{ label: 'Hash cifrado con la clave privada de Alice = firma digital', status: 'ok' }],
    },
    {
      id: 4,
      node: 'transito',
      title: 'El mensaje y la firma viajan juntos',
      description:
        'Alice envía el mensaje junto con su firma digital. Cualquiera puede leerlo si no está también cifrado, pero nadie más pudo haber generado esa firma en particular.',
      items: [
        { label: 'Un atacante podría intentar alterar el mensaje en tránsito', status: 'neutral' },
        { label: 'No puede generar una firma válida sin la clave privada de Alice', status: 'ok' },
      ],
    },
    {
      id: 5,
      node: 'recepcion',
      title: 'Bob verifica con la clave pública de Alice',
      description:
        'Bob calcula su propio hash del mensaje recibido y usa la clave pública de Alice para descifrar la firma, obteniendo el hash que ella firmó originalmente.',
      items: [
        { label: 'Bob recalcula el hash del mensaje recibido', status: 'neutral' },
        { label: 'La clave pública de Alice descifra la firma → hash original', status: 'ok' },
      ],
    },
    {
      id: 6,
      node: 'resultado',
      title: 'Autenticidad e integridad verificadas',
      description:
        'Si ambos hashes coinciden, el mensaje es realmente de Alice y no fue modificado en el camino. Si no coinciden, el mensaje fue alterado o la firma no es válida.',
      items: [
        { label: 'Hashes coinciden → mensaje auténtico y sin alterar', status: 'ok' },
        { label: 'Hashes distintos → mensaje alterado o firma inválida', status: 'fail' },
      ],
    },
  ];
}
