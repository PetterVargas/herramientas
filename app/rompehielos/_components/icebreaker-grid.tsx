'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { IcebreakerQuestion, icebreakerQuestions } from '../_lib/icebreaker-questions';
import { IcebreakerDialog } from './icebreaker-dialog';

export function IcebreakerGrid() {
  const [selectedQuestion, setSelectedQuestion] = useState<IcebreakerQuestion | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<Set<number>>(new Set());

  const handleQuestionClick = (question: IcebreakerQuestion) => {
    setSelectedQuestion(question);
    setIsDialogOpen(true);
    setRevealedQuestions((prev) => new Set([...prev, question.id]));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleReset = () => {
    setRevealedQuestions(new Set());
    setSelectedQuestion(null);
  };

  const getCategoryColor = (category: IcebreakerQuestion['category']) => {
    switch (category) {
      case 'personal':
        return 'hover:bg-blue-100 dark:hover:bg-blue-950';
      case 'technical':
        return 'hover:bg-green-100 dark:hover:bg-green-950';
      case 'culture':
        return 'hover:bg-purple-100 dark:hover:bg-purple-950';
      case 'fun':
        return 'hover:bg-orange-100 dark:hover:bg-orange-950';
      default:
        return 'hover:bg-muted';
    }
  };

  const getRevealedColor = (category: IcebreakerQuestion['category']) => {
    switch (category) {
      case 'personal':
        return 'bg-blue-200 dark:bg-blue-900';
      case 'technical':
        return 'bg-green-200 dark:bg-green-900';
      case 'culture':
        return 'bg-purple-200 dark:bg-purple-900';
      case 'fun':
        return 'bg-orange-200 dark:bg-orange-900';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Progreso: {revealedQuestions.size}/100</h3>
            <p className="text-muted-foreground text-sm">
              Haz clic en cualquier cuadro para revelar una pregunta
            </p>
          </div>
          <Button variant="outline" onClick={handleReset}>
            Reiniciar
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-blue-500" />
            <span className="text-xs">Personal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-500" />
            <span className="text-xs">Técnico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-purple-500" />
            <span className="text-xs">Cultura</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-orange-500" />
            <span className="text-xs">Diversión</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="grid grid-cols-10 gap-3 md:gap-4">
          {icebreakerQuestions.map((question) => {
            const isRevealed = revealedQuestions.has(question.id);

            return (
              <button
                key={question.id}
                onClick={() => handleQuestionClick(question)}
                className={`border-border flex aspect-square min-h-[3.5rem] items-center justify-center rounded-lg border-2 text-lg font-bold transition-all md:min-h-[4rem] md:text-xl ${
                  isRevealed
                    ? getRevealedColor(question.category)
                    : `bg-background ${getCategoryColor(question.category)}`
                } focus:ring-ring hover:scale-105 focus:ring-2 focus:outline-none`}
                data-test={`question-${question.id}`}
                aria-label={`Pregunta ${question.id}`}
              >
                {question.id}
              </button>
            );
          })}
        </div>
      </Card>

      <IcebreakerDialog
        question={selectedQuestion}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
