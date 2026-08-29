import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { IpInfoComponent } from './ip-info-component';

const title = '¿Cuál es mi IP?';
const description =
  'Descubre tu dirección IP pública, tu ubicación aproximada, fecha de conexión y datos de tu navegador. Descarga un reporte en PDF firmado con su hash SHA-256.';
const path = '/cual-es-mi-ip';

export const metadata = buildMetadata({ title, description, path });

export default function CualEsMiIpPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="¿Cuál es mi IP?"
        subtitle="Consulta la información pública que expone tu conexión al visitar esta página."
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <IpInfoComponent />
        </div>
      </div>
    </div>
  );
}
