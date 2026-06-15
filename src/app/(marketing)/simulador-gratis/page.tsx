import { Suspense } from 'react';
import { SimuladorGratisView } from '@/components/exam/SimuladorGratisView';
import { PageShell } from '@/components/layout/PageShell';
import {
  parseUniversidadFilter,
  universidadFilterToQuery,
} from '@/lib/university-theme';
import { getExamQuestions } from '@/lib/supabase/questions';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { uni?: string; freemium?: string };
}

export default async function SimuladorGratisPage({ searchParams }: PageProps) {
  const universidad = parseUniversidadFilter(searchParams.uni);
  const isFreemium = searchParams.freemium === 'diagnostico';
  const limit = isFreemium ? 10 : 20;
  const questions = await getExamQuestions(limit, universidadFilterToQuery(universidad));

  return (
    <PageShell size="narrow">
      <Suspense fallback={<div className="h-32 animate-pulse rounded-3xl bg-muted" />}>
        <SimuladorGratisView universidad={universidad} questions={questions} />
      </Suspense>
    </PageShell>
  );
}
