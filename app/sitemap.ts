import type { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';
import { tools } from '@/lib/tools';

export const dynamic = 'force-static';

const siteUrl = 'https://herramientas.divisioncero.com';

// Fecha del último commit que tocó la ruta, para que el sitemap no diga que
// todo cambió en cada build. Si git no está disponible se omite el campo.
function getGitLastModified(contentPath: string): Date | undefined {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', contentPath], {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).trim();
    return output ? new Date(output) : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes: MetadataRoute.Sitemap = tools
    .filter((tool) => !tool.external)
    .map((tool) => ({
      url: `${siteUrl}${tool.href}`,
      lastModified: getGitLastModified(`app${tool.href}`),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: getGitLastModified('lib/tools.ts'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...toolRoutes,
  ];
}
