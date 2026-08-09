import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';

const title = 'CyberMap';
const description = 'Visualiza el panorama de amenazas y ciberataques en tiempo real.';
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
