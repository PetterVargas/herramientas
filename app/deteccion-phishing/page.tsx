import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { PhishingQuiz } from './_components/phishing-quiz';

const title = 'Práctica: Detección de Phishing';
const description =
  'Practica identificando mensajes de phishing reales vs. legítimos en correos y SMS.';
const path = '/deteccion-phishing';

export const metadata = buildMetadata({ title, description, path });

export default function DeteccionPhishingPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Práctica: Detección de Phishing"
        subtitle="Analiza cada mensaje y decide si es un intento de phishing o un mensaje legítimo."
      />

      <ToolFullscreen className="container mx-auto max-w-2xl px-4 py-8">
        <PhishingQuiz />
      </ToolFullscreen>
    </div>
  );
}
