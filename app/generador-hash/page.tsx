import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { HashGeneratorComponent } from './hash-generator-component';

export const metadata: Metadata = {
  title: 'Generador de Hash · Herramientas · DivisionCero',
  description: 'Genera hashes MD5, SHA-1, SHA-256 y SHA-512 para verificación de integridad',
};

export default function HashGeneratorPage() {
  return (
    <div>
      <ToolPageHeader
        title="Generador de Hash"
        subtitle="Genera hashes MD5, SHA-1, SHA-256 y SHA-512 para verificación de integridad"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <HashGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
