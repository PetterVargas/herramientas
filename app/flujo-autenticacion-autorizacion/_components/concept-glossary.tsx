import { KeyRound, ShieldCheck, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const concepts = [
  {
    icon: KeyRound,
    title: 'Autenticación',
    question: '¿Quién eres?',
    definition: 'Confirma que una identidad (persona, app o agente) es quien dice ser, validando una credencial.',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Users,
    title: 'Roles',
    question: '¿A qué grupo perteneces?',
    definition: 'Agrupan un conjunto de permisos y se asignan a una identidad ya autenticada.',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: ShieldCheck,
    title: 'Autorización',
    question: '¿Qué puedes hacer?',
    definition: 'Evalúa si el rol de esa identidad tiene permiso para la acción y el recurso solicitados.',
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
