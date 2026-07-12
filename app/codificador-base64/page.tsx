import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { Base64EncoderComponent } from './base64-encoder-component';

export const metadata: Metadata = {
  title: 'Codificador/Decodificador Base64 · Herramientas · DivisionCero',
  description: 'Convierte texto plano a Base64 y viceversa de forma segura',
};

export default function Base64Page() {
  return (
    <div>
      <ToolPageHeader
        title="Codificador/Decodificador Base64"
        subtitle="Convierte texto plano a Base64 y viceversa de forma segura"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <Base64EncoderComponent />
        </div>
      </div>
    </div>
  );
}
