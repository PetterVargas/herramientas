import { Info, LifeBuoy, PhoneCall } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const parentTips = [
  {
    title: 'Explica que puede pasarle a cualquiera',
    description:
      'La sextorsión afecta a personas de todas las edades y no es señal de descuido: cualquiera puede ser blanco de un engaño bien planeado.',
  },
  {
    title: 'Refuerza que pagar no soluciona nada',
    description: 'Explica desde antes que ceder a un chantaje casi nunca detiene la amenaza, solo la alimenta.',
  },
  {
    title: 'Prepara una reacción sin pánico',
    description: 'Acuerda con tu hijo o hija que, si algo así pasa, lo primero es avisarte, sin miedo al castigo.',
  },
  {
    title: 'Aprende sobre deepfakes',
    description: 'Explícales que hoy existen imágenes falsas hechas con IA a partir de fotos normales de redes sociales.',
  },
];

const kidsTips = [
  {
    title: 'No es tu culpa',
    description: 'Si alguien te engañó o amenaza con tu imagen, la responsabilidad es del extorsionador, no tuya.',
  },
  {
    title: 'No pagues ni envíes más contenido',
    description: 'Ceder no hace que la amenaza desaparezca: casi siempre el atacante vuelve a pedir más.',
  },
  {
    title: 'No borres las pruebas',
    description: 'Guarda capturas de pantalla del perfil, el número y los mensajes antes de bloquear a la persona.',
  },
  {
    title: 'Pide ayuda de inmediato',
    description: 'Cuéntale a un adulto de confianza apenas sospeches algo raro, no esperes a que la amenaza sea real.',
  },
];

export function SextortionGuidance() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Para madres, padres y cuidadores</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {parentTips.map((tip) => (
            <div key={tip.title} className="rounded-lg border p-4">
              <p className="mb-1 text-sm font-semibold">{tip.title}</p>
              <p className="text-muted-foreground text-sm">{tip.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Para niños, niñas y adolescentes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {kidsTips.map((tip) => (
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
          <CardTitle className="text-lg">Si estás siendo víctima de sextorsión ahora mismo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
            <li>Deja de responder al chantaje: no pagues ni envíes más contenido.</li>
            <li>No borres la conversación ni el perfil: guarda capturas como evidencia.</li>
            <li>Bloquea al atacante solo después de guardar la evidencia necesaria.</li>
            <li>Reporta el perfil o la cuenta directamente en la plataforma donde ocurrió.</li>
            <li>Denuncia ante las autoridades y busca acompañamiento psicológico: no estás solo o sola.</li>
          </ol>

          <div className="rounded-md bg-red-50 p-3 dark:bg-red-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <PhoneCall className="h-4 w-4 text-red-600" />
              Dónde denunciar (Colombia)
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-red-800 dark:text-red-200">
              <li>
                <strong>NCMEC CyberTipline</strong>: report.cybertip.org
              </li>
              <li>
                <strong>ICBF</strong> — Línea de orientación a niños, niñas y adolescentes: 141
              </li>
              <li>
                <strong>Policía Nacional</strong> — CAI Virtual: caivirtual.policia.gov.co, o línea de emergencia 123
              </li>
            </ul>
          </div>

          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Info className="h-4 w-4 text-blue-600" />
              Nota
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Esta información es educativa y no reemplaza asesoría legal, psicológica o policial. Si hay riesgo
              inmediato, contacta primero a la línea de emergencias de tu país y verifica siempre los canales
              oficiales vigentes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
