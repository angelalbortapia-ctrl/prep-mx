'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Layers } from 'lucide-react';
import { MilestonesTimeline } from '@/components/study/MilestonesTimeline';
import { StudyUrlTabs, useStudyTab } from '@/components/study/StudyUrlTabs';
import type { StudyGuide } from '@/data/study-guides';
import { cn } from '@/lib/utils';

const GuiaLayout = dynamic(() => import('@/components/study/GuiaLayout').then((m) => m.GuiaLayout), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-muted" />,
});

const FlashcardsPanel = dynamic(
  () => import('@/components/study/FlashcardsPanel').then((m) => m.FlashcardsPanel),
  { ssr: false }
);

interface StudyCourseViewProps {
  guide: StudyGuide;
}

function StudyCourseInner({ guide }: StudyCourseViewProps) {
  const tab = useStudyTab();

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-24">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Layers className="h-3.5 w-3.5" />
          Curso · {guide.materia}
        </div>
        <StudyUrlTabs />
      </header>

      {tab === 'timeline' && (
        <section className="rounded-2xl border bg-card p-5 md:p-8">
          <h2 className="mb-6 text-xl font-bold">Ruta de misiones</h2>
          <MilestonesTimeline slug={guide.slug} />
        </section>
      )}

      {tab === 'guia' && <GuiaLayout guide={guide} />}

      {tab === 'flashcards' && (
        <section className={cn('rounded-2xl border bg-card p-5 md:p-8')}>
          <FlashcardsPanel slug={guide.slug} questions={guide.quiz} />
        </section>
      )}
    </div>
  );
}

export function StudyCourseView({ guide }: StudyCourseViewProps) {
  return (
    <Suspense fallback={<div className="h-32 animate-pulse rounded-2xl bg-muted" />}>
      <StudyCourseInner guide={guide} />
    </Suspense>
  );
}
