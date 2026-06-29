'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientFormattedDate } from '@/components/ui/ClientFormattedDate';
import { resolveSm2ReviewTitle } from '@/lib/format-date';
import { useClientMounted } from '@/hooks/useClientMounted';
import type { Sm2SummaryResponse } from '@/hooks/useSm2Summary';

interface Sm2ReviewSummaryProps {
  sm2?: Sm2SummaryResponse;
  isAuthenticated: boolean;
}

export function Sm2ReviewSummary({ sm2, isAuthenticated }: Sm2ReviewSummaryProps) {
  const mounted = useClientMounted();

  const dueTomorrow = sm2?.dueTomorrow ?? 0;
  const dueToday = sm2?.dueToday ?? 0;
  const nextReviewAt = sm2?.nextReviewAt ?? null;

  const title = mounted
    ? resolveSm2ReviewTitle(nextReviewAt, dueTomorrow, dueToday)
    : isAuthenticated
      ? '—'
      : 'Demo';

  const detail = sm2?.nextTopic
    ? `${sm2.nextTopic} · ${dueTomorrow} preguntas`
    : isAuthenticated
      ? 'Completa un simulacro para activar SM-2'
      : 'Estequiometría · 12 preguntas (demo)';

  const showExplicitDate =
    mounted && Boolean(nextReviewAt) && dueTomorrow > 0 && (title === 'Hoy' || title === 'Mañana');

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Próximo repaso SM-2</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-3xl font-bold" suppressHydrationWarning>
          {title}
        </p>
        <p className="text-sm text-muted-foreground">{detail}</p>
        {showExplicitDate && nextReviewAt ? (
          <p className="text-xs text-muted-foreground">
            Siguiente repaso:{' '}
            <ClientFormattedDate isoDate={nextReviewAt} className="font-medium text-foreground/80" />
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
