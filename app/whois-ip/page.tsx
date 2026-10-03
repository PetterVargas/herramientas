import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { WhoisIpComponent } from './_components/whois-ip-component';

const title = 'WHOIS de IP';
const description =
  'Consulta el WHOIS de una dirección IP: titular, rango, país, ASN y contacto de abuso, con reporte en PDF';
const path = '/whois-ip';

export const metadata = buildMetadata({ title, description, path });

export default function WhoisIpPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="WHOIS de IP"
        subtitle="Consulta el titular, rango, país, ASN y contacto de abuso de una dirección IP y exporta el reporte en PDF"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <WhoisIpComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
