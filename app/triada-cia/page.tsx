import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PillarCards } from './_components/pillar-cards';
import { CiaQuiz } from './_components/cia-quiz';

export const metadata: Metadata = {
  title: 'Tríada CIA: Confidencialidad, Integridad y Disponibilidad',
  description:
    'Aprende e identifica de forma didáctica los tres pilares de la seguridad de la información: Confidencialidad, Integridad y Disponibilidad.',
  alternates: { canonical: '/triada-cia' },
};

export default function TriadaCiaPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolPageHeader
        title="Tríada CIA"
        subtitle="Confidencialidad, Integridad y Disponibilidad: los tres pilares de la seguridad de la información."
      />

      <div className="container mx-auto max-w-5xl space-y-8 px-4 py-8">
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
      </div>
    </div>
  );
}
