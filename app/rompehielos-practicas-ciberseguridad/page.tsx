import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { PracticeGrid } from './_components/practice-grid';

const title = 'Rompehielos: Buenas y Malas Prácticas';
const description =
  'Dinámica de equipo para discutir si cada práctica sobre dispositivos, contraseñas, red, correo y procesos es buena o mala, y descubrir por qué.';
const path = '/rompehielos-practicas-ciberseguridad';

export const metadata = buildMetadata({ title, description, path });

export default function RompehielosPracticasCiberseguridadPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Rompehielos: Buenas y Malas Prácticas"
        subtitle="Discutan en equipo si cada práctica de ciberseguridad es buena o mala, y descubran por qué."
      />

      <div className="container mx-auto max-w-7xl py-8">
        <PracticeGrid />
      </div>
    </div>
  );
}
