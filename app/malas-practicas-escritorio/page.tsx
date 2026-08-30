import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { DeskScene } from './_components/desk-scene';

const title = 'Buenas Prácticas en el Puesto de Trabajo';
const description =
  'Encuentra las 10 malas prácticas de seguridad en un puesto de trabajo simulado y descubre por qué cada una representa un riesgo.';
const path = '/malas-practicas-escritorio';

export const metadata = buildMetadata({ title, description, path });

export default function MalasPracticasEscritorioPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Buenas Prácticas en el Puesto de Trabajo"
        subtitle="Haz clic en cada mala práctica de seguridad que encuentres en el escritorio."
      />

      <ToolFullscreen className="container mx-auto max-w-5xl px-4 py-8">
        <DeskScene />
      </ToolFullscreen>
    </div>
  );
}
