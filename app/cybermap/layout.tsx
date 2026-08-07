import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CyberMap',
  description: 'Visualiza el panorama de amenazas y ciberataques en tiempo real.',
  alternates: { canonical: '/cybermap' },
};

export default function CyberMapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
