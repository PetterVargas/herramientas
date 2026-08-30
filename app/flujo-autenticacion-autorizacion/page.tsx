import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolFullscreen } from '@/components/tool-fullscreen';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';

import { ConceptGlossary } from './_components/concept-glossary';
import { AuthFlowDiagram } from './_components/auth-flow-diagram';
import { ComparisonCards } from './_components/comparison-cards';
import { roleComparison, authComparison } from './_lib/comparisons';

const title = 'Flujo de Autenticación, Autorización y Roles';
const description =
  'Cómo funcionan la autenticación, la autorización y los roles (fijos o personalizados) en accesos por API y por MCP, explicado paso a paso para negocio y producto.';
const path = '/flujo-autenticacion-autorizacion';

export const metadata = buildMetadata({ title, description, path });

export default function FlujoAutenticacionAutorizacionPage() {
  return (
    <div className="flex flex-col space-y-8">
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Flujo de Autenticación, Autorización y Roles"
        subtitle="Entiende paso a paso cómo se valida una identidad, se resuelve su rol y se autorizan sus acciones — en accesos por API y por MCP."
      />

      <ToolFullscreen className="container mx-auto max-w-5xl space-y-12 px-4 py-8">
        <ConceptGlossary />

        <div className="flex flex-col items-center">
          <AuthFlowDiagram />
        </div>

        <div className="space-y-10">
          <ComparisonCards title="Roles fijos vs. roles personalizados" items={roleComparison} />
          <ComparisonCards title="Autenticación por API vs. por MCP" items={authComparison} />
        </div>
      </ToolFullscreen>
    </div>
  );
}
