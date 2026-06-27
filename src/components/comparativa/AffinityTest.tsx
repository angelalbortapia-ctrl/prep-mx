'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AFFINITY_QUESTIONS,
  UNI_COLORS,
  calculateAffinity,
  getRecommendedProfileArea,
  type AffinityAnswers,
  type AffinityLevel,
  type AffinityResult,
  type CognitiveStrength,
  type EnglishLevel,
} from '@/data/university-comparison';
import { persistAffinityResult } from '@/lib/persist-affinity';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

type AffinityStep = 'prepa' | 'cognitive' | 'english' | 'results';

const STEPS: AffinityStep[] = ['prepa', 'cognitive', 'english', 'results'];

interface AffinityTestProps {
  className?: string;
  dark?: boolean;
  onResult?: (result: AffinityResult, answers: AffinityAnswers) => void;
  initialResult?: AffinityResult | null;
  /** Oculta botones de navegación al dashboard (onboarding). */
  hideNavigation?: boolean;
}

function ScoreBar({ uni, score, max }: { uni: Universidad; score: number; max: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-semibold">
        <span style={{ color: UNI_COLORS[uni] }}>{universidadLabels[uni]}</span>
        <span className="tabular-nums">{score}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${max > 0 ? (score / max) * 100 : 0}%`,
            backgroundColor: UNI_COLORS[uni],
          }}
        />
      </div>
    </div>
  );
}

export function AffinityTest({
  className,
  dark = false,
  onResult,
  initialResult,
  hideNavigation = false,
}: AffinityTestProps) {
  const [step, setStep] = useState<AffinityStep>(initialResult ? 'results' : 'prepa');
  const [answers, setAnswers] = useState<Partial<AffinityAnswers>>({});
  const [result, setResult] = useState<AffinityResult | null>(initialResult ?? null);

  const stepIndex = STEPS.indexOf(step);

  function selectPrepa(value: AffinityLevel) {
    setAnswers((a) => ({ ...a, prepa: value }));
    setStep('cognitive');
  }

  function selectCognitive(value: CognitiveStrength) {
    setAnswers((a) => ({ ...a, cognitive: value }));
    setStep('english');
  }

  function selectEnglish(value: EnglishLevel) {
    const full: AffinityAnswers = {
      prepa: answers.prepa!,
      cognitive: answers.cognitive!,
      english: value,
    };
    const affinity = calculateAffinity(full.prepa, full.cognitive, full.english);
    setAnswers(full);
    setResult(affinity);
    setStep('results');

    const profileArea = getRecommendedProfileArea(affinity.recommended, full.cognitive);

    persistAffinityResult(affinity, { answers: full });

    onResult?.(affinity, full);
  }

  function restart() {
    setAnswers({});
    setResult(null);
    setStep('prepa');
  }

  const maxScore = result ? Math.max(result.unam, result.ipn, result.uam) : 0;
  const profileArea =
    result && answers.cognitive
      ? getRecommendedProfileArea(result.recommended, answers.cognitive)
      : null;

  return (
    <section className={className}>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden />
        <h2 className={cn('text-lg font-bold', dark ? 'text-zinc-50' : 'text-foreground')}>
          Test de afinidad
        </h2>
      </div>
      <p className={cn('mb-6 text-sm', dark ? 'text-zinc-500' : 'text-muted-foreground')}>
        3 preguntas rápidas para recomendarte el examen que mejor encaja contigo.
      </p>

      {step !== 'results' ? (
        <>
          <div className="mb-6 flex gap-2">
            {(['prepa', 'cognitive', 'english'] as const).map((s, i) => (
              <div
                key={s}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  i <= stepIndex ? 'bg-primary' : dark ? 'bg-zinc-800' : 'bg-muted'
                )}
                aria-hidden
              />
            ))}
          </div>

          {step === 'prepa' && (
            <div className="space-y-3">
              <p className="font-medium">{AFFINITY_QUESTIONS.prepa.label}</p>
              {AFFINITY_QUESTIONS.prepa.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectPrepa(opt.id)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left transition-colors',
                    dark
                      ? 'border-zinc-800 hover:border-primary/50 hover:bg-zinc-900'
                      : 'hover:border-primary hover:bg-primary/5'
                  )}
                >
                  <span className="block text-sm font-semibold">{opt.label}</span>
                  <span className={cn('text-xs', dark ? 'text-zinc-500' : 'text-muted-foreground')}>
                    {opt.hint}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 'cognitive' && (
            <div className="space-y-3">
              <p className="font-medium">{AFFINITY_QUESTIONS.cognitive.label}</p>
              {AFFINITY_QUESTIONS.cognitive.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectCognitive(opt.id)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors',
                    dark
                      ? 'border-zinc-800 hover:border-primary/50 hover:bg-zinc-900'
                      : 'hover:border-primary hover:bg-primary/5'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {step === 'english' && (
            <div className="space-y-3">
              <p className="font-medium">{AFFINITY_QUESTIONS.english.label}</p>
              {AFFINITY_QUESTIONS.english.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectEnglish(opt.id)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors',
                    dark
                      ? 'border-zinc-800 hover:border-primary/50 hover:bg-zinc-900'
                      : 'hover:border-primary hover:bg-primary/5'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </>
      ) : result ? (
        <div className="space-y-5">
          <div
            className={cn(
              'rounded-2xl border p-5',
              dark ? 'border-zinc-700 bg-zinc-900/50' : 'border-primary/20 bg-primary/5'
            )}
          >
            <p
              className={cn(
                'text-xs font-bold uppercase tracking-wider',
                dark ? 'text-zinc-500' : 'text-muted-foreground'
              )}
            >
              Tu mejor encaje
            </p>
            <p
              className="mt-1 text-2xl font-black"
              style={{ color: UNI_COLORS[result.recommended] }}
            >
              {universidadLabels[result.recommended]}
            </p>
            {profileArea ? (
              <p className={cn('mt-2 text-sm', dark ? 'text-zinc-400' : 'text-muted-foreground')}>
                Área sugerida: {profileArea.areaLabel}
              </p>
            ) : null}
            <p className={cn('mt-3 text-sm leading-relaxed', dark ? 'text-zinc-400' : 'text-muted-foreground')}>
              {result.descriptions[result.recommended]}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Puntuación de afinidad</p>
            {(['unam', 'ipn', 'uam'] as const).map((uni) => (
              <ScoreBar key={uni} uni={uni} score={result[uni]} max={maxScore} />
            ))}
          </div>

          {hideNavigation ? null : (
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-xl">
                <Link href={`/dashboard/estudio?uni=${result.recommended}`}>
                  Ir a estudiar {universidadLabels[result.recommended]}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button variant="outline" className="h-11 rounded-xl" onClick={restart}>
                Repetir test
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

export type { AffinityAnswers };
