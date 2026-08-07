'use client';

import { useState } from 'react';
import { MessageSquare, Fish, Mail, RotateCcw, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { scenarios } from '../_lib/scenarios';

export function PhishingQuiz() {
  const [order] = useState(() => [...scenarios].sort(() => Math.random() - 0.5));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const scenario = order[index];
  const isLast = index === order.length - 1;
  const answered = answer !== null;
  const isCorrect = answered && answer === scenario.isPhishing;

  const handleAnswer = (saysPhishing: boolean) => {
    if (answered) return;
    setAnswer(saysPhishing);
    if (saysPhishing === scenario.isPhishing) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setIndex((i) => i + 1);
    setAnswer(null);
  };

  const handleRestart = () => {
    setIndex(0);
    setAnswer(null);
    setScore(0);
  };

  if (index >= order.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>¡Práctica completada!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Identificaste correctamente <span className="font-bold">{score}</span> de{' '}
            <span className="font-bold">{order.length}</span> mensajes.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reintentar
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-normal text-muted-foreground">
          Mensaje {index + 1} de {order.length}
        </CardTitle>
        <span className="text-sm font-semibold">
          Puntaje: {score}/{order.length}
        </span>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted overflow-hidden rounded-lg border">
          <div className="bg-background flex items-center gap-2 border-b px-4 py-3">
            {scenario.channel === 'email' ? (
              <Mail className="text-muted-foreground h-4 w-4 shrink-0" />
            ) : (
              <MessageSquare className="text-muted-foreground h-4 w-4 shrink-0" />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{scenario.from}</p>
              {scenario.subject && (
                <p className="text-muted-foreground truncate text-xs">{scenario.subject}</p>
              )}
            </div>
          </div>
          <p className="text-foreground/90 p-4 text-sm leading-relaxed whitespace-pre-line">
            {scenario.body}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className={cn(
              answered && scenario.isPhishing && 'border-green-500 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400',
              answered && answer === true && !scenario.isPhishing && 'border-red-500 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400',
            )}
            disabled={answered}
            onClick={() => handleAnswer(true)}
            data-test="answer-phishing"
          >
            <Fish className="mr-2 h-4 w-4" />
            Es Phishing
          </Button>
          <Button
            variant="outline"
            className={cn(
              answered && !scenario.isPhishing && 'border-green-500 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400',
              answered && answer === false && scenario.isPhishing && 'border-red-500 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400',
            )}
            disabled={answered}
            onClick={() => handleAnswer(false)}
            data-test="answer-legit"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Es Legítimo
          </Button>
        </div>

        {answered && (
          <div
            className={cn(
              'rounded-lg border-2 p-4 text-sm',
              isCorrect
                ? 'border-green-500 bg-green-50 dark:bg-green-950/50'
                : 'border-red-500 bg-red-50 dark:bg-red-950/50',
            )}
          >
            <p className="mb-2 font-semibold">{isCorrect ? '¡Correcto!' : 'No exactamente.'}</p>
            <p className="text-muted-foreground mb-3">{scenario.explanation}</p>
            <p className="mb-1 text-xs font-semibold tracking-wide uppercase">
              {scenario.isPhishing ? 'Señales de alerta' : 'Por qué es confiable'}
            </p>
            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              {scenario.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-3">
        {answered && (
          <Button onClick={handleNext}>{isLast ? 'Ver resultados' : 'Siguiente mensaje'}</Button>
        )}
        <Button onClick={handleRestart} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reiniciar
        </Button>
      </CardFooter>
    </Card>
  );
}
