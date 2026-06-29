'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Target, XCircle } from 'lucide-react';
import {
  ADMISSION_EXAM_REACTIVOS,
  careersForUniversity,
} from '@/data/career-admission-cutoffs';
import { UNI_COLORS } from '@/data/university-comparison';
import {
  cutoffLabel,
  gapToCutoff,
  qualifiesForAdmission,
  uamTotalPoints,
} from '@/lib/career-admission-simulator';
import { studyHeading, studySubtext } from '@/lib/study-appearance-styles';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

const UNIS: Universidad[] = ['unam', 'ipn', 'uam'];

const PRESETS = [70, 85, 95, 105, 112] as const;

interface AccuracySimulatorProps {
  dark?: boolean;
  className?: string;
}

export function AccuracySimulator({ dark = false, className }: AccuracySimulatorProps) {
  const [aciertos, setAciertos] = useState(85);
  const [activeUni, setActiveUni] = useState<Universidad>('unam');
  const [promedioPrepa, setPromedioPrepa] = useState(9);

  const careers = useMemo(() => careersForUniversity(activeUni), [activeUni]);

  const simulatorInput = useMemo(
    () => ({
      aciertos,
      totalReactivos: ADMISSION_EXAM_REACTIVOS,
      promedioPrepa,
    }),
    [aciertos, promedioPrepa]
  );

  const classified = useMemo(
    () =>
      careers.map((career) => {
        const qualifies = qualifiesForAdmission(career, simulatorInput);
        const gap = gapToCutoff(career, simulatorInput);
        return { career, qualifies, gap };
      }),
    [careers, simulatorInput]
  );

  const reachable = classified.filter((row) => row.qualifies);
  const below = classified.filter((row) => !row.qualifies);
  const pct = Math.round((aciertos / ADMISSION_EXAM_REACTIVOS) * 100);

  const uamPoints =
    activeUni === 'uam' ? uamTotalPoints(aciertos, ADMISSION_EXAM_REACTIVOS, promedioPrepa) : null;

  return (
    <section className={className} aria-labelledby="accuracy-simulator-title">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Simulador de aciertos</p>
          <h2 id="accuracy-simulator-title" className={cn('mt-1 text-lg font-bold', studyHeading(dark))}>
            ¿A qué carreras llegas con tu puntaje?
          </h2>
          <p className={cn('mt-1 text-sm', studySubtext(dark))}>
            Mueve la barra y mira en tiempo real qué cortes históricos alcanzas (datos orientativos 2025–2026).
          </p>
        </div>
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold tabular-nums',
            dark ? 'border-zinc-700 bg-zinc-900 text-zinc-100' : 'border-border bg-muted/60'
          )}
        >
          <Target className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span>
            {reachable.length} sí · {below.length} no
          </span>
        </div>
      </div>

      <div
        className={cn(
          'rounded-2xl border p-4 md:p-5',
          dark ? 'border-zinc-800 bg-zinc-950/80' : 'border-border bg-muted/30'
        )}
      >
        <label htmlFor="aciertos-slider" className="block text-sm font-medium">
          Si saco{' '}
          <strong className="text-2xl font-black tabular-nums text-primary">{aciertos}</strong> aciertos
          en el simulacro{' '}
          <span className={studySubtext(dark)}>(de {ADMISSION_EXAM_REACTIVOS} · {pct}%)</span>
        </label>

        <input
          id="aciertos-slider"
          type="range"
          min={0}
          max={ADMISSION_EXAM_REACTIVOS}
          step={1}
          value={aciertos}
          onChange={(e) => setAciertos(Number(e.target.value))}
          className="mt-4 h-2 w-full cursor-pointer accent-primary"
          aria-valuemin={0}
          aria-valuemax={ADMISSION_EXAM_REACTIVOS}
          aria-valuenow={aciertos}
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAciertos(preset)}
              className={cn(
                'rounded-xl border px-3 py-1 text-xs font-semibold transition-colors',
                aciertos === preset
                  ? 'border-primary bg-primary text-primary-foreground'
                  : dark
                    ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {preset}
            </button>
          ))}
        </div>

        {activeUni === 'uam' ? (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="prepa-slider" className="text-xs font-medium">
              Promedio prepa (UAM):{' '}
              <strong className="tabular-nums">{promedioPrepa.toFixed(1)}</strong>
            </label>
            <input
              id="prepa-slider"
              type="range"
              min={6}
              max={10}
              step={0.1}
              value={promedioPrepa}
              onChange={(e) => setPromedioPrepa(Number(e.target.value))}
              className="h-2 w-full max-w-xs cursor-pointer accent-primary sm:shrink-0"
            />
            <p className={cn('text-xs tabular-nums', studySubtext(dark))}>
              ≈ <strong className="text-foreground">{uamPoints}</strong> pts totales
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex gap-1 rounded-xl border p-1" role="tablist" aria-label="Universidad">
        {UNIS.map((uni) => (
          <button
            key={uni}
            type="button"
            role="tab"
            aria-selected={activeUni === uni}
            onClick={() => setActiveUni(uni)}
            className={cn(
              'flex-1 rounded-xl px-3 py-2.5 text-xs font-bold transition-all sm:text-sm',
              activeUni === uni
                ? 'bg-primary text-primary-foreground shadow-sm'
                : dark
                  ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            style={activeUni === uni ? undefined : { borderColor: UNI_COLORS[uni] }}
          >
            {universidadLabels[uni]}
          </button>
        ))}
      </div>

      <ul className="mt-4 max-h-[min(28rem,55vh)] space-y-2 overflow-y-auto pr-1">
        {classified.map(({ career, qualifies, gap }) => (
          <li
            key={career.id}
            className={cn(
              'flex items-start gap-3 rounded-xl border-2 px-3 py-2.5 transition-colors duration-300',
              qualifies
                ? dark
                  ? 'border-emerald-700/60 bg-emerald-950/40'
                  : 'border-emerald-300 bg-emerald-50'
                : dark
                  ? 'border-red-900/50 bg-red-950/25'
                  : 'border-red-200 bg-red-50/80'
            )}
          >
            {qualifies ? (
              <CheckCircle2
                className={cn('mt-0.5 h-5 w-5 shrink-0', dark ? 'text-emerald-400' : 'text-emerald-600')}
                aria-hidden
              />
            ) : (
              <XCircle
                className={cn('mt-0.5 h-5 w-5 shrink-0', dark ? 'text-red-400' : 'text-red-500')}
                aria-hidden
              />
            )}
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  'font-semibold leading-snug',
                  qualifies
                    ? dark
                      ? 'text-emerald-100'
                      : 'text-emerald-950'
                    : dark
                      ? 'text-red-100'
                      : 'text-red-950'
                )}
              >
                {career.name}
              </p>
              <p className={cn('text-xs', studySubtext(dark))}>
                {career.campus}
                {career.area ? ` · ${career.area}` : ''}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p
                className={cn(
                  'text-xs font-bold tabular-nums',
                  qualifies
                    ? dark
                      ? 'text-emerald-300'
                      : 'text-emerald-700'
                    : dark
                      ? 'text-red-300'
                      : 'text-red-700'
                )}
              >
                {cutoffLabel(career)}
              </p>
              <p className={cn('text-[10px] tabular-nums', studySubtext(dark))}>
                {gap >= 0 ? `+${gap}` : gap}{' '}
                {career.scoreKind === 'puntos' ? 'pts' : 'aciertos'}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className={cn('mt-4 text-center text-[11px]', studySubtext(dark))}>
        Cortes históricos orientativos — no sustituyen la convocatoria oficial. UAM convierte aciertos a
        puntos con tu promedio de prepa.
      </p>
    </section>
  );
}
