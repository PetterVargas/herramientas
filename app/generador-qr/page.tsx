import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { QRGeneratorComponent } from './qr-generator-component';

export const metadata: Metadata = {
  title: 'Generador de Códigos QR · Herramientas · DivisionCero',
  description: 'Crea códigos QR personalizados para URLs, Whatsapp, emails y más',
};

export default function QrGeneratorPage() {
  return (
    <div>
      <ToolPageHeader
        title="Generador de Códigos QR"
        subtitle="Crea códigos QR personalizados para URLs, Whatsapp, emails y más"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <QRGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
