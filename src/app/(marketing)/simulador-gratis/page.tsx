import { SimuladorGratisView } from '@/components/exam/SimuladorGratisView';
import {
  parseUniversidadFilter,
  universidadFilterToQuery,
} from '@/lib/university-theme';
import { getExamQuestions } from '@/lib/supabase/questions';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { uni?: string };
}

export default async function SimuladorGratisPage({ searchParams }: PageProps) {
  const universidad = parseUniversidadFilter(searchParams.uni);
  const questions = await getExamQuestions(20, universidadFilterToQuery(universidad));

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <SimuladorGratisView universidad={universidad} questions={questions} />
    </section>
  );
}
