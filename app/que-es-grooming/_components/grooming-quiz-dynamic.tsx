'use client';

import dynamic from 'next/dynamic';

import { Card, CardContent } from '@/components/ui/card';

export const GroomingQuizDynamic = dynamic(() => import('./grooming-quiz').then((m) => m.GroomingQuiz), {
  ssr: false,
  loading: () => (
    <Card>
      <CardContent className="text-muted-foreground py-12 text-center text-sm">
        Cargando situaciones...
      </CardContent>
    </Card>
  ),
});
