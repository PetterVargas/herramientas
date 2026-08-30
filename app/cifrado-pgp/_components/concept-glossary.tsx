import { FileSignature, KeyRound, Lock } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const concepts = [
  {
    icon: KeyRound,
    title: 'Clave pública',
    question: '¿Quién puede tenerla?',
    definition:
      'Se comparte libremente, incluso publicándola. Sirve para que otros te cifren mensajes o verifiquen tus firmas.',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Lock,
    title: 'Clave privada',
    question: '¿Quién puede tenerla?',
    definition:
      'Nunca se comparte con nadie. Sirve para descifrar los mensajes dirigidos a ti y para firmar los tuyos.',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: FileSignature,
    title: 'Firma digital',
    question: '¿Para qué sirve?',
    definition:
      'Un hash del mensaje cifrado con tu clave privada. Cualquiera puede verificarlo con tu clave pública.',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
];

export function ConceptGlossary() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {concepts.map((concept) => (
        <Card key={concept.title}>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <concept.icon className={`h-6 w-6 shrink-0 ${concept.color}`} />
            <div>
              <CardTitle className="text-base">{concept.title}</CardTitle>
              <p className="text-muted-foreground text-xs">{concept.question}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{concept.definition}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
