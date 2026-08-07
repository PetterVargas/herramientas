import type { Pillar } from './pillars';

export interface Scenario {
  id: number;
  text: string;
  pillars: Pillar[];
  explanation: string;
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    text: 'Un atacante intercepta el tráfico de una red Wi-Fi pública y lee los correos de otro usuario sin que este lo note.',
    pillars: ['confidencialidad'],
    explanation:
      'Se expone información a alguien no autorizado, sin que se modifique ni se afecte el acceso: es un problema de confidencialidad.',
  },
  {
    id: 2,
    text: 'Un ataque DDoS satura los servidores de una tienda en línea y los clientes no pueden completar sus compras durante horas.',
    pillars: ['disponibilidad'],
    explanation:
      'El servicio deja de estar accesible para usuarios legítimos: afecta directamente la disponibilidad.',
  },
  {
    id: 3,
    text: 'Un empleado descontento modifica silenciosamente los registros contables de la empresa antes de renunciar.',
    pillars: ['integridad'],
    explanation:
      'Los datos son alterados de forma no autorizada, comprometiendo su exactitud: es un problema de integridad.',
  },
  {
    id: 4,
    text: 'Un ransomware cifra todos los archivos de un hospital y exige un pago para restaurar el acceso.',
    pillars: ['disponibilidad'],
    explanation:
      'Aunque cifra los datos, el objetivo del ataque es bloquear el acceso legítimo: el impacto principal es sobre la disponibilidad.',
  },
  {
    id: 5,
    text: 'Una base de datos con contraseñas queda expuesta públicamente por un bucket de almacenamiento mal configurado.',
    pillars: ['confidencialidad'],
    explanation:
      'Información sensible queda visible para cualquiera, sin autorización: afecta la confidencialidad.',
  },
  {
    id: 6,
    text: 'Un atacante intercepta una transferencia bancaria y cambia el número de cuenta destino antes de que llegue al banco.',
    pillars: ['integridad'],
    explanation:
      'Se altera el contenido de la transacción en tránsito: compromete la integridad de los datos.',
  },
  {
    id: 7,
    text: 'Una falla eléctrica sin generador de respaldo apaga el centro de datos de una aerolínea, cancelando vuelos por falta de sistemas.',
    pillars: ['disponibilidad'],
    explanation:
      'No hay pérdida ni alteración de datos, pero los sistemas quedan inaccesibles: es disponibilidad.',
  },
  {
    id: 8,
    text: 'Un malware modifica el hash de un instalador oficial para incluir una puerta trasera, y el usuario lo descarga confiando en que es legítimo.',
    pillars: ['integridad'],
    explanation:
      'El archivo fue alterado de forma no autorizada respecto a su versión original: es integridad.',
  },
  {
    id: 9,
    text: 'Un exempleado conserva acceso a un sistema interno tras dejar la empresa y consulta información de clientes sin permiso.',
    pillars: ['confidencialidad'],
    explanation:
      'El acceso no autorizado a información privada es, ante todo, un problema de confidencialidad.',
  },
  {
    id: 10,
    text: 'Un ataque combinado cifra archivos con ransomware y además filtra copias de esos archivos a la dark web (doble extorsión).',
    pillars: ['confidencialidad', 'disponibilidad'],
    explanation:
      'Aquí hay dos impactos: los archivos originales dejan de estar disponibles (cifrados) y su contenido queda expuesto (filtrado).',
  },
];
