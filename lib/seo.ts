import type { Metadata } from 'next';

export const siteName = 'Herramientas · DivisionCero';
export const siteUrl = 'https://herramientas.divisioncero.com';

/**
 * Metadata por página: además del title/description para buscadores, define
 * openGraph/twitter propios para que los links compartidos (WhatsApp, Slack,
 * LinkedIn, X...) muestren el título y la descripción de la herramienta en
 * lugar de heredar siempre los genéricos de la home.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogTitle = `${title} · Herramientas · DivisionCero`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName,
      type: 'website',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  };
}
