'use client';

import { useMemo, useState } from 'react';

import { Calendar, ChevronLeft, ChevronRight, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heading } from '@/components/ui/heading';

interface CybersecurityTopic {
  title: string;
  description: string;
  activities: string[];
  resources: string[];
}

// Temas de ciberseguridad para cada día del año
const cybersecurityTopics: Record<string, CybersecurityTopic> = {
  '1-1': {
    title: 'Año Nuevo Seguro',
    description: 'Comienza el año estableciendo buenas prácticas de seguridad digital.',
    activities: [
      'Actualiza todas tus contraseñas principales',
      'Revisa la configuración de privacidad en redes sociales',
      'Instala actualizaciones pendientes en todos tus dispositivos',
    ],
    resources: ['Guía de gestores de contraseñas', 'Checklist de seguridad digital'],
  },
  '1-2': {
    title: 'Auditoría de Cuentas',
    description: 'Revisa todas tus cuentas online y elimina las que no uses.',
    activities: [
      'Haz una lista de todas tus cuentas online',
      'Elimina cuentas que no utilices',
      'Actualiza información de contacto en cuentas importantes',
    ],
    resources: ['Herramientas para encontrar cuentas olvidadas', 'Proceso de eliminación segura de cuentas'],
  },
  '1-3': {
    title: 'Configuración de 2FA',
    description: 'Activa la autenticación de dos factores en todas tus cuentas importantes.',
    activities: [
      'Instala una app de autenticación como Google Authenticator',
      'Activa 2FA en email, redes sociales y banca',
      'Guarda códigos de respaldo en lugar seguro',
    ],
    resources: ['Comparación de apps de autenticación', 'Guía de configuración de 2FA'],
  },
};

const generalTopics: CybersecurityTopic[] = [
  {
    title: 'Actualización de Software',
    description: 'Mantén tu software actualizado para protegerte de vulnerabilidades.',
    activities: [
      'Verificar actualizaciones del sistema',
      'Actualizar aplicaciones críticas',
      'Revisar parches de seguridad',
    ],
    resources: ['Guía de actualizaciones automáticas', 'Lista de software crítico'],
  },
  {
    title: 'Backup y Recuperación',
    description: 'Asegura tus datos importantes con copias de seguridad regulares.',
    activities: [
      'Realizar backup de archivos importantes',
      'Probar proceso de recuperación',
      'Verificar integridad de backups',
    ],
    resources: ['Mejores prácticas de backup', 'Herramientas de backup recomendadas'],
  },
  {
    title: 'Phishing y Ingeniería Social',
    description: 'Aprende a identificar y evitar ataques de phishing.',
    activities: [
      'Practicar identificación de emails sospechosos',
      'Revisar configuración de filtros de spam',
      'Educarse sobre técnicas de ingeniería social',
    ],
    resources: ['Simuladores de phishing', 'Guía de detección de estafas'],
  },
];

// Genera los temas de todo el año una sola vez por sesión (useMemo con
// dependencias vacías): antes se regeneraba en cada render, así que el tema
// asignado a un día cambiaba cada vez que se navegaba de mes.
function generateYearlyTopics(): Record<string, CybersecurityTopic> {
  const topics = { ...cybersecurityTopics };

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(2024, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${month}-${day}`;
      if (!topics[key]) {
        const randomTopic = generalTopics[Math.floor(Math.random() * generalTopics.length)];
        if (randomTopic) {
          topics[key] = randomTopic;
        }
      }
    }
  }

  return topics;
}

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function CybersecurityCalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allTopics = useMemo(() => generateYearlyTopics(), []);

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const todayYear = today.getFullYear();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const key = `${currentMonth + 1}-${day}`;
    setSelectedDay(key);
    setShowDialog(true);
  };

  const selectedTopic = selectedDay ? allTopics[selectedDay] : null;

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-12"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${currentMonth + 1}-${day}`;
    const hasTopic = allTopics[key];

    const isToday = currentYear === todayYear && currentMonth === todayMonth && day === todayDay;

    let buttonClasses =
      'h-12 w-full rounded-md border transition-all duration-200 hover:scale-105 hover:shadow-md ';

    if (isToday && hasTopic) {
      buttonClasses +=
        'bg-primary/30 border-primary text-primary font-bold ring-2 ring-primary/50 shadow-lg';
    } else if (isToday) {
      buttonClasses +=
        'bg-blue-100 border-blue-300 text-blue-700 font-semibold ring-2 ring-blue-300 dark:bg-blue-950/50 dark:border-blue-600 dark:text-blue-300';
    } else if (hasTopic) {
      buttonClasses += 'bg-primary/10 border-primary/50 hover:bg-primary/20 text-primary font-semibold';
    } else {
      buttonClasses += 'bg-muted border-muted-foreground/20 hover:bg-muted/80';
    }

    calendarDays.push(
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        className={buttonClasses}
        title={isToday ? 'Hoy' : undefined}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-sm">{day}</span>
          {hasTopic && <Shield className="mt-1 h-3 w-3" />}
          {isToday && !hasTopic && (
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
          )}
        </div>
      </button>,
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-card rounded-lg border p-6">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Heading level={2} className="text-2xl font-bold">
            {monthNames[currentMonth]} {currentYear}
          </Heading>

          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4 grid grid-cols-7 gap-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-muted-foreground flex h-8 items-center justify-center font-semibold"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">{calendarDays}</div>

        <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 border-primary/50 h-4 w-4 rounded border"></div>
            <span>Día con tema de ciberseguridad</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded border border-blue-300 bg-blue-100 ring-1 ring-blue-300 dark:border-blue-600 dark:bg-blue-950/50"></div>
            <span>Día actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="text-primary h-4 w-4" />
            <span>Haz clic para ver detalles</span>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{selectedTopic?.title}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedTopic && (
            <div className="space-y-6">
              <DialogDescription className="text-muted-foreground">
                {selectedTopic.description}
              </DialogDescription>

              <div>
                <h4 className="mb-3 font-semibold">Actividades Recomendadas:</h4>
                <ul className="list-inside list-disc space-y-2">
                  {selectedTopic.activities.map((activity, index) => (
                    <li key={index} className="text-sm">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 font-semibold">Recursos Útiles:</h4>
                <ul className="list-inside list-disc space-y-2">
                  {selectedTopic.resources.map((resource, index) => (
                    <li key={index} className="text-primary text-sm">
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
