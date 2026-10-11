import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { TotpGeneratorComponent } from './totp-generator-component';

const title = 'Generador de Códigos TOTP';
const description =
  'Genera y verifica códigos TOTP (2FA) online a partir de una clave secreta Base32: configura dígitos, periodo y algoritmo (SHA-1, SHA-256, SHA-512), todo en tu navegador.';
const path = '/totp';

export const metadata = buildMetadata({ title, description, path });

export default function TotpGeneratorPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Generador de Códigos TOTP"
        subtitle="Genera códigos de verificación en dos pasos (2FA) a partir de una clave secreta"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <TotpGeneratorComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
