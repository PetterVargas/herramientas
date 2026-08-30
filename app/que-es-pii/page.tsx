import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PiiCategoryCards } from './_components/pii-category-cards';
import { PiiPrinciples } from './_components/pii-principles';
import { PiiQuizDynamic } from './_components/pii-quiz-dynamic';

const title = '¿Qué es un dato PII?';
const description =
  'Aprende qué es información de identificación personal (PII): identificadores directos, cuasi-identificadores y datos sensibles, con ejemplos y buenas prácticas.';
const path = '/que-es-pii';

export const metadata = buildMetadata({ title, description, path });

export default function QueEsPiiPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="¿Qué es un dato PII?"
        subtitle="Información de Identificación Personal: qué la hace PII, qué la hace sensible, y cómo protegerla."
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
            <PiiCategoryCards />
            <PiiPrinciples />
          </TabsContent>

          <TabsContent value="practicar">
            <PiiQuizDynamic />
          </TabsContent>
        </Tabs>
      </ToolFullscreen>
    </div>
  );
}
