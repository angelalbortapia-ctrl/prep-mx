'use client';

import { useMemo, useState } from 'react';
import { Calculator, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CyberCard } from '@/components/ui/cyber-card';
import {
  UAM_CAREER_CUTOFFS,
  UAM_EXAM_QUESTIONS,
  calculateUamDiezmo,
} from '@/data/study-tools/uam-diezmo';
import { cn } from '@/lib/utils';

export function UamDiezmoSimulator() {
  const [prepaAverage, setPrepaAverage] = useState(8.5);
  const [careerId, setCareerId] = useState(UAM_CAREER_CUTOFFS[0].id);
  const [customCutoff, setCustomCutoff] = useState<number | ''>('');
  const [calculated, setCalculated] = useState(false);

  const career = UAM_CAREER_CUTOFFS.find((c) => c.id === careerId) ?? UAM_CAREER_CUTOFFS[0];
  const cutoff = customCutoff !== '' ? Number(customCutoff) : career.cutoffPoints;

  const result = useMemo(
    () => calculateUamDiezmo(prepaAverage, cutoff, UAM_EXAM_QUESTIONS),
    [prepaAverage, cutoff]
  );

  return (
    <div className="space-y-6">
      <CyberCard className="space-y-5 p-5 md:p-6">
        <p className="text-sm text-muted-foreground">
          Fórmula oficial UAM:{' '}
          <strong className="text-foreground">(Promedio prepa × 30) + (% aciertos × 7)</strong>{' '}
          en escala de <strong className="text-foreground">1,000 puntos</strong> (máx. 300 prepa + 700
          examen).
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="uam-prepa" className="mb-2 block text-sm font-semibold">
              Tu promedio de prepa (6.0 – 10.0)
            </label>
            <Input
              id="uam-prepa"
              type="number"
              min={6}
              max={10}
              step={0.1}
              value={prepaAverage}
              onChange={(e) => {
                setPrepaAverage(Number(e.target.value));
                setCalculated(false);
              }}
            />
          </div>

          <div>
            <label htmlFor="uam-career" className="mb-2 block text-sm font-semibold">
              Carrera objetivo
            </label>
            <select
              id="uam-career"
              value={careerId}
              onChange={(e) => {
                setCareerId(e.target.value);
                setCustomCutoff('');
                setCalculated(false);
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {UAM_CAREER_CUTOFFS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.unidad} ({c.division}) — {c.cutoffPoints} pts
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="uam-cutoff" className="mb-2 block text-sm font-semibold">
            Puntaje de corte personalizado (opcional, escala 0–1,000)
          </label>
          <Input
            id="uam-cutoff"
            type="number"
            min={400}
            max={1000}
            step={1}
            placeholder={String(career.cutoffPoints)}
            value={customCutoff}
            onChange={(e) => {
              setCustomCutoff(e.target.value === '' ? '' : Number(e.target.value));
              setCalculated(false);
            }}
            className="max-w-[160px]"
          />
        </div>

        <Button type="button" className="h-11 rounded-xl" onClick={() => setCalculated(true)}>
          <Calculator className="mr-2 h-4 w-4" />
          Calcular aciertos necesarios
        </Button>
      </CyberCard>

      {calculated ? (
        <CyberCard
          className={cn(
            'space-y-4 p-5 md:p-6',
            result.feasible ? 'border-teal-500/30' : 'border-amber-500/30'
          )}
        >
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-teal-600" aria-hidden />
            <h3 className="text-lg font-bold">Resultado</h3>
          </div>

          <p className="text-3xl font-black text-teal-600">
            {result.correctAnswersRounded}{' '}
            <span className="text-lg font-semibold text-muted-foreground">
              / {UAM_EXAM_QUESTIONS} reactivos correctos
            </span>
          </p>

          <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Aporte prepa (×30)</p>
              <p className="font-bold">{result.prepaContribution.toFixed(0)} / 300 pts</p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Puntos examen requeridos</p>
              <p className="font-bold">{result.examPointsNeeded.toFixed(0)} / 700 pts</p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">% aciertos necesario</p>
              <p className="font-bold">{result.percentageNeeded.toFixed(1)}%</p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Puntaje final proyectado</p>
              <p className="font-bold">{result.projectedFinalScore.toFixed(0)} / 1,000</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{result.message}</p>
        </CyberCard>
      ) : null}
    </div>
  );
}
