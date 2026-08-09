import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { InboxSimulator } from './_components/inbox-simulator';

const title = 'Práctica: Correos Seguros vs. No Seguros';
const description =
  'Revisa una bandeja de entrada simulada y aprende a distinguir correos seguros de correos maliciosos.';
const path = '/identificador-correos-seguros';

export const metadata = buildMetadata({ title, description, path });

export default function IdentificadorCorreosSegurosPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Correos Seguros vs. No Seguros"
        subtitle="Revisa la bandeja de entrada simulada y marca cada correo como seguro o no seguro."
      />

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <InboxSimulator />
      </div>
    </div>
  );
}
