import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { UrlEncoderComponent } from './url-encoder-component';

export const metadata: Metadata = {
  title: 'Codificador/Decodificador URL · Herramientas · DivisionCero',
  description: 'Convierte caracteres especiales en URLs de forma segura',
};

export default function UrlEncoderPage() {
  return (
    <div>
      <ToolPageHeader
        title="Codificador/Decodificador URL"
        subtitle="Convierte caracteres especiales en URLs de forma segura"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <UrlEncoderComponent />
        </div>
      </div>
    </div>
  );
}
