import { notFound } from 'next/navigation';
import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { getExamById } from '@/data/exams';
import { freeDiagnosticQuestions, allDemoQuestions } from '@/lib/diagnostic-questions';

interface PageProps {
  params: { examId: string };
}

export default function ExamActivePage({ params }: PageProps) {
  const exam = getExamById(params.examId);
  if (!exam) notFound();

  const questions =
    exam.totalQuestions <= 20
      ? freeDiagnosticQuestions.slice(0, exam.totalQuestions)
      : allDemoQuestions;

  return (
    <ExamSimulator
      questions={questions}
      title={exam.name}
      durationMinutes={exam.durationMins}
      sessionId={exam.id}
    />
  );
}
