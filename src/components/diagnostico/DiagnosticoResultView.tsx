'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WeaknessRadar } from '@/components/dashboard/WeaknessRadar';
import { fetchExamSubmitStatus } from '@/lib/exam-submit-status';
import { readDiagnosticResult, type StoredDiagnosticResult } from '@/lib/pending-diagnostic';
import type { ExamSessionSummary } from '@/lib/supabase/exam-session';

interface DiagnosticoResultProps {
  feedbackId: string;
  serverSummary: ExamSessionSummary | null;
}

export function DiagnosticoResultView({ feedbackId, serverSummary }: DiagnosticoResultProps) {
  const [localSummary, setLocalSummary] = useState<StoredDiagnosticResult | null>(null);
  const [polledSummary, setPolledSummary] = useState<ExamSessionSummary | null>(serverSummary);
  const [polling, setPolling] = useState(!serverSummary);

  useEffect(() => {
    setLocalSummary(readDiagnosticResult(feedbackId));
  }, [feedbackId]);

  useEffect(() => {
    setPolledSummary(serverSummary);
    setPolling(!serverSummary);
  }, [serverSummary, feedbackId]);

  useEffect(() => {
    if (!polling) return;

    let cancelled = false;
    const timer = setInterval(() => {
      void fetchExamSubmitStatus(feedbackId).then((status) => {
        if (cancelled || status.status !== 'completed' || !status.summary) return;
        setPolledSummary(status.summary);
        setPolling(false);
      });
    }, 2000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [polling, feedbackId]);

  const activeSummary = polledSummary;

  const summary = activeSummary
    ? {
        score: activeSummary.score,
        total: activeSummary.total,
        percentage: activeSummary.percentage,
        weakest: activeSummary.weakestMateria,
        fromDb: true,
      }
    : localSummary
      ? {
          score: localSummary.score,
          total: localSummary.total,
          percentage: localSummary.percentage,
          weakest: localSummary.weakestMateria,
          fromDb: localSummary.source === 'supabase',
        }
      : null;

  const isDemo = !summary && !polling;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Badge className="mb-2">Diagnóstico #{feedbackId.slice(0, 8)}</Badge>
        <h1 className="text-2xl font-bold">Resultado de tu simulacro</h1>
        <p className="mt-1 text-muted-foreground">
          {polling
            ? 'Procesando SM-2 y diagnóstico en segundo plano…'
            : summary?.fromDb
              ? 'Guardado en Supabase con repaso SM-2 programado.'
              : summary
                ? 'Resultado de tu diagnóstico gratuito — XP y SM-2 activos en tu cuenta.'
                : 'Vista demo — completa el simulador gratis y el onboarding para ver tu resultado.'}
        </p>
      </div>

      {polling && (
        <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Sincronizando con Supabase (Inngest)…
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Puntaje general</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">
            {summary ? `${summary.percentage}%` : polling ? '…' : '—'}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {summary
              ? `Acertaste ${summary.score} de ${summary.total} preguntas${
                  summary.weakest ? ` · Revisa ${summary.weakest.replace(/_/g, ' ')}` : ''
                }`
              : polling
                ? 'Calculando resultados finales…'
                : 'Fortaleza en Geometría · Debilidad crítica en Estequiometría (demo)'}
          </p>
        </CardContent>
      </Card>

      {isDemo ? <WeaknessRadar /> : null}

      <Card>
        <CardHeader>
          <CardTitle>{isDemo ? 'Recomendación IA (demo)' : 'Próximo paso'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          {isDemo ? (
            <>
              <p>
                Prioriza estequiometría los próximos 3 días. Tu tasa de error supera el 60% en
                balanceo de ecuaciones y moles-masa.
              </p>
              <p>Mantén práctica de geometría 1 día por semana — es tu área más fuerte.</p>
            </>
          ) : (
            <p>
              {polling
                ? 'En cuanto termine el procesamiento recibirás un correo con recomendaciones por materia.'
                : 'Repasa las materias con más errores y vuelve a simular en unos días. El diagnóstico con IA detallado llegará en una lección futura.'}
            </p>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="h-11 rounded-xl">
              <Link href="/dashboard/plan">Ver plan de estudio</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl">
              <Link href="/dashboard/simulacros">Nuevo simulacro</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
