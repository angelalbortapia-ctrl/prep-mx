'use client';

import { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CyberCard } from '@/components/ui/cyber-card';
import {
  FAVORITE_SUBJECT_OPTIONS,
  calculateCompatibility,
  type FavoriteSubject,
  type LearningStyle,
  type ReadingSpeed,
} from '@/data/study-tools/compatibility-calculator';
import { UNI_COLORS } from '@/data/university-comparison';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

const UNIS: Universidad[] = ['unam', 'ipn', 'uam'];

export function CompatibilityCalculator() {
  const [favorites, setFavorites] = useState<FavoriteSubject[]>(['historia', 'matematicas']);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('balanceado');
  const [readingSpeed, setReadingSpeed] = useState<ReadingSpeed>('media');
  const [prepaAverage, setPrepaAverage] = useState(8.5);
  const [showResult, setShowResult] = useState(false);
  const clampedPrepa = Math.min(10, Math.max(6, prepaAverage || 6));

  const result = useMemo(
    () =>
      calculateCompatibility({
        favoriteSubjects: favorites,
        learningStyle,
        readingSpeed,
        prepaAverage: clampedPrepa,
      }),
    [favorites, learningStyle, readingSpeed, clampedPrepa]
  );

  function toggleSubject(id: FavoriteSubject) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setShowResult(false);
  }

  return (
    <div className="space-y-6">
      <CyberCard className="space-y-6 p-5 md:p-6">
        <div>
          <p className="mb-3 text-sm font-semibold">Materias favoritas (elige varias)</p>
          <div className="flex flex-wrap gap-2">
            {FAVORITE_SUBJECT_OPTIONS.map((opt) => {
              const active = favorites.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleSubject(opt.id)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                    active
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">¿Teoría o práctica?</legend>
            <div className="space-y-2">
              {(
                [
                  ['teoria', 'Prefiero teoría y lectura'],
                  ['practica', 'Prefiero práctica y ejercicios'],
                  ['balanceado', 'Un poco de ambos'],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="style"
                    checked={learningStyle === value}
                    onChange={() => {
                      setLearningStyle(value);
                      setShowResult(false);
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Velocidad de lectura</legend>
            <div className="space-y-2">
              {(
                [
                  ['lenta', 'Lenta — releo párrafos'],
                  ['media', 'Media — ritmo normal'],
                  ['rapida', 'Rápida — capto a la primera'],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="speed"
                    checked={readingSpeed === value}
                    onChange={() => {
                      setReadingSpeed(value);
                      setShowResult(false);
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <label htmlFor="prepa-avg" className="mb-2 block text-sm font-semibold">
            Promedio de preparatoria (6.0 – 10.0)
          </label>
          <Input
            id="prepa-avg"
            type="number"
            min={6}
            max={10}
            step={0.1}
            value={prepaAverage}
            onChange={(e) => {
              setPrepaAverage(Number(e.target.value));
              setShowResult(false);
            }}
            className="max-w-[140px]"
          />
        </div>

        <Button
          type="button"
          className="h-11 rounded-xl"
          onClick={() => setShowResult(true)}
          disabled={favorites.length === 0}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Calcular compatibilidad
        </Button>
      </CyberCard>

      {showResult && favorites.length > 0 ? (
        <CyberCard className="space-y-5 p-5 md:p-6">
          <p className="text-sm text-muted-foreground">
            Tu perfil es{' '}
            {UNIS.map((u, i) => (
              <span key={u}>
                {i > 0 ? (i === UNIS.length - 1 ? ' y ' : ', ') : ''}
                <strong style={{ color: UNI_COLORS[u] }}>
                  {result[u]}% {universidadLabels[u]}
                </strong>
              </span>
            ))}
            .
          </p>

          <div className="space-y-3">
            {UNIS.map((uni) => (
              <div key={uni} className="space-y-1">
                <div className="flex justify-between text-sm font-semibold">
                  <span style={{ color: UNI_COLORS[uni] }}>{universidadLabels[uni]}</span>
                  <span>{result[uni]}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${result[uni]}%`, backgroundColor: UNI_COLORS[uni] }}
                  />
                </div>
              </div>
            ))}
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {result.insights.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="text-primary">·</span>
                {tip}
              </li>
            ))}
          </ul>
        </CyberCard>
      ) : null}
    </div>
  );
}
