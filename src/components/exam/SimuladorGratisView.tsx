'use client';

import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { UniversityBanner } from '@/components/marketing/UniversityBanner';
import { diagnosticTitle, type UniversidadFilter } from '@/lib/university-theme';
import type { Question } from '@/types/question';

interface SimuladorGratisViewProps {
  universidad: UniversidadFilter;
  questions: Question[];
}

export function SimuladorGratisView({ universidad, questions }: SimuladorGratisViewProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <UniversityBanner value={universidad} compact />
      <ExamSimulator
        key={universidad}
        questions={questions}
        title={diagnosticTitle(universidad)}
        durationMinutes={30}
        sessionId={`free-diagnostic-${universidad}`}
      />
    </div>
  );
}
