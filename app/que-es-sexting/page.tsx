import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { SextingRiskCards } from './_components/sexting-risk-cards';
import { SextingGuidance } from './_components/sexting-guidance';
import { SextingQuizDynamic } from './_components/sexting-quiz-dynamic';

const title = '¿Qué es el sexting?';
const description =
  'Herramienta educativa para que padres, niños, niñas y adolescentes entiendan los riesgos del sexting: pérdida de control, permanencia digital, consecuencias legales y presión, con casos prácticos.';
const path = '/que-es-sexting';

export const metadata = buildMetadata({ title, description, path });

export default function QueEsSextingPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="¿Qué es el sexting?"
        subtitle="El envío de mensajes, fotos o videos con contenido sexual, y los riesgos reales que implica compartirlos."
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
            <SextingRiskCards />
            <SextingGuidance />
          </TabsContent>

          <TabsContent value="practicar">
            <SextingQuizDynamic />
          </TabsContent>
        </Tabs>
      </ToolFullscreen>
    </div>
  );
}
