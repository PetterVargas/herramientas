import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PillarCards } from './_components/pillar-cards';
import { CiaQuiz } from './_components/cia-quiz';

const title = 'Tríada CIA';
const description =
  'Aprende e identifica de forma didáctica los tres pilares de la seguridad de la información: Confidencialidad, Integridad y Disponibilidad.';
const path = '/triada-cia';

export const metadata = buildMetadata({ title, description, path });

export default function TriadaCiaPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Tríada CIA"
        subtitle="Confidencialidad, Integridad y Disponibilidad: los tres pilares de la seguridad de la información."
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

          <TabsContent value="aprender">
            <PillarCards />
          </TabsContent>

          <TabsContent value="practicar">
            <CiaQuiz />
          </TabsContent>
        </Tabs>
      </ToolFullscreen>
    </div>
  );
}
