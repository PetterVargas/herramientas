import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { CybersecurityCalendarComponent } from './cybersecurity-calendar-component';

const title = 'Calendario de Ciberseguridad';
const description = 'Descubre temas de ciberseguridad para cada día del año. Constancia.';
const path = '/calendario-ciberseguridad';

export const metadata = buildMetadata({ title, description, path });

export default function CalendarPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
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
