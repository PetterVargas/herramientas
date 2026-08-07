import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { PasswordAnalyzer } from './_components/password-analyzer';

export const metadata: Metadata = {
  title: 'Analizador de Contraseñas',
  description:
    'Descubre cuánto tardaría un atacante en descifrar tu contraseña con la tecnología actual.',
  alternates: { canonical: '/analizador-contrasenas' },
};

export default function AnalizadorContrasenasPage() {
  return (
    <div>
      <ToolPageHeader
        title="Analizador de Contraseñas"
        subtitle="Descubre cuánto tardaría un atacante en descifrar tu contraseña con la tecnología actual."
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <PasswordAnalyzer />
        </div>
      </div>
    </div>
  );
}
