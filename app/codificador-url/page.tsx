import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { UrlEncoderComponent } from './url-encoder-component';

const title = 'Codificador/Decodificador URL';
const description = 'Convierte caracteres especiales en URLs de forma segura';
const path = '/codificador-url';

export const metadata = buildMetadata({ title, description, path });

export default function UrlEncoderPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Codificador/Decodificador URL"
        subtitle="Convierte caracteres especiales en URLs de forma segura"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <UrlEncoderComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
