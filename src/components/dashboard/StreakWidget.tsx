'use client';

import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StreakWidgetProps {
  days: number;
  studiedToday?: boolean;
  message?: string;
}

export function StreakWidget({ days, studiedToday = false, message }: StreakWidgetProps) {
  const defaultMessage =
    days <= 0
      ? 'Responde al menos una pregunta hoy para empezar tu racha.'
      : studiedToday
        ? days >= 7
          ? `¡${days} días seguidos! Modo Turbo activado.`
          : `¡Llevas ${days} día${days === 1 ? '' : 's'} estudiando — no rompas tu racha!`
        : `Llevas ${days} día${days === 1 ? '' : 's'} de racha — estudia hoy para mantenerla.`;

  return (
    <Card
      className={cn(
        'overflow-hidden',
        days >= 7 && 'border-orange-300/60 bg-gradient-to-br from-orange-500/10 to-transparent'
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Flame
            className={cn('h-5 w-5', days > 0 ? 'text-orange-500' : 'text-muted-foreground')}
            aria-hidden
          />
          Racha de estudio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tabular-nums">{days} días</p>
        <p className="mt-1 text-sm text-muted-foreground">{message ?? defaultMessage}</p>
        {studiedToday && days > 0 ? (
          <p className="mt-2 text-xs font-semibold text-emerald-700">✓ Ya estudiaste hoy</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
