'use client';

import Link from 'next/link';
import { Clock, Coins, GraduationCap, Lock } from 'lucide-react';
import { useState } from 'react';
import { PaywallSheet } from '@/components/paywall/PaywallSheet';
import { TokenBalanceBadge } from '@/components/exam/TokenBalanceBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { availableExams, type ExamConfig } from '@/data/exams';
import { filterToUniId } from '@/lib/uni-theme-config';
import type { UniId } from '@/lib/uni-theme-config';

function examFilterToUniId(exam: ExamConfig): UniId {
  if (exam.universidad === 'general') return 'todos';
  return exam.universidad;
}

export function SimulacrosList() {
  const { hasAccess, canFreeDiagnostic, hydrated } = useSubscription();
  const [paywallUni, setPaywallUni] = useState<UniId | null>(null);

  return (
    <>
      <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/30 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          <Coins className="mr-1 inline h-4 w-4" aria-hidden />
          Cada simulacro completo consume 1 crédito.
        </p>
        <TokenBalanceBadge />
      </div>

      <div className="space-y-4">
        {availableExams.map((exam) => {
          const uniId = examFilterToUniId(exam);
          const locked = hydrated && !hasAccess(uniId);

          return (
            <Card key={exam.id} className={locked ? 'relative overflow-hidden' : undefined}>
              {locked && (
                <div className="pointer-events-none absolute inset-0 z-10 bg-background/40 backdrop-blur-[1px]" />
              )}
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="text-lg">{exam.name}</CardTitle>
                  <div className="flex gap-2">
                    {exam.isOfficial && <Badge variant="warning">Basado en examen real</Badge>}
                    {locked && (
                      <Badge variant="secondary" className="gap-1">
                        <Lock className="h-3 w-3" />
                        Plan requerido
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative z-20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {exam.totalQuestions} preguntas
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {exam.durationMins} min
                  </span>
                </div>
                {locked ? (
                  <Button
                    type="button"
                    className="h-11 rounded-xl active:scale-95"
                    onClick={() => setPaywallUni(uniId)}
                  >
                    Desbloquear
                  </Button>
                ) : (
                  <Button asChild className="h-11 rounded-xl active:scale-95">
                    <Link href={`/dashboard/simulacros/${exam.id}`}>Iniciar</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {paywallUni && (
        <PaywallSheet
          open={Boolean(paywallUni)}
          onOpenChange={(open) => !open && setPaywallUni(null)}
          uniId={paywallUni}
          freeDiagnosticAvailable={canFreeDiagnostic(paywallUni)}
          onStartFreeDiagnostic={() => {
            window.location.href = `/simulador-gratis?uni=${paywallUni === 'todos' ? 'todas' : paywallUni}&freemium=diagnostico`;
          }}
        />
      )}
    </>
  );
}
