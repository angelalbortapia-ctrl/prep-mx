import { calcularProximaRevision } from '@/lib/sm2';

export interface MasteryRecord {
  slug: string;
  questionId: string;
  intervalo: number;
  facilidad: number;
  proximaRevision: number;
  dominado: boolean;
}

const MASTERY_KEY = 'prepmx-study-mastery';

export function readMasteryMap(): Record<string, MasteryRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(MASTERY_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, MasteryRecord>;
  } catch {
    return {};
  }
}

export function writeMasteryMap(map: Record<string, MasteryRecord>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(map));
  } catch {
    /* best-effort */
  }
}

/** Registra acierto con SM-2 básico y marca dominado si intervalo >= 6 días. */
export function recordMasterySuccess(slug: string, questionId: string): MasteryRecord {
  const key = `${slug}:${questionId}`;
  const map = readMasteryMap();
  const prev = map[key];
  const intervalo = prev?.intervalo ?? 1;
  const facilidad = prev?.facilidad ?? 2.5;
  const { nuevoIntervalo, nuevaFacilidad } = calcularProximaRevision(4, intervalo, facilidad);
  const now = Date.now();
  const record: MasteryRecord = {
    slug,
    questionId,
    intervalo: nuevoIntervalo,
    facilidad: nuevaFacilidad,
    proximaRevision: now + nuevoIntervalo * 86_400_000,
    dominado: nuevoIntervalo >= 6,
  };
  map[key] = record;
  writeMasteryMap(map);
  return record;
}

export function isQuestionMastered(slug: string, questionId: string): boolean {
  const key = `${slug}:${questionId}`;
  return Boolean(readMasteryMap()[key]?.dominado);
}
