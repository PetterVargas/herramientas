import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { SPFValidatorComponent } from './spf-validator-component';

const title = 'Validador SPF';
const description = 'Verifica y valida los registros SPF de tu dominio para mejorar la seguridad del email';
const path = '/validador-spf';

export const metadata = buildMetadata({ title, description, path });

export default function SpfValidatorPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Validador SPF"
        subtitle="Verifica y valida los registros SPF de tu dominio para mejorar la seguridad del email"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <SPFValidatorComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
