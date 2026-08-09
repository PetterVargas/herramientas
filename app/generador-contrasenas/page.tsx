import { ToolPageHeader } from '@/components/tool-page-header';
import { ToolJsonLd } from '@/components/tool-json-ld';
import { buildMetadata } from '@/lib/seo';
import { PasswordGeneratorComponent } from './password-generator-component';

const title = 'Generador de Contraseñas';
const description = 'Genera contraseñas fuertes y seguras para tus cuentas';
const path = '/generador-contrasenas';

export const metadata = buildMetadata({ title, description, path });

export default function PasswordGeneratorPage() {
  return (
    <div>
      <ToolJsonLd title={title} description={description} path={path} />
      <ToolPageHeader
        title="Generador de contraseñas"
        subtitle="Genera contraseñas fuertes y seguras para tus cuentas"
      />

      <div className="container mx-auto">
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <PasswordGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
