import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';

const siteUrl = 'https://herramientas.divisioncero.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes: MetadataRoute.Sitemap = tools
    .filter((tool) => !tool.external)
    .map((tool) => ({
      url: `${siteUrl}${tool.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...toolRoutes,
  ];
}
