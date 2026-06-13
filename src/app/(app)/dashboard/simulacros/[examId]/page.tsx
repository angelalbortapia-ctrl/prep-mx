import { notFound } from 'next/navigation';
import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { getExamById } from '@/data/exams';
import { getExamQuestions } from '@/lib/supabase/questions';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { examId: string };
}

export default async function ExamActivePage({ params }: PageProps) {
  const exam = getExamById(params.examId);
  if (!exam) notFound();

  const questions = await getExamQuestions(exam.totalQuestions, exam.universidad);

  return (
    <ExamSimulator
      questions={questions}
      title={exam.name}
      durationMinutes={exam.durationMins}
      sessionId={exam.id}
    />
  );
}
