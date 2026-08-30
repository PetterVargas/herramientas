import { Info, LifeBuoy, PhoneCall } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const parentTips = [
  {
    title: 'Habla antes de que pase algo',
    description:
      'Conversa desde temprano sobre lo que es normal y lo que no en una amistad en línea, sin generar miedo, generando confianza para que te cuenten.',
  },
  {
    title: 'Ningún secreto con adultos en internet',
    description:
      'Enséñales que ningún adulto que valga la pena les pedirá guardar en secreto una conversación o una foto.',
  },
  {
    title: 'Configura la privacidad, no espíes',
    description:
      'Ayuda a configurar perfiles privados y controles parentales apropiados para la edad, en vez de revisar el celular a escondidas, lo que rompe la confianza.',
  },
  {
    title: 'Observa cambios de comportamiento',
    description:
      'Aislamiento repentino, secretismo con el celular, ansiedad al recibir mensajes o gastos/regalos que no puedes explicar son señales para conversar.',
  },
];

const kidsTips = [
  {
    title: 'Tu cuerpo y tus fotos son tuyos',
    description: 'Nadie tiene derecho a pedirte fotos o videos íntimos, sin importar lo que prometa a cambio.',
  },
  {
    title: 'Sospecha de quien pide secretos',
    description: 'Si alguien en línea te pide que no le cuentes a tus papás o amigos, es una señal de alerta.',
  },
  {
    title: 'No estás en problemas por contar',
    description: 'Si algo te incomodó o ya fue demasiado lejos, cuéntale a un adulto de confianza: no es tu culpa.',
  },
  {
    title: 'Guarda la evidencia, no la borres',
    description: 'Toma capturas de pantalla de la conversación antes de bloquear a la persona: sirven para denunciar.',
  },
];

export function GroomingGuidance() {
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
          <CardTitle className="text-lg">Si sospechas que un niño, niña o adolescente sufre grooming</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
            <li>No lo culpes ni lo regañes: necesita sentir que puede hablar sin miedo.</li>
            <li>Guarda evidencia: capturas de pantalla, nombres de usuario, números y fechas.</li>
            <li>No borres las conversaciones ni bloquees al contacto antes de denunciar.</li>
            <li>Reporta el perfil o la cuenta directamente en la plataforma donde ocurrió.</li>
            <li>Denuncia ante las autoridades y busca acompañamiento psicológico si es necesario.</li>
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
              inmediato para la integridad de un menor, contacta primero a la línea de emergencias de tu país y
              verifica siempre los canales oficiales vigentes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
