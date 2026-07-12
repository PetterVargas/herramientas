import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { SPFValidatorComponent } from './spf-validator-component';

export const metadata: Metadata = {
  title: 'Validador SPF · Herramientas · DivisionCero',
  description: 'Verifica y valida los registros SPF de tu dominio para mejorar la seguridad del email',
};

export default function SpfValidatorPage() {
  return (
    <div>
      <ToolPageHeader
        title="Validador SPF"
        subtitle="Verifica y valida los registros SPF de tu dominio para mejorar la seguridad del email"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <SPFValidatorComponent />
        </div>
      </div>
    </div>
  );
}
