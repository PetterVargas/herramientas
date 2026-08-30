'use client';

import dynamic from 'next/dynamic';

import { Card, CardContent } from '@/components/ui/card';

export const PiiQuizDynamic = dynamic(() => import('./pii-quiz').then((m) => m.PiiQuiz), {
  ssr: false,
  loading: () => (
    <Card>
      <CardContent className="text-muted-foreground py-12 text-center text-sm">
        Cargando escenarios...
      </CardContent>
    </Card>
  ),
});
