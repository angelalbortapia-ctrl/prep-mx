import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Supabase = SupabaseClient<Database>;

export interface PeerRankingResult {
  userAccuracyPct: number;
  peerAveragePct: number;
  peerCount: number;
  percentile: number;
  totalAnswers: number;
  peerGroupLabel: string;
}

interface UserAccuracyRow {
  user_id: string;
  total: number;
  correct: number;
}

async function fetchAccuracyByUser(
  supabase: Supabase,
  userIds: string[]
): Promise<UserAccuracyRow[]> {
  if (!userIds.length) return [];

  const { data, error } = await supabase
    .from('user_progress')
    .select('user_id, is_correct')
    .in('user_id', userIds)
    .order('answered_at', { ascending: false })
    .limit(5000);

  if (error || !data?.length) return [];

  const buckets = new Map<string, { total: number; correct: number }>();
  for (const row of data) {
    if (!row.user_id) continue;
    const bucket = buckets.get(row.user_id) ?? { total: 0, correct: 0 };
    if (bucket.total >= 80) continue;
    bucket.total += 1;
    if (row.is_correct) bucket.correct += 1;
    buckets.set(row.user_id, bucket);
  }

  return Array.from(buckets.entries()).map(([user_id, stats]) => ({
    user_id,
    total: stats.total,
    correct: stats.correct,
  }));
}

function accuracyPct(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

function percentileRank(userPct: number, peerPcts: number[]): number {
  if (!peerPcts.length) return 50;
  const below = peerPcts.filter((p) => p < userPct).length;
  return Math.round((below / peerPcts.length) * 100);
}

/** Compara aciertos del alumno vs aspirantes con el mismo exam_target (carrera/área). */
export async function getPeerRanking(
  supabase: Supabase,
  userId: string,
  examTarget: string | null,
  careerLabel?: string
): Promise<PeerRankingResult | null> {
  let peerQuery = supabase.from('users').select('id, exam_target');

  if (examTarget) {
    peerQuery = peerQuery.eq('exam_target', examTarget);
  }

  const { data: peers, error } = await peerQuery.limit(200);
  if (error || !peers?.length) return null;

  const peerIds = peers.map((p) => p.id);
  const accuracies = await fetchAccuracyByUser(supabase, peerIds);
  if (!accuracies.length) return null;

  const userRow = accuracies.find((a) => a.user_id === userId);
  if (!userRow || userRow.total < 5) return null;

  const userAccuracyPct = accuracyPct(userRow.correct, userRow.total);
  const peerPcts = accuracies
    .filter((a) => a.total >= 5)
    .map((a) => accuracyPct(a.correct, a.total));

  if (peerPcts.length < 2) return null;

  const peerAveragePct = Math.round(
    peerPcts.reduce((sum, p) => sum + p, 0) / peerPcts.length
  );

  const otherPcts = accuracies
    .filter((a) => a.user_id !== userId && a.total >= 5)
    .map((a) => accuracyPct(a.correct, a.total));

  const label = careerLabel ?? (examTarget ? examTarget.replace('_', ' · ') : 'tu universidad');

  return {
    userAccuracyPct,
    peerAveragePct,
    peerCount: peerPcts.length,
    percentile: percentileRank(userAccuracyPct, otherPcts),
    totalAnswers: userRow.total,
    peerGroupLabel: label,
  };
}

export function rankingMotivation(ranking: PeerRankingResult): string {
  const diff = ranking.userAccuracyPct - ranking.peerAveragePct;
  if (diff > 5) {
    return `Vas ${diff} puntos arriba del promedio de aspirantes a ${ranking.peerGroupLabel}.`;
  }
  if (diff < -5) {
    return `Estás ${Math.abs(diff)} pts bajo el promedio — un simulacro hoy te sube en el ranking.`;
  }
  return `Empatas con el promedio de ${ranking.peerGroupLabel}. Un repaso SM-2 te despega.`;
}
