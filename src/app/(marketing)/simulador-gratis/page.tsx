import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { freeDiagnosticQuestions } from '@/lib/sample-questions';

export default function SimuladorGratisPage() {
  return (
    <section className="px-4 py-8 md:py-12">
      <ExamSimulator
        questions={freeDiagnosticQuestions}
        title="Diagnóstico gratuito"
        durationMinutes={15}
        sessionId="free-diagnostic"
      />
    </section>
  );
}
