import {
  DEFAULT_EXAM_TOKENS,
  EXAM_TOKENS_STORAGE_KEY,
} from '@/types/exam-tokens';

export function readExamTokenBalance(): number {
  if (typeof window === 'undefined') return DEFAULT_EXAM_TOKENS;
  try {
    const raw = localStorage.getItem(EXAM_TOKENS_STORAGE_KEY);
    if (raw === null) return DEFAULT_EXAM_TOKENS;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? Math.max(0, n) : DEFAULT_EXAM_TOKENS;
  } catch {
    return DEFAULT_EXAM_TOKENS;
  }
}

export function writeExamTokenBalance(balance: number): number {
  const safe = Math.max(0, balance);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(EXAM_TOKENS_STORAGE_KEY, String(safe));
      document.cookie = `prepmx-exam-tokens=${safe}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      /* best-effort */
    }
  }
  return safe;
}

export function consumeExamToken(): number {
  const next = readExamTokenBalance() - 1;
  return writeExamTokenBalance(next);
}

export function addExamTokens(amount: number): number {
  return writeExamTokenBalance(readExamTokenBalance() + amount);
}
