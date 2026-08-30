'use client';

import dynamic from 'next/dynamic';

import { Card, CardContent } from '@/components/ui/card';

export const SextingQuizDynamic = dynamic(() => import('./sexting-quiz').then((m) => m.SextingQuiz), {
  ssr: false,
  loading: () => (
    <Card>
      <CardContent className="text-muted-foreground py-12 text-center text-sm">
        Cargando situaciones...
      </CardContent>
    </Card>
  ),
});
