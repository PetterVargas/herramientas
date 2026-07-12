import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { IcebreakerGrid } from './_components/icebreaker-grid';

export const metadata: Metadata = {
  title: 'Rompehielos para equipos de Ciberseguridad · Herramientas · DivisionCero',
  description: 'Co-Creando Ciberseguridad, conocernos mejor y divertirnos juntos.',
};

export default function RompehielosPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolPageHeader
        title="Rompehielos para equipos de Ciberseguridad"
        subtitle="Co-Creando Ciberseguridad, conocernos mejor y divertirnos juntos."
      />

      <div className="container mx-auto max-w-7xl py-8">
        <IcebreakerGrid />
      </div>
    </div>
  );
}
