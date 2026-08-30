import { Info, LifeBuoy, PhoneCall } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const parentTips = [
  {
    title: 'Habla sin juzgar',
    description:
      'Explica los riesgos sin generar vergüenza: si tu hijo o hija se siente juzgado, dejará de contarte lo que le pasa en línea.',
  },
  {
    title: 'Explica el marco legal',
    description:
      'Muchos adolescentes no saben que reenviar la foto de un compañero puede ser un delito grave, aunque "todos lo hagan".',
  },
  {
    title: 'Refuerza el consentimiento',
    description: 'Nadie —ni siquiera una pareja— tiene derecho a presionar u obligar a compartir contenido íntimo.',
  },
  {
    title: 'Si ya ocurrió, prioriza el apoyo',
    description:
      'Si tu hijo o hija fue víctima de difusión no consentida, la prioridad es su bienestar emocional y actuar rápido, no el castigo.',
  },
];

const kidsTips = [
  {
    title: 'Piensa antes de enviar',
    description: 'Una vez que envías algo, pierdes el control: puede reenviarse aunque confíes en quien lo recibe.',
  },
  {
    title: 'No reenvíes contenido de otros',
    description: 'Si te llega una imagen íntima de alguien, no la reenvíes ni comentes: bórrala y avísale a un adulto.',
  },
  {
    title: 'Nadie te puede presionar',
    description: 'Si alguien insiste, amenaza o se burla para que envíes algo íntimo, eso no es una relación sana.',
  },
  {
    title: 'Pedir ayuda no es un castigo',
    description: 'Si algo ya se compartió sin tu permiso, contárselo a un adulto de confianza es el primer paso para resolverlo.',
  },
];

export function SextingGuidance() {
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
          <CardTitle className="text-lg">Si una imagen íntima ya se compartió sin consentimiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
            <li>No culpes a quien aparece en la imagen: la responsabilidad es de quien la compartió sin permiso.</li>
            <li>Guarda evidencia (capturas, enlaces, nombres de usuario) antes de pedir que se elimine.</li>
            <li>Solicita la eliminación del contenido directamente en la plataforma donde se publicó.</li>
            <li>Usa herramientas como StopNCII.org para ayudar a evitar que la imagen se siga difundiendo.</li>
            <li>Denuncia ante las autoridades y busca acompañamiento psicológico si es necesario.</li>
          </ol>

          <div className="rounded-md bg-red-50 p-3 dark:bg-red-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <PhoneCall className="h-4 w-4 text-red-600" />
              Dónde denunciar y pedir ayuda (Colombia)
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
              <li>
                <strong>StopNCII.org</strong> — ayuda a prevenir la difusión de imágenes íntimas ya compartidas
              </li>
            </ul>
          </div>

          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Info className="h-4 w-4 text-blue-600" />
              Nota
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Esta información es educativa y no reemplaza asesoría legal, psicológica o policial. Verifica siempre
              los canales oficiales vigentes de tu país.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
