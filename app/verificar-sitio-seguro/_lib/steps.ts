export type BrowserState = 'insecure' | 'secure' | 'domain-check' | 'certificate' | 'no-warnings' | 'verified';

export interface SiteStep {
  id: number;
  state: BrowserState;
  title: string;
  description: string;
}

export const steps: SiteStep[] = [
  {
    id: 1,
    state: 'insecure',
    title: 'Sin cifrado (HTTP)',
    description:
      'Esta conexión no está cifrada. Cualquier persona en la misma red podría leer o modificar los datos que envías, incluyendo contraseñas.',
  },
  {
    id: 2,
    state: 'secure',
    title: 'Conexión cifrada (HTTPS)',
    description:
      'Aparece el candado y el prefijo "https://": los datos viajan cifrados entre tu navegador y el sitio, y ya no pueden leerse en tránsito.',
  },
  {
    id: 3,
    state: 'domain-check',
    title: 'El dominio es exactamente el oficial',
    description:
      'HTTPS no basta: verifica que el dominio sea idéntico al oficial. Una variación como "mibanco-verificacion.com" es una señal clásica de phishing, aunque también use candado.',
  },
  {
    id: 4,
    state: 'certificate',
    title: 'Certificado digital válido',
    description:
      'Al revisar el certificado, confirma que fue emitido para ese dominio específico por una autoridad certificadora reconocida, y que sigue vigente.',
  },
  {
    id: 5,
    state: 'no-warnings',
    title: 'Sin advertencias del navegador',
    description:
      'El navegador no muestra alertas de contenido mixto ni de certificado inválido. Cualquier advertencia aquí debería detenerte de inmediato.',
  },
  {
    id: 6,
    state: 'verified',
    title: 'Sitio verificado como seguro',
    description:
      'Cifrado activo, dominio correcto, certificado válido y sin advertencias: ya puedes confiar en que la conexión con este sitio es segura.',
  },
];
