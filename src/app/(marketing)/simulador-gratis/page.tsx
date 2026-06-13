import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { freeDiagnosticQuestions } from '@/lib/sample-questions';

export default function SimuladorGratisPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
      <ExamSimulator
        questions={freeDiagnosticQuestions}
        title="Diagnóstico gratuito"
        durationMinutes={15}
        sessionId="free-diagnostic"
      />
    </section>
  );
}
