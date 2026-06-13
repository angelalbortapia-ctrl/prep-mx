import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { sampleQuestions } from '@/lib/sample-questions';

export default function SimulacrosPage() {
  return (
    <ExamSimulator
      questions={sampleQuestions}
      title="Simulacro de práctica"
      durationMinutes={20}
      sessionId="dashboard-practice"
    />
  );
}
