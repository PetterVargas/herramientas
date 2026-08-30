import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { QRGeneratorComponent } from './qr-generator-component';

const title = 'Generador de Códigos QR';
const description = 'Crea códigos QR personalizados para URLs, Whatsapp, emails y más';
const path = '/generador-qr';

export const metadata = buildMetadata({ title, description, path });

export default function QrGeneratorPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Generador de Códigos QR"
        subtitle="Crea códigos QR personalizados para URLs, Whatsapp, emails y más"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <QRGeneratorComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
