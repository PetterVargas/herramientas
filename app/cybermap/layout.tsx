import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';

const title = 'CyberMap';
const description = 'CyberMap: mapa mundial interactivo de ciberseguridad para visualizar el panorama de amenazas, ciberataques y el perfil de ciberseguridad de cada país.';
const path = '/cybermap';

export const metadata = buildMetadata({ title, description, path });

export default function CyberMapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd title={title} description={description} path={path} />
      {children}
    </>
  );
}
