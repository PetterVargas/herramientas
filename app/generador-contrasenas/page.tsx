import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { PasswordGeneratorComponent } from './password-generator-component';

export const metadata: Metadata = {
  title: 'Generador de Contraseñas',
  description: 'Genera contraseñas fuertes y seguras para tus cuentas',
  alternates: { canonical: '/generador-contrasenas' },
};

export default function PasswordGeneratorPage() {
  return (
    <div>
      <ToolPageHeader
        title="Generador de contraseñas"
        subtitle="Genera contraseñas fuertes y seguras para tus cuentas"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <PasswordGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
