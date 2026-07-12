import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { UuidGeneratorComponent } from './uuid-generator-component';

export const metadata: Metadata = {
  title: 'Generador de UUID · Herramientas · DivisionCero',
  description: 'Genera identificadores únicos universales (UUID v4) aleatorios',
};

export default function UuidGeneratorPage() {
  return (
    <div>
      <ToolPageHeader
        title="Generador de UUID"
        subtitle="Genera identificadores únicos universales (UUID v4) aleatorios"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <UuidGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
