import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { WhoisIpComponent } from './_components/whois-ip-component';

const title = 'WHOIS de IP y Dominio';
const description =
  'Consulta el WHOIS de una dirección IP o de un dominio: titular, rango, ASN, registrador, fechas de expiración, servidores DNS y contactos, con reporte en PDF';
const path = '/whois-ip-y-dominio';

export const metadata = buildMetadata({ title, description, path });

export default function WhoisIpPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="WHOIS de IP y Dominio"
        subtitle="Consulta el titular, rango y ASN de una dirección IP, o el registrador, fechas y servidores DNS de un dominio, y exporta el reporte en PDF"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <WhoisIpComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
