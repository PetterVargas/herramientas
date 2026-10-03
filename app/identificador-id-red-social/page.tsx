import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { SocialIdComponent } from './_components/social-id-component';

const title = 'Identificador de ID en Redes Sociales';
const description =
  'Obtén el ID numérico y la información pública de un perfil de Facebook, Instagram, TikTok o X, con reporte en PDF';
const path = '/identificador-id-red-social';

export const metadata = buildMetadata({ title, description, path });

export default function SocialIdPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Identificador de ID en Redes Sociales"
        subtitle="Obtén el ID numérico y la información pública de un perfil de Facebook, Instagram, TikTok o X y exporta el reporte en PDF"
      />

      <ToolFullscreen className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <SocialIdComponent />
        </div>
      </ToolFullscreen>
    </div>
  );
}
