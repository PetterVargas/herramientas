'use client';

import { useState } from 'react';

import { CheckCircle2, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { PracticeItem } from '../_lib/practice-items';

interface PracticeDialogProps {
  item: PracticeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryLabels: Record<PracticeItem['category'], string> = {
  dispositivos: 'Dispositivos',
  contrasenas: 'Contraseñas',
  red: 'Red y Wi-Fi',
  correo: 'Correo y Phishing',
  fisica: 'Seguridad física',
  colaboracion: 'Colaboración',
};

const categoryBadgeColors: Record<PracticeItem['category'], string> = {
  dispositivos: 'bg-sky-500',
  contrasenas: 'bg-purple-500',
  red: 'bg-cyan-500',
  correo: 'bg-orange-500',
  fisica: 'bg-amber-500',
  colaboracion: 'bg-green-500',
};

// key={item.id} en el padre remonta este componente por cada práctica nueva,
// así "showAnswer" arranca en false sin necesitar un efecto que lo resetee.
function AnswerReveal({ item }: { item: PracticeItem }) {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!showAnswer) {
    return (
      <Button onClick={() => setShowAnswer(true)} data-test="reveal-answer">
        Revelar respuesta
      </Button>
    );
  }

  return (
    <div
      className={cn(
        'rounded-lg border-2 p-4',
        item.verdict === 'buena'
          ? 'border-green-500 bg-green-50 dark:bg-green-950/50'
          : 'border-red-500 bg-red-50 dark:bg-red-950/50',
      )}
      data-test="answer-reveal"
    >
      <p className="mb-2 flex items-center gap-2 font-semibold">
        {item.verdict === 'buena' ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            Buena práctica
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            Mala práctica
          </>
        )}
      </p>
      <p className="text-muted-foreground text-sm leading-relaxed">{item.explanation}</p>
    </div>
  );
}

export function PracticeDialog({ item, isOpen, onClose }: PracticeDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Práctica #{item.id}</DialogTitle>
            <Badge className={categoryBadgeColors[item.category]}>
              {categoryLabels[item.category]}
            </Badge>
          </div>
          <DialogDescription className="pt-4 text-base">
            Discutan en equipo: ¿es una buena o una mala práctica de ciberseguridad? ¿Por qué?
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted rounded-lg p-6">
          <p className="text-foreground text-lg leading-relaxed font-medium">{item.statement}</p>
        </div>

        <AnswerReveal key={item.id} item={item} />
      </DialogContent>
    </Dialog>
  );
}
