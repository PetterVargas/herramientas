import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { CybersecurityCalendarComponent } from './cybersecurity-calendar-component';

const title = 'Calendario de Ciberseguridad';
const description =
  'Calendario de ciberseguridad: descubre un tema, consejo o efeméride de seguridad para cada día del año y construye el hábito de aprender con constancia.';
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

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <CybersecurityCalendarComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
