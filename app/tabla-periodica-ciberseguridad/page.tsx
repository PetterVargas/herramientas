import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { PeriodicTable } from './_components/periodic-table';

const title = 'Tabla Periódica de Ciberseguridad - Framework KUDO';
const description =
  'Explora la Tabla Periódica de Ciberseguridad basada en el Framework KUDO. Descubre 36 controles organizados en 8 dominios: Coherencia Organizacional, Aplicaciones, Continuidad, Infraestructura, Talento Humano, Identidad, Análisis y Respuesta, y Datos e IA.';
const path = '/tabla-periodica-ciberseguridad';

export const metadata = buildMetadata({ title, description, path });

export default function TablaPeriodicaPage() {
  return (
    <>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Tabla Periódica de Ciberseguridad"
        subtitle="Basado en el Framework Kudo aplicado para el contexto de LatAm"
      />

      <div className="container mx-auto py-6">
        <PeriodicTable />
      </div>
    </>
  );
}
