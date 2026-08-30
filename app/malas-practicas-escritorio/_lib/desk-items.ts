export type DeskItemType = 'bad' | 'good';

export interface DeskItem {
  id: string;
  type: DeskItemType;
  /** Nombre neutro visible al pasar el cursor, no revela si es buena o mala práctica. */
  label: string;
  title: string;
  reasons: string[];
}

export const deskItems: DeskItem[] = [
  {
    id: 'door-open',
    type: 'bad',
    label: 'Puerta de la oficina',
    title: 'Puerta de acceso abierta sin control',
    reasons: [
      'Cualquier persona puede entrar a la oficina sin identificarse ni registrar su ingreso.',
      'Facilita el "tailgating": alguien no autorizado entra justo detrás de un empleado.',
    ],
  },
  {
    id: 'wifi-note',
    type: 'bad',
    label: 'Nota junto al router',
    title: 'Clave del Wi-Fi anotada junto al router',
    reasons: [
      'Cualquier visitante puede leerla y conectarse a la red interna sin autorización.',
      'Una red comprometida expone a todos los equipos conectados a ella.',
    ],
  },
  {
    id: 'unlocked-screen',
    type: 'bad',
    label: 'Pantalla del computador',
    title: 'Pantalla desbloqueada con el correo abierto',
    reasons: [
      'Al alejarse del puesto sin bloquear el equipo, cualquiera puede leer correos y documentos abiertos.',
      'También permite que alguien actúe en tu nombre usando tu sesión activa.',
    ],
  },
  {
    id: 'webcam-uncovered',
    type: 'bad',
    label: 'Cámara web',
    title: 'Cámara web sin cubrir',
    reasons: [
      'Un malware tipo spyware podría activarla de forma remota sin que te des cuenta.',
      'Una simple pestaña o cubierta deslizable evita este riesgo a costo cero.',
    ],
  },
  {
    id: 'password-note',
    type: 'bad',
    label: 'Nota adhesiva en el monitor',
    title: 'Contraseña anotada en una nota pegada al monitor',
    reasons: [
      'Cualquiera que pase por el puesto puede leerla y usarla para acceder a tus cuentas.',
      'Las contraseñas nunca deben escribirse a la vista; usa un gestor de contraseñas.',
    ],
  },
  {
    id: 'unlocked-phone',
    type: 'bad',
    label: 'Teléfono móvil',
    title: 'Teléfono sin bloqueo de pantalla',
    reasons: [
      'Sin PIN, huella o rostro, cualquiera accede a correos, apps y datos personales o corporativos.',
      'Un teléfono desbloqueado es una puerta abierta a tu identidad digital.',
    ],
  },
  {
    id: 'confidential-docs',
    type: 'bad',
    label: 'Documentos sobre el escritorio',
    title: 'Documentos confidenciales a la vista',
    reasons: [
      'Rompe la política de "escritorio limpio": cualquier visitante podría leerlos o fotografiarlos.',
      'La información sensible debe guardarse bajo llave cuando no se está usando.',
    ],
  },
  {
    id: 'badge-left',
    type: 'bad',
    label: 'Gafete de acceso',
    title: 'Gafete de acceso olvidado sobre el escritorio',
    reasons: [
      'Cualquiera podría tomarlo y suplantar tu identidad para entrar a zonas restringidas.',
      'El gafete debe portarse siempre encima, nunca dejarse sobre el puesto.',
    ],
  },
  {
    id: 'unknown-usb',
    type: 'bad',
    label: 'Memoria USB',
    title: 'Memoria USB desconocida conectada al equipo',
    reasons: [
      'Un USB de origen desconocido puede contener malware que infecta el equipo al conectarse (BadUSB).',
      'Nunca conectes dispositivos de almacenamiento que no sean tuyos o de confianza.',
    ],
  },
  {
    id: 'open-drawer',
    type: 'bad',
    label: 'Cajón del escritorio',
    title: 'Cajón abierto con carpetas de nómina a la vista',
    reasons: [
      'Expone información confidencial de empleados a cualquiera que se acerque al puesto.',
      'Los documentos con datos personales o financieros deben guardarse bajo llave.',
    ],
  },
  {
    id: 'plant',
    type: 'good',
    label: 'Planta decorativa',
    title: 'Planta decorativa',
    reasons: ['No representa ningún riesgo, es solo un elemento decorativo del puesto de trabajo.'],
  },
  {
    id: 'notebook',
    type: 'good',
    label: 'Libreta de notas',
    title: 'Libreta de notas',
    reasons: [
      'Tomar notas en papel está bien siempre que no contengan contraseñas ni datos sensibles.',
    ],
  },
  {
    id: 'locked-cabinet',
    type: 'good',
    label: 'Archivador',
    title: 'Archivador cerrado con llave',
    reasons: [
      'Buena práctica: los documentos sensibles se guardan bajo llave cuando no se están usando.',
    ],
  },
];

export const badPracticesTotal = deskItems.filter((item) => item.type === 'bad').length;
