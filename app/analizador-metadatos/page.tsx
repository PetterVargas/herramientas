import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { MetadataAnalyzer } from './_components/metadata-analyzer';

const title = 'Analizador de Metadatos';
const description =
  'Analiza los metadatos ocultos de una imagen (EXIF, GPS), un PDF o un documento de Word/Excel/PowerPoint (autor, fechas, empresa) y descarga un reporte en PDF. Todo ocurre en tu navegador.';
const path = '/analizador-metadatos';

export const metadata = buildMetadata({ title, description, path });

export default function AnalizadorMetadatosPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Analizador de Metadatos"
        subtitle="Sube una imagen (PNG/JPG), un PDF o un documento ofimático y descubre qué metadatos oculta: autor, fechas, ubicación GPS, aplicación de origen y más."
      />

      <ToolFullscreen className="container mx-auto flex flex-col items-center px-4 py-8">
        <MetadataAnalyzer />
      </ToolFullscreen>
    </div>
  );
}
