import { Info, LifeBuoy, PhoneCall } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const generalTips = [
  {
    title: 'La insignia de verificado no lo es todo',
    description:
      'En varias plataformas la insignia azul puede comprarse: no es una prueba definitiva de que la cuenta sea auténtica.',
  },
  {
    title: 'Revisa el dominio letra por letra',
    description:
      'Los sitios falsos suelen cambiar una letra, agregar guiones o usar otra terminación (.net, .info, .shop) en vez del dominio oficial.',
  },
  {
    title: 'Desconfía de precios y premios irreales',
    description: 'Descuentos extremos, sorteos inesperados o "regalos" que piden pago son señales clásicas de fraude.',
  },
  {
    title: 'Ve directo a la fuente oficial',
    description:
      'Ante cualquier duda, entra al sitio web oficial escribiendo tú mismo la dirección, en vez de usar el enlace que te llegó.',
  },
  {
    title: 'Ninguna marca pide claves o frases semilla',
    description:
      'Contraseñas, códigos OTP, números completos de tarjeta o frases semilla de criptomonedas nunca se piden por chat o redes sociales.',
  },
  {
    title: 'La urgencia es una táctica, no una casualidad',
    description: 'Plazos cortos y amenazas buscan que actúes sin verificar: tomarte un minuto extra es gratis.',
  },
];

export function ImpersonationChecklist() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cómo verificar si una cuenta o sitio es oficial</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {generalTips.map((tip) => (
            <div key={tip.title} className="rounded-lg border p-4">
              <p className="mb-1 text-sm font-semibold">{tip.title}</p>
              <p className="text-muted-foreground text-sm">{tip.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <LifeBuoy className="h-5 w-5 text-red-600" />
          <CardTitle className="text-lg">Si encontraste un perfil o sitio que suplanta una marca</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
            <li>No hagas clic en enlaces ni realices pagos, aunque parezca urgente.</li>
            <li>Guarda capturas de pantalla del perfil, sitio o mensaje como evidencia.</li>
            <li>Reporta la cuenta o publicación directamente en la plataforma donde la viste.</li>
            <li>Avisa a la marca real a través de sus canales oficiales de seguridad o fraude.</li>
            <li>Si ya compartiste datos o hiciste un pago, contacta a tu banco de inmediato y denuncia.</li>
          </ol>

          <div className="rounded-md bg-red-50 p-3 dark:bg-red-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <PhoneCall className="h-4 w-4 text-red-600" />
              Dónde denunciar (Colombia)
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-red-800 dark:text-red-200">
              <li>
                <strong>Policía Nacional</strong> — CAI Virtual: caivirtual.policia.gov.co, o línea de emergencia 123
              </li>
              <li>
                <strong>CCIT / ColCERT</strong> — canal de reporte de incidentes de ciberseguridad del país
              </li>
              <li>
                Cada red social tiene un formulario propio para reportar cuentas de suplantación: revísalo en su
                centro de ayuda oficial
              </li>
            </ul>
          </div>

          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Info className="h-4 w-4 text-blue-600" />
              Nota
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Los ejemplos de esta herramienta son ilustrativos, inspirados en patrones reales y ampliamente
              documentados de fraude, no capturas de casos reales de una marca específica. Verifica siempre los
              canales oficiales vigentes de cada plataforma y de tu país.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
