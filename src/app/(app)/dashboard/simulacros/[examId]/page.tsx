import { notFound } from 'next/navigation';
import { ExamStartFlow } from '@/components/exam/ExamStartFlow';
import { getExamById } from '@/data/exams';
import { getExamQuestions } from '@/lib/supabase/questions';

/** Preguntas aleatorias por sesión — debe ser dinámico; el catálogo del examen vive en src/data/exams. */
export const dynamic = 'force-dynamic';

interface PageProps {
  params: { examId: string };
}

export default async function ExamActivePage({ params }: PageProps) {
  const exam = getExamById(params.examId);
  if (!exam) notFound();

  const questions = await getExamQuestions(exam.totalQuestions, exam.universidad);

  return <ExamStartFlow exam={exam} questions={questions} />;
}
