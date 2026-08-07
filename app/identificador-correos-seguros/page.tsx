import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { InboxSimulator } from './_components/inbox-simulator';

export const metadata: Metadata = {
  title: 'Práctica: Correos Seguros vs. No Seguros',
  description:
    'Revisa una bandeja de entrada simulada y aprende a distinguir correos seguros de correos maliciosos.',
  alternates: { canonical: '/identificador-correos-seguros' },
};

export default function IdentificadorCorreosSegurosPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolPageHeader
        title="Correos Seguros vs. No Seguros"
        subtitle="Revisa la bandeja de entrada simulada y marca cada correo como seguro o no seguro."
      />

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <InboxSimulator />
      </div>
    </div>
  );
}
