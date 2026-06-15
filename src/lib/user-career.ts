import { CAREER_CUTOFFS, getCareerById, type CareerCutoff } from '@/data/career-cutoffs';
import type { Universidad } from '@/types/user-profile';

export interface UserCareerContext {
  careerId: string;
  career: CareerCutoff;
  universidad: Universidad;
  examTarget?: string;
  /** Promedio de aciertos del alumno (simulacros recientes). */
  userScore?: number;
}

function parseUniversidad(raw?: string | null): Universidad | undefined {
  if (raw === 'unam' || raw === 'ipn' || raw === 'uam') return raw;
  return undefined;
}

/** Mapea `examTarget` (ej. `unam_area2`) o metadata de Clerk a una carrera de corte oficial. */
export function resolveCareerFromMetadata(input: {
  examTarget?: string | null;
  universidad?: string | null;
  careerId?: string | null;
}): UserCareerContext | null {
  if (input.careerId) {
    const career = getCareerById(input.careerId);
    if (career) {
      return {
        careerId: career.id,
        career,
        universidad: career.universidad,
        examTarget: input.examTarget ?? undefined,
      };
    }
  }

  const uniFromTarget = input.examTarget?.split('_')[0];
  const universidad = parseUniversidad(input.universidad) ?? parseUniversidad(uniFromTarget);
  if (!universidad) return null;

  const match =
    CAREER_CUTOFFS.find((c) => c.universidad === universidad && c.demanda === 'alto') ??
    CAREER_CUTOFFS.find((c) => c.universidad === universidad);

  if (!match) return null;

  return {
    careerId: match.id,
    career: match,
    universidad,
    examTarget: input.examTarget ?? undefined,
  };
}

/** Colores institucionales para gráficos Recharts por universidad. */
export const UNI_CHART_COLORS: Record<
  Universidad,
  { primary: string; accent: string }
> = {
  unam: { primary: '#002B49', accent: '#D4AF37' },
  ipn: { primary: '#6A1B29', accent: '#E2E8F0' },
  uam: { primary: '#111111', accent: '#F05454' },
};
