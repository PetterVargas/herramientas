import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { UuidGeneratorComponent } from './uuid-generator-component';

const title = 'Generador de UUID';
const description = 'Genera identificadores únicos universales (UUID v4) aleatorios';
const path = '/generador-uuid';

export const metadata = buildMetadata({ title, description, path });

export default function UuidGeneratorPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Generador de UUID"
        subtitle="Genera identificadores únicos universales (UUID v4) aleatorios"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <UuidGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
