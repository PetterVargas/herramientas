import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { PhishingQuiz } from './_components/phishing-quiz';

export const metadata: Metadata = {
  title: 'Práctica: Detección de Phishing',
  description:
    'Practica identificando mensajes de phishing reales vs. legítimos en correos y SMS.',
  alternates: { canonical: '/deteccion-phishing' },
};

export default function DeteccionPhishingPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolPageHeader
        title="Práctica: Detección de Phishing"
        subtitle="Analiza cada mensaje y decide si es un intento de phishing o un mensaje legítimo."
      />

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <PhishingQuiz />
      </div>
    </div>
  );
}
