export interface ExamRecommendation {
  materia: string;
  accuracyPct: number;
  priority: 'alta' | 'media' | 'baja';
  tip: string;
}

/** Diagnóstico regla-based (placeholder hasta lección OpenAI). */
export function buildExamRecommendations(
  materiaBreakdown: Record<string, { correct: number; total: number }>
): ExamRecommendation[] {
  const entries = Object.entries(materiaBreakdown);
  if (!entries.length) return [];

  return entries
    .map(([materia, stats]) => {
      const accuracyPct =
        stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      let priority: ExamRecommendation['priority'] = 'media';
      let tip = 'Mantén repaso espaciado con SM-2 en PrepMX.';

      if (accuracyPct < 50) {
        priority = 'alta';
        tip = `Prioriza ${materia.replace(/_/g, ' ')} esta semana: repasa teoría y haz 15 reactivos diarios.`;
      } else if (accuracyPct >= 75) {
        priority = 'baja';
        tip = `Buen nivel en ${materia.replace(/_/g, ' ')} — repasa 1 vez por semana para no olvidar.`;
      }

      return { materia, accuracyPct, priority, tip };
    })
    .sort((a, b) => a.accuracyPct - b.accuracyPct);
}

export function formatRecommendationsText(recommendations: ExamRecommendation[]): string {
  if (!recommendations.length) {
    return 'Sigue practicando con simulacros cortos y repasa con SM-2.';
  }
  return recommendations
    .slice(0, 3)
    .map((r) => `• ${r.materia.replace(/_/g, ' ')} (${r.accuracyPct}%): ${r.tip}`)
    .join('\n');
}
