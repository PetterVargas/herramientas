import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { MuseumGallery } from './_components/museum-gallery';

const title = 'Museo del Cibercrimen';
const description = 'Una galería visual con hitos, personajes y momentos icónicos del cibercrimen.';
const path = '/museo-cibercrimen';

export const metadata = buildMetadata({ title, description, path });

export default function MuseoCibercrimenPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader title={title} subtitle={description} />

      <div className="container mx-auto px-4 py-12">
        <MuseumGallery />
      </div>
    </div>
  );
}
