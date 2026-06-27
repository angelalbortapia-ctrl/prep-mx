import {
  ONBOARDING_RESULT_STORAGE_KEY,
  type AffinityAnswers,
  type AffinityResult,
  type StudyAreaId,
} from '@/data/university-comparison';

export function persistAffinityResult(
  result: AffinityResult,
  extra?: { answers?: AffinityAnswers; studyArea?: StudyAreaId }
): void {
  try {
    localStorage.setItem(
      ONBOARDING_RESULT_STORAGE_KEY,
      JSON.stringify({
        ...result,
        ...extra,
        completedAt: new Date().toISOString(),
      })
    );
  } catch {
    /* quota / modo privado */
  }
}

export function loadAffinityResult(): AffinityResult | null {
  try {
    const raw = localStorage.getItem(ONBOARDING_RESULT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AffinityResult;
    if (!parsed?.recommended || typeof parsed.unam !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}
