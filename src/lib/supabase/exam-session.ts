import { createServerSupabaseClient } from './server';
import { assertSupabaseUserId } from './user-ids';

export interface ExamSessionSummary {
  examSessionId: string;
  score: number;
  total: number;
  percentage: number;
  materiaBreakdown: Array<{ materia: string; correct: number; total: number }>;
  weakestMateria: string | null;
}

export async function getExamSessionSummary(
  userId: string,
  examSessionId: string
): Promise<ExamSessionSummary | null> {
  const supabase = createServerSupabaseClient();
  const dbUserId = assertSupabaseUserId(userId, 'getExamSessionSummary');
  const { data, error } = await supabase
    .from('user_progress')
    .select('is_correct, question_id')
    .eq('user_id', dbUserId)
    .eq('exam_session_id', examSessionId);

  if (error || !data?.length) return null;

  const questionIds = Array.from(
    new Set(data.map((row) => row.question_id).filter((id): id is string => Boolean(id)))
  );
  const questionMaterias: Record<string, string> = {};

  if (questionIds.length) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, materia')
      .in('id', questionIds);

    for (const q of questions ?? []) {
      questionMaterias[q.id] = q.materia;
    }
  }

  const materiaStats: Record<string, { correct: number; total: number }> = {};
  let score = 0;

  for (const row of data) {
    score += row.is_correct ? 1 : 0;
    const materia = (row.question_id && questionMaterias[row.question_id]) || 'general';
    const bucket = materiaStats[materia] ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (row.is_correct) bucket.correct += 1;
    materiaStats[materia] = bucket;
  }

  const total = data.length;
  const materiaBreakdown = Object.entries(materiaStats).map(([materia, stats]) => ({
    materia,
    correct: stats.correct,
    total: stats.total,
  }));

  let weakestMateria: string | null = null;
  let worstRate = 1;
  for (const item of materiaBreakdown) {
    const rate = item.correct / item.total;
    if (rate < worstRate) {
      worstRate = rate;
      weakestMateria = item.materia;
    }
  }

  return {
    examSessionId,
    score,
    total,
    percentage: total > 0 ? Math.round((score / total) * 100) : 0,
    materiaBreakdown,
    weakestMateria,
  };
}
