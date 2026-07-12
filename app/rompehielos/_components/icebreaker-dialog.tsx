'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { IcebreakerQuestion } from '../_lib/icebreaker-questions';

interface IcebreakerDialogProps {
  question: IcebreakerQuestion | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors = {
  personal: 'bg-blue-500',
  technical: 'bg-green-500',
  culture: 'bg-purple-500',
  fun: 'bg-orange-500',
};

const categoryLabels = {
  personal: 'Personal',
  technical: 'Técnico',
  culture: 'Cultura',
  fun: 'Diversión',
};

export function IcebreakerDialog({ question, isOpen, onClose }: IcebreakerDialogProps) {
  if (!question) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Pregunta #{question.id}</DialogTitle>
            <Badge className={categoryColors[question.category]}>
              {categoryLabels[question.category]}
            </Badge>
          </div>
          <DialogDescription className="pt-4 text-base">
            Esta es una pregunta rompehielos para conocer mejor a tu equipo de seguridad.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="bg-muted rounded-lg p-6">
            <p className="text-foreground text-lg leading-relaxed font-medium">
              {question.question}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
