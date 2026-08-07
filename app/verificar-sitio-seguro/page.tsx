import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { SecureSiteAnimation } from './_components/secure-site-animation';

export const metadata: Metadata = {
  title: '¿Es Seguro Este Sitio?',
  description:
    'Animación paso a paso que muestra cómo verificar que un sitio web es seguro: HTTPS, dominio, certificado y más.',
  alternates: { canonical: '/verificar-sitio-seguro' },
};

export default function VerificarSitioSeguroPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolPageHeader
        title="¿Es Seguro Este Sitio?"
        subtitle="Una animación paso a paso de las señales que confirman que un sitio web es seguro."
      />

      <div className="container mx-auto flex flex-col items-center px-4 py-8">
        <SecureSiteAnimation />
      </div>
    </div>
  );
}
