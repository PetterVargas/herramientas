import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { MuseumGallery } from './_components/museum-gallery';

const title = 'Museo del Cibercrimen';
const description =
  'Museo del Cibercrimen: una galería visual con los hitos, hackers, malware y ciberataques más icónicos de la historia, explicados para aprender de ellos.';
const path = '/museo-cibercrimen';

export const metadata = buildMetadata({ title, description, path });

export default function MuseoCibercrimenPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title={title}
        subtitle="Una galería visual con hitos, personajes y momentos icónicos del cibercrimen."
      />

      <ToolFullscreen className="container mx-auto px-4 py-12">
        <MuseumGallery />
      </ToolFullscreen>
    </div>
  );
}
