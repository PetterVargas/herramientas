import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { CybersecurityCalendarComponent } from './cybersecurity-calendar-component';

export const metadata: Metadata = {
  title: 'Calendario de Ciberseguridad · Herramientas · DivisionCero',
  description: 'Descubre temas de ciberseguridad para cada día del año. Constancia.',
};

export default function CalendarPage() {
  return (
    <div>
      <ToolPageHeader
        title="Calendario de Ciberseguridad"
        subtitle="Descubre temas de ciberseguridad para cada día del año. Constancia."
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <CybersecurityCalendarComponent />
        </div>
      </div>
    </div>
  );
}
