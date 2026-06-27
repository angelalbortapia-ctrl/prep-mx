'use client';

import { useState } from 'react';
import { Calculator, ChevronRight, GraduationCap } from 'lucide-react';
import { AffinityTest } from '@/components/comparativa/AffinityTest';
import { ComparisonMatrix } from '@/components/comparativa/ComparisonMatrix';
import { ReactivosChart } from '@/components/comparativa/ReactivosChart';
import { StrategicTipsSection } from '@/components/comparativa/StrategicTipsSection';
import { SyllabusExplorer } from '@/components/comparativa/SyllabusExplorer';
import { Button } from '@/components/ui/button';
import {
  calculateAffinity,
  cognitiveToStudyArea,
  type AffinityAnswers,
  type AffinityResult,
  type StudyAreaId,
} from '@/data/university-comparison';
import { persistAffinityResult } from '@/lib/persist-affinity';
import { universidadLabels } from '@/types/user-profile';

interface UniversityDiagnosticProps {
  onContinue: (result: AffinityResult, studyArea: StudyAreaId) => void;
}

export function UniversityDiagnostic({ onContinue }: UniversityDiagnosticProps) {
  const [affinityResult, setAffinityResult] = useState<AffinityResult | null>(null);
  const [studyArea, setStudyArea] = useState<StudyAreaId>('fms');
  const [lastAnswers, setLastAnswers] = useState<AffinityAnswers | null>(null);

  function handleAffinityResult(result: AffinityResult, answers: AffinityAnswers) {
    const syncedArea = cognitiveToStudyArea(answers.cognitive);
    setStudyArea(syncedArea);
    setAffinityResult(result);
    setLastAnswers(answers);
    persistAffinityResult(result, { studyArea: syncedArea, answers });
    requestAnimationFrame(() => {
      document.getElementById('onboarding-cta')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function handleContinue() {
    const result =
      affinityResult ??
      (lastAnswers
        ? calculateAffinity(lastAnswers.prepa, lastAnswers.cognitive, lastAnswers.english)
        : null);

    if (!result) {
      document.getElementById('test-afinidad')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const syncedArea = lastAnswers ? cognitiveToStudyArea(lastAnswers.cognitive) : studyArea;
    persistAffinityResult(result, { studyArea: syncedArea, answers: lastAnswers ?? undefined });
    onContinue(result, syncedArea);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-950">
            Guía de admisión 2026
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Comparativa UNAM · IPN · UAM
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            Analiza las diferencias técnicas, materias filtro y calcula tu compatibilidad con cada
            examen antes de armar tu plan de estudio.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium">
              <GraduationCap className="h-3.5 w-3.5 text-amber-400" />
              Licenciatura
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium">
              <Calculator className="h-3.5 w-3.5 text-amber-400" />
              Test de afinidad
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <ComparisonMatrix />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <ReactivosChart />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SyllabusExplorer showStudyLink={false} />
        </section>

        <section
          id="test-afinidad"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <AffinityTest hideNavigation onResult={handleAffinityResult} />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <StrategicTipsSection highlightUni={affinityResult?.recommended} />
        </section>

        <div
          id="onboarding-cta"
          className="sticky bottom-4 z-20 flex flex-col items-center gap-3 rounded-2xl border border-indigo-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:justify-between"
        >
          <div className="text-center sm:text-left">
            <p className="font-bold text-slate-900">¿Listo para armar tu plan?</p>
            <p className="text-xs text-slate-600">
              {affinityResult
                ? `Te recomendamos ${universidadLabels[affinityResult.recommended]} · ${affinityResult.recommendedAreaLabel}.`
                : 'Completa el test de afinidad arriba o continúa con la universidad que elijas.'}
            </p>
          </div>
          <Button
            type="button"
            onClick={handleContinue}
            className="h-11 w-full rounded-xl px-8 sm:w-auto"
          >
            Continuar con mi configuración
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
