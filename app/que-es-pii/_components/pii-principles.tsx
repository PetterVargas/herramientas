import { Info } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const principles = [
  {
    title: 'Minimización',
    description: 'Recolecta solo el dato que realmente necesitas para ese propósito específico, nada "por si acaso".',
  },
  {
    title: 'Limitación de propósito',
    description: 'Usa el dato únicamente para el fin que informaste a la persona al recolectarlo.',
  },
  {
    title: 'Limitación de retención',
    description: 'Define por cuánto tiempo se guarda cada dato y elimínalo cuando ya no sea necesario.',
  },
  {
    title: 'Seguridad por defecto',
    description: 'Cifra, controla el acceso y registra auditoría desde el diseño, no como un parche posterior.',
  },
];

export function PiiPrinciples() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Principios generales para proteger datos PII</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title} className="rounded-lg border p-4">
              <p className="mb-1 text-sm font-semibold">{principle.title}</p>
              <p className="text-muted-foreground text-sm">{principle.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
          <h4 className="mb-2 flex items-center gap-2 font-medium">
            <Info className="h-4 w-4 text-blue-600" />
            Marco regulatorio (referencia general, no asesoría legal)
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            La mayoría de países tienen leyes de protección de datos personales que exigen bases legales
            para tratar PII y refuerzan los requisitos para datos sensibles: el GDPR en la Unión Europea,
            la LGPD en Brasil, la Ley 1581 de 2012 (Habeas Data) en Colombia, la LFPDPPP en México, o la
            Ley 25.326 en Argentina, entre otras. Si manejas datos personales, valida siempre los
            requisitos específicos de tu jurisdicción con asesoría legal.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
