import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { HashGeneratorComponent } from './hash-generator-component';

const title = 'Generador de Hash';
const description = 'Genera hashes MD5, SHA-1, SHA-256 y SHA-512 para verificación de integridad';
const path = '/generador-hash';

export const metadata = buildMetadata({ title, description, path });

export default function HashGeneratorPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Generador de Hash"
        subtitle="Genera hashes MD5, SHA-1, SHA-256 y SHA-512 para verificación de integridad"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <HashGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
