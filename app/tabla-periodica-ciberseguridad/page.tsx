import type { Metadata } from 'next';
import { ToolPageHeader } from '@/components/tool-page-header';
import { PeriodicTable } from './_components/periodic-table';

export const metadata: Metadata = {
  title: 'Tabla Periódica de Ciberseguridad - Framework KUDO | Herramientas',
  description:
    'Explora la Tabla Periódica de Ciberseguridad basada en el Framework KUDO. Descubre 36 controles organizados en 8 dominios: Coherencia Organizacional, Aplicaciones, Continuidad, Infraestructura, Talento Humano, Identidad, Análisis y Respuesta, y Datos e IA.',
};

export default function TablaPeriodicaPage() {
  return (
    <>
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
