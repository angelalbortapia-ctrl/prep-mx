'use client';

import dynamic from 'next/dynamic';
import { Trophy } from 'lucide-react';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { IntegrityMetricBar } from '@/components/exam/IntegrityMetricBar';
import { SkeletonChart } from '@/components/ui/skeleton-body';
import { cn } from '@/lib/utils';

const AreaChartPanel = dynamic(
  () => import('@/components/simulador/resultado-feedback-chart').then((m) => m.ResultadoFeedbackChart),
  {
    ssr: false,
    loading: () => <SkeletonChart height={200} />,
  }
);

export interface MateriaBreakdownItem {
  materia: string;
  correct: number;
  total: number;
}

export interface ResultadoFeedbackProps {
  score: number;
  totalQuestions: number;
  materiaBreakdown?: MateriaBreakdownItem[];
  /** Porcentaje 0–100; si no se pasa, se calcula de score/total. */
  percentage?: number;
  integrityScore?: number;
  integrityBlurCount?: number;
  className?: string;
}

/**
 * Panel analítico post-examen con gráfica de área, línea de corte
 * institucional y banner de celebración si supera el umbral.
 */
export function ResultadoFeedback({
  score,
  totalQuestions,
  materiaBreakdown,
  percentage,
  integrityScore,
  integrityBlurCount,
  className,
}: ResultadoFeedbackProps) {
  const { entry, cutoffScore, filterId } = useUniTheme();

  const pct = percentage ?? (totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0);
  const scaledScore = Math.round((score / Math.max(totalQuestions, 1)) * 120);
  const aboveCutoff = scaledScore >= cutoffScore;

  const chartData =
    materiaBreakdown && materiaBreakdown.length > 0
      ? materiaBreakdown.map((m) => ({
          label: m.materia,
          puntaje: Math.round((m.correct / Math.max(m.total, 1)) * 120),
          meta: cutoffScore,
        }))
      : [
          { label: 'Inicio', puntaje: Math.max(0, scaledScore - 18), meta: cutoffScore },
          { label: 'Mitad', puntaje: Math.max(0, scaledScore - 8), meta: cutoffScore },
          { label: 'Final', puntaje: scaledScore, meta: cutoffScore },
        ];

  return (
    <div className={cn('space-y-5 text-left', className)}>
      {aboveCutoff ? (
        <div
          className="rounded-2xl border border-uni-accent/30 p-4 text-center"
          style={{
            background: `linear-gradient(135deg, hsl(var(--uni-primary) / 0.12), hsl(var(--uni-accent) / 0.18))`,
          }}
        >
          <p className="flex items-center justify-center gap-2 text-base font-bold text-uni-primary">
            <Trophy className="h-5 w-5 text-uni-accent" aria-hidden />
            ¡Puntaje de Selección: Estás dentro!
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Superaste el corte simulado de {entry.name} ({cutoffScore} pts).
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-200/70 bg-gradient-to-br from-red-50/80 to-muted/40 p-4 text-center dark:from-red-950/20">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            Por debajo del corte de {entry.name} ({cutoffScore} pts)
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Tu puntaje estimado: {scaledScore} pts — sigue practicando por materia.
          </p>
        </div>
      )}

      <div className="rounded-2xl border bg-card/80 p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">Progreso por bloque</span>
          <span className="text-muted-foreground">{filterId.toUpperCase()} · corte {cutoffScore}</span>
        </div>
        <AreaChartPanel
          data={chartData}
          cutoffScore={cutoffScore}
          aboveCutoff={aboveCutoff}
          primaryHex={entry.colors.primary}
          accentHex={entry.colors.accent}
        />
      </div>

      <dl className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-xl bg-muted/50 p-3">
          <dt className="text-xs text-muted-foreground">Aciertos</dt>
          <dd className="text-lg font-bold text-uni-primary">{score}/{totalQuestions}</dd>
        </div>
        <div className="rounded-xl bg-muted/50 p-3">
          <dt className="text-xs text-muted-foreground">Porcentaje</dt>
          <dd className="text-lg font-bold text-uni-primary">{pct}%</dd>
        </div>
        <div className="rounded-xl bg-muted/50 p-3">
          <dt className="text-xs text-muted-foreground">Pts estimados</dt>
          <dd className={cn('text-lg font-bold', aboveCutoff ? 'text-green-600' : 'text-red-600')}>
            {scaledScore}
          </dd>
        </div>
      </dl>

      {integrityScore !== undefined && integrityBlurCount !== undefined && (
        <IntegrityMetricBar score={integrityScore} blurCount={integrityBlurCount} />
      )}
    </div>
  );
}
