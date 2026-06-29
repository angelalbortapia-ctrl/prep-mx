'use client';

import { Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PeerRankingResult } from '@/lib/gamification/ranking';

interface CareerRankingCardProps {
  ranking: PeerRankingResult;
  message?: string | null;
}

export function CareerRankingCard({ ranking, message }: CareerRankingCardProps) {
  const diff = ranking.userAccuracyPct - ranking.peerAveragePct;
  const diffLabel =
    diff > 0 ? `+${diff} pts` : diff < 0 ? `${diff} pts` : 'al promedio';

  return (
    <Card className="border-primary/15 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="h-5 w-5 text-primary" aria-hidden />
          Tu ranking de aspirantes
        </CardTitle>
        <CardDescription>
          Últimas {ranking.totalAnswers} respuestas vs {ranking.peerCount} aspirantes a{' '}
          {ranking.peerGroupLabel}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-bold tabular-nums text-primary">
              {ranking.userAccuracyPct}%
            </p>
            <p className="text-xs text-muted-foreground">tu % de aciertos</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold tabular-nums">{ranking.peerAveragePct}%</p>
            <p className="text-xs text-muted-foreground">promedio del grupo</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2 text-sm">
          <TrendingUp className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span>
            Top <strong>{ranking.percentile}%</strong> del grupo ·{' '}
            <strong className={diff >= 0 ? 'text-emerald-700' : 'text-amber-700'}>{diffLabel}</strong>
          </span>
        </div>

        {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      </CardContent>
    </Card>
  );
}
