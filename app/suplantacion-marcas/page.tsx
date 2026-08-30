import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';

import { ImpersonationGallery } from './_components/impersonation-gallery';
import { ImpersonationChecklist } from './_components/impersonation-checklist';

const title = '10 ejemplos de suplantación de marcas';
const description =
  '10 ejemplos ilustrados de suplantación de marcas en Instagram, Facebook, WhatsApp, sitios web y más: cómo detectarlos y cómo verificar si una cuenta o sitio es oficial.';
const path = '/suplantacion-marcas';

export const metadata = buildMetadata({ title, description, path });

export default function SuplantacionMarcasPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="10 ejemplos de suplantación de marcas"
        subtitle="Cómo los estafadores imitan cuentas oficiales en redes sociales, WhatsApp y sitios web, y cómo verificar si algo es realmente de la marca."
      />

      <ToolFullscreen className="container mx-auto max-w-5xl space-y-8 px-4 py-8">
        <ImpersonationGallery />
        <ImpersonationChecklist />
      </ToolFullscreen>
    </div>
  );
}
