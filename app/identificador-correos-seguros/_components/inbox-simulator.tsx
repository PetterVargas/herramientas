'use client';

import { useMemo, useState } from 'react';
import { Check, Inbox, Link2, RotateCcw, ShieldAlert, ShieldCheck, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { emails } from '../_lib/emails';

export function InboxSimulator() {
  const [selectedId, setSelectedId] = useState(emails[0]!.id);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const selected = emails.find((e) => e.id === selectedId)!;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === emails.length;
  const score = useMemo(
    () => emails.filter((e) => answers[e.id] === e.isSafe).length,
    [answers],
  );
  const userAnswer = answers[selected.id];
  const hasAnswered = userAnswer !== undefined;
  const isCorrect = hasAnswered && userAnswer === selected.isSafe;

  const handleAnswer = (saysSafe: boolean) => {
    if (hasAnswered) return;
    setAnswers((prev) => ({ ...prev, [selected.id]: saysSafe }));
  };

  const goToNextUnanswered = () => {
    const next = emails.find((e) => answers[e.id] === undefined && e.id !== selected.id);
    if (next) setSelectedId(next.id);
  };

  const handleRestart = () => {
    setAnswers({});
    setSelectedId(emails[0]!.id);
  };

  return (
    <div className="w-full space-y-4">
      <Card className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5" />
          <span className="font-semibold">Bandeja de entrada</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {answeredCount}/{emails.length} revisados · {score} correctos
          </span>
          <Button onClick={handleRestart} variant="outline" size="sm">
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Reiniciar
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,320px)_1fr]">
        <Card className="overflow-hidden p-0">
          <ul className="divide-y">
            {emails.map((email) => {
              const emailAnswer = answers[email.id];
              const emailAnswered = emailAnswer !== undefined;
              const emailCorrect = emailAnswered && emailAnswer === email.isSafe;

              return (
                <li key={email.id}>
                  <button
                    onClick={() => setSelectedId(email.id)}
                    className={cn(
                      'hover:bg-muted flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                      email.id === selectedId && 'bg-muted',
                    )}
                    data-test={`inbox-item-${email.id}`}
                  >
                    <div
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                        !emailAnswered && 'bg-border',
                        emailAnswered && emailCorrect && 'bg-green-500',
                        emailAnswered && !emailCorrect && 'bg-red-500',
                      )}
                    >
                      {emailAnswered &&
                        (emailCorrect ? (
                          <Check className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-white" />
                        ))}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{email.senderName}</p>
                      <p className="truncate text-sm">{email.subject}</p>
                      <p className="text-muted-foreground truncate text-xs">{email.preview}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-lg font-semibold">{selected.subject}</p>
              <p className="text-muted-foreground mt-1 text-sm">
                <span className="font-medium">{selected.senderName}</span>{' '}
                <span className="font-mono">&lt;{selected.senderEmail}&gt;</span>
              </p>
            </div>

            <p className="text-sm leading-relaxed whitespace-pre-line">{selected.body}</p>

            {selected.link && (
              <div className="bg-muted rounded-md border p-3 text-sm">
                <div className="flex items-center gap-2 text-blue-600 underline dark:text-blue-400">
                  <Link2 className="h-3.5 w-3.5 shrink-0" />
                  {selected.link.text}
                </div>
                <p className="text-muted-foreground mt-1 font-mono text-xs break-all">
                  Destino real al pasar el cursor: {selected.link.href}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className={cn(
                  hasAnswered &&
                    selected.isSafe &&
                    'border-green-500 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400',
                  hasAnswered &&
                    userAnswer === true &&
                    !selected.isSafe &&
                    'border-red-500 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400',
                )}
                disabled={hasAnswered}
                onClick={() => handleAnswer(true)}
                data-test="mark-safe"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Marcar como seguro
              </Button>
              <Button
                variant="outline"
                className={cn(
                  hasAnswered &&
                    !selected.isSafe &&
                    'border-green-500 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400',
                  hasAnswered &&
                    userAnswer === false &&
                    selected.isSafe &&
                    'border-red-500 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400',
                )}
                disabled={hasAnswered}
                onClick={() => handleAnswer(false)}
                data-test="mark-unsafe"
              >
                <ShieldAlert className="mr-2 h-4 w-4" />
                Marcar como no seguro
              </Button>
            </div>

            {hasAnswered && (
              <div
                className={cn(
                  'rounded-lg border-2 p-4 text-sm',
                  isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/50'
                    : 'border-red-500 bg-red-50 dark:bg-red-950/50',
                )}
              >
                <p className="mb-2 font-semibold">
                  {isCorrect ? '¡Correcto!' : 'No exactamente.'} Este correo es{' '}
                  {selected.isSafe ? 'seguro' : 'no seguro'}.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1">
                  {selected.reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
                {!allAnswered && (
                  <Button onClick={goToNextUnanswered} size="sm" className="mt-3">
                    Siguiente correo sin revisar
                  </Button>
                )}
              </div>
            )}

            {allAnswered && (
              <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-4 text-sm">
                <p className="font-semibold">
                  Revisaste toda la bandeja: {score}/{emails.length} correctos.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
