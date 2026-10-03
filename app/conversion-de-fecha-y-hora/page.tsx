import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { DateTimeConverterComponent } from './_components/date-time-converter-component';

const title = 'Conversión de Fecha y Hora';
const description =
  'Convierte fecha y hora entre zonas horarias online: pasa de UTC a hora de Colombia (Bogotá, UTC-5), México, España y más, o convierte timestamps Unix.';
const path = '/conversion-de-fecha-y-hora';

export const metadata = buildMetadata({ title, description, path });

export default function DateTimeConverterPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Conversión de Fecha y Hora"
        subtitle="Convierte una fecha y hora entre zonas horarias, por ejemplo de UTC a Bogotá (UTC-5)"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <DateTimeConverterComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
