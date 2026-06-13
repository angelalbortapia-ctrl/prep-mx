'use client';

import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StreakWidgetProps {
  days: number;
}

export function StreakWidget({ days }: StreakWidgetProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Flame className="h-5 w-5 text-orange-500" />
          Racha de estudio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{days} días</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {days >= 7 ? '¡Modo Turbo desbloqueado!' : 'Estudia hoy para mantener tu racha'}
        </p>
      </CardContent>
    </Card>
  );
}
