import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { GroomingStageCards } from './_components/grooming-stage-cards';
import { GroomingGuidance } from './_components/grooming-guidance';
import { GroomingQuizDynamic } from './_components/grooming-quiz-dynamic';

const title = '¿Qué es el grooming?';
const description =
  'Herramienta educativa para padres, niños, niñas y adolescentes: identifica el grooming en línea, sus fases, señales de alerta y qué hacer.';
const path = '/que-es-grooming';

export const metadata = buildMetadata({ title, description, path });

export default function QueEsGroomingPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="¿Qué es el grooming?"
        subtitle="Cómo un adulto gana la confianza de un niño, niña o adolescente en línea para abusar de él o ella, y cómo detectarlo a tiempo."
      />

      <ToolFullscreen className="container mx-auto max-w-5xl space-y-8 px-4 py-8">
        <Tabs defaultValue="aprender">
          <TabsList>
            <TabsTrigger value="aprender" data-test="tab-aprender">
              Aprender
            </TabsTrigger>
            <TabsTrigger value="practicar" data-test="tab-practicar">
              Identificar (quiz)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="aprender" className="space-y-8">
            <GroomingStageCards />
            <GroomingGuidance />
          </TabsContent>

          <TabsContent value="practicar">
            <GroomingQuizDynamic />
          </TabsContent>
        </Tabs>
      </ToolFullscreen>
    </div>
  );
}
