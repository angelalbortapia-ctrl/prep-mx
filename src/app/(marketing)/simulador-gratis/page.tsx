import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { freeDiagnosticQuestions } from '@/lib/diagnostic-questions';

export default function SimuladorGratisPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
      <ExamSimulator
        questions={freeDiagnosticQuestions}
        title="Diagnóstico gratuito — 20 preguntas"
        durationMinutes={30}
        sessionId="free-diagnostic"
      />
    </section>
  );
}
