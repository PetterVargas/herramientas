import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { WorkflowDiagram } from './_components/workflow-diagram';

export const metadata: Metadata = {
  title: 'Workflow de Ciberseguridad',
  description:
    'Un overview de cómo funciona, capacitar, optimizar y automatizar tus procesos de Ciberseguridad.',
  alternates: { canonical: '/workflow-ciberseguridad' },
};

export default function WorkflowPage() {
  return (
    <div className="flex flex-col space-y-12">
      <ToolPageHeader
        title="Workflow de Ciberseguridad"
        subtitle="Un overview de cómo funciona, capacitar, optimizar y automatizar tus procesos de Ciberseguridad."
      />

      <div className="w-full">
        <WorkflowDiagram />
      </div>
    </div>
  );
}
