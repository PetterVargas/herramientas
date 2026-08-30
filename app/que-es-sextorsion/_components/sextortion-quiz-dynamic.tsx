'use client';

import dynamic from 'next/dynamic';

import { Card, CardContent } from '@/components/ui/card';

export const SextortionQuizDynamic = dynamic(() => import('./sextortion-quiz').then((m) => m.SextortionQuiz), {
  ssr: false,
  loading: () => (
    <Card>
      <CardContent className="text-muted-foreground py-12 text-center text-sm">
        Cargando situaciones...
      </CardContent>
    </Card>
  ),
});
