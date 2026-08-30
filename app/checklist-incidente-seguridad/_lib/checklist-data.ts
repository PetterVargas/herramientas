import type { ChecklistSectionData } from '@/components/checklist-group';

export const collaboratorSections: ChecklistSectionData[] = [
  {
    id: 'deteccion-inicial',
    title: 'Detección inicial',
    items: [
      {
        id: 'detente',
        text: 'Detente: no sigas interactuando con el correo, enlace o archivo sospechoso.',
      },
      {
        id: 'no-apagar',
        text: 'No apagues ni reinicies el equipo si crees que está comprometido.',
        help: 'Apagarlo puede borrar evidencia que el equipo de seguridad necesita para investigar.',
      },
      {
        id: 'desconectar-red',
        text: 'Desconecta el equipo de la red (wifi o cable) si sospechas de malware activo, sin apagarlo.',
      },
    ],
  },
  {
    id: 'reporte',
    title: 'Reporte',
    items: [
      {
        id: 'reportar-inmediato',
        text: 'Reporta el incidente de inmediato a tu líder y/o al canal de seguridad definido por la empresa.',
      },
      {
        id: 'describir-que-paso',
        text: 'Describe qué pasó, cuándo y qué hiciste (clic en enlace, descarga de archivo, etc.).',
      },
      {
        id: 'conservar-evidencia',
        text: 'Conserva evidencia: no borres correos, capturas de pantalla ni mensajes relacionados.',
      },
    ],
  },
  {
    id: 'contencion-personal',
    title: 'Contención personal',
    items: [
      {
        id: 'cambiar-contrasenas',
        text: 'Cambia de inmediato las contraseñas de las cuentas que puedan estar comprometidas, desde otro dispositivo si es posible.',
      },
      {
        id: 'revisar-sesiones-activas',
        text: 'Revisa si hay sesiones activas desconocidas en tus cuentas y ciérralas.',
      },
      {
        id: 'dispositivo-perdido',
        text: 'Si perdiste un dispositivo corporativo, repórtalo de inmediato para bloquearlo o borrarlo remotamente.',
      },
    ],
  },
  {
    id: 'seguimiento-colaborador',
    title: 'Seguimiento',
    items: [
      {
        id: 'seguir-instrucciones',
        text: 'Sigue las instrucciones del equipo de seguridad o de tu líder durante la investigación.',
      },
      {
        id: 'no-comentar-fuera-canales',
        text: 'No comentes detalles del incidente fuera de los canales oficiales mientras se investiga.',
      },
    ],
  },
];

export const leaderSections: ChecklistSectionData[] = [
  {
    id: 'activacion-contencion',
    title: 'Activación y contención',
    items: [
      {
        id: 'activar-protocolo',
        text: 'Confirma el reporte y activa el protocolo de respuesta a incidentes de la empresa.',
      },
      {
        id: 'aislar-sistemas',
        text: 'Aísla los sistemas o cuentas afectadas (revoca accesos, desconecta equipos) en coordinación con seguridad.',
      },
      {
        id: 'identificar-alcance',
        text: 'Identifica qué otros colaboradores o sistemas podrían estar afectados.',
      },
    ],
  },
  {
    id: 'comunicacion',
    title: 'Comunicación',
    items: [
      {
        id: 'informar-partes-interesadas',
        text: 'Informa a las partes interesadas necesarias (seguridad, TI, dirección) según el protocolo definido.',
      },
      {
        id: 'mantener-informado-colaborador',
        text: 'Mantén informado al colaborador afectado sobre los próximos pasos, sin generar pánico.',
      },
      {
        id: 'evitar-canales-comprometidos',
        text: 'Evita comunicar detalles sensibles del incidente por canales que podrían estar comprometidos (ej. el mismo correo afectado).',
      },
    ],
  },
  {
    id: 'investigacion-evidencia',
    title: 'Investigación y evidencia',
    items: [
      {
        id: 'documentar-linea-tiempo',
        text: 'Documenta la línea de tiempo del incidente: qué se detectó, cuándo y qué acciones se tomaron.',
      },
      {
        id: 'preservar-logs',
        text: 'Preserva logs, correos y evidencia relevante antes de que se pierdan o sobrescriban.',
      },
      {
        id: 'colaborar-forense',
        text: 'Colabora con el equipo de seguridad/forense para determinar el alcance real del incidente.',
      },
    ],
  },
  {
    id: 'recuperacion-cierre',
    title: 'Recuperación y cierre',
    items: [
      {
        id: 'restaurar-backups-limpios',
        text: 'Restaura los sistemas afectados desde copias de seguridad limpias cuando sea necesario.',
      },
      {
        id: 'rotar-credenciales',
        text: 'Verifica que las contraseñas y accesos comprometidos fueron rotados antes de dar el sistema por recuperado.',
      },
      {
        id: 'retrospectiva',
        text: 'Realiza una retrospectiva (post-mortem) del incidente para identificar mejoras y evitar que se repita.',
      },
    ],
  },
];
