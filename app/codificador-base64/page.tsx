import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { Base64EncoderComponent } from './base64-encoder-component';

const title = 'Codificador/Decodificador Base64';
const description = 'Convierte texto plano a Base64 y viceversa de forma segura';
const path = '/codificador-base64';

export const metadata = buildMetadata({ title, description, path });

export default function Base64Page() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Codificador/Decodificador Base64"
        subtitle="Convierte texto plano a Base64 y viceversa de forma segura"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <Base64EncoderComponent />
        </div>
      </div>
    </div>
  );
}
