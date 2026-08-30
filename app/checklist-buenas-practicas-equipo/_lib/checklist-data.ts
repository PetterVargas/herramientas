import type { ChecklistSectionData } from '@/components/checklist-group';

export const teamChecklistSections: ChecklistSectionData[] = [
  {
    id: 'contrasenas-accesos',
    title: 'Contraseñas y accesos',
    items: [
      {
        id: 'gestor-contrasenas',
        text: 'Cada colaborador usa un gestor de contraseñas aprobado por la empresa.',
      },
      {
        id: 'mfa-cuentas-criticas',
        text: 'Las cuentas críticas (correo, VPN, administración) tienen autenticación multifactor (MFA) activada.',
      },
      {
        id: 'sin-contrasenas-compartidas',
        text: 'No existen contraseñas compartidas entre varios colaboradores para un mismo sistema.',
      },
      {
        id: 'revocar-accesos-salida',
        text: 'Los accesos de quienes salen del equipo se revocan el mismo día.',
      },
      {
        id: 'revision-permisos',
        text: 'Se revisan periódicamente los permisos de acceso a repositorios y carpetas compartidas.',
      },
    ],
  },
  {
    id: 'dispositivos',
    title: 'Dispositivos y equipo de cómputo',
    items: [
      {
        id: 'actualizaciones-automaticas',
        text: 'Todos los equipos tienen el sistema operativo y las aplicaciones con actualizaciones automáticas.',
      },
      {
        id: 'bloqueo-pantalla',
        text: 'El bloqueo automático de pantalla está configurado en todos los dispositivos.',
      },
      {
        id: 'antivirus-edr',
        text: 'Los equipos cuentan con antivirus/EDR activo y actualizado.',
      },
      {
        id: 'disco-cifrado',
        text: 'El disco de cada equipo está cifrado (BitLocker, FileVault o equivalente).',
      },
      {
        id: 'software-catalogo',
        text: 'No se instala software fuera del catálogo aprobado por la empresa.',
      },
    ],
  },
  {
    id: 'red-remoto',
    title: 'Red y conexión remota',
    items: [
      {
        id: 'vpn-redes-publicas',
        text: 'El equipo usa VPN corporativa al conectarse desde redes públicas.',
      },
      {
        id: 'wifi-domestico-seguro',
        text: 'Las redes wifi domésticas de los colaboradores remotos usan contraseñas seguras, no las de fábrica.',
      },
      {
        id: 'sin-dispositivos-no-gestionados',
        text: 'Se evita el uso de dispositivos personales no gestionados para acceder a sistemas corporativos.',
      },
    ],
  },
  {
    id: 'correo-datos',
    title: 'Correo, navegación y datos',
    items: [
      {
        id: 'identificar-phishing',
        text: 'Los colaboradores saben identificar y reportar correos de phishing.',
      },
      {
        id: 'canal-reporte',
        text: 'Existe un canal claro y conocido para reportar correos o mensajes sospechosos.',
      },
      {
        id: 'permisos-controlados',
        text: 'Los documentos con información sensible se comparten con permisos controlados, no con enlaces públicos.',
      },
      {
        id: 'escritorio-limpio',
        text: 'Se aplica la política de "escritorio limpio": nada sensible a la vista al final del día.',
      },
    ],
  },
  {
    id: 'cultura-capacitacion',
    title: 'Cultura y capacitación',
    items: [
      {
        id: 'capacitacion-12-meses',
        text: 'El equipo recibió capacitación de concientización en ciberseguridad en los últimos 12 meses.',
      },
      {
        id: 'simulacros-phishing',
        text: 'Se han realizado simulacros de phishing u otros ejercicios de concientización.',
      },
      {
        id: 'saben-a-quien-contactar',
        text: 'Los colaboradores saben a quién contactar ante una duda o incidente de seguridad.',
      },
    ],
  },
];
