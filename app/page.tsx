import { HeroBackground } from '@/components/hero-background';
import { ToolsSearch } from '@/components/tools-search';
import { ToolsByCategory } from '@/components/tools-by-category';
import { tools } from '@/lib/tools';

const siteUrl = 'https://herramientas.divisioncero.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Herramientas · DivisionCero',
      url: siteUrl,
      description: 'Herramientas gratuitas de Ciberseguridad para el día a día, por DivisionCero.',
      publisher: {
        '@type': 'Organization',
        name: 'DivisionCero',
        url: 'https://divisioncero.com',
      },
    },
    {
      '@type': 'ItemList',
      itemListElement: tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.title,
        description: tool.description,
        url: tool.external ? tool.href : `${siteUrl}${tool.href}`,
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <HeroBackground className="fixed inset-0 w-full h-full pointer-events-none opacity-90" />

      <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-primary mb-3">Herramientas · DivisionCero</p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Herramientas para el día a día
          </h1>
        </div>

        <ToolsSearch tools={tools} />
      </div>

      <ToolsByCategory tools={tools} />
    </main>
  );
}
