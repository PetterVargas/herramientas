import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { IcebreakerGrid } from './_components/icebreaker-grid';

const title = 'Rompehielos para equipos de Ciberseguridad';
const description =
  'Rompehielos para equipos de ciberseguridad: preguntas y dinámicas para conocerse mejor, divertirse y co-crear una cultura de seguridad en tu organización.';
const path = '/rompehielos';

export const metadata = buildMetadata({ title, description, path });

export default function RompehielosPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Rompehielos para equipos de Ciberseguridad"
        subtitle="Co-Creando Ciberseguridad, conocernos mejor y divertirnos juntos."
      />

      <ToolFullscreen className="container mx-auto max-w-7xl py-8">
        <IcebreakerGrid />
      </ToolFullscreen>
    </div>
  );
}
