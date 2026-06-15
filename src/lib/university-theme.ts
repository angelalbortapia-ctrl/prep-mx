import { getInstitutionalCta } from '@/data/official-exam-metrics';

export type UniversidadFilter = 'unam' | 'ipn' | 'uam' | 'todas';
export type PlanScope = 'universidad' | 'todo';

export function parsePlanScope(raw?: string | null): PlanScope {
  return raw === 'todo' ? 'todo' : 'universidad';
}

export interface UniversityTheme {
  id: UniversidadFilter;
  name: string;
  shortLabel: string;
  tagline: string;
  description: string;
  heroHighlight: string;
  /** Clases Tailwind para el fondo del banner */
  banner: string;
  /** Acento decorativo (línea, badge) */
  accentBar: string;
  tabActive: string;
  tabIdle: string;
}

export const universityThemes: Record<UniversidadFilter, UniversityTheme> = {
  unam: {
    id: 'unam',
    name: 'UNAM',
    shortLabel: 'UNAM',
    tagline: 'Universidad Nacional Autónoma de México',
    description: 'Simulacros, diagnóstico y plan adaptado al examen de ingreso UNAM.',
    heroHighlight: 'tu área UNAM',
    banner: 'bg-gradient-to-br from-[#001a2e] via-[#002B49] to-[#004a7c]',
    accentBar: 'bg-[#D4AF37]',
    tabActive: 'bg-white text-[#002B49] shadow-md',
    tabIdle: 'bg-white/15 text-white hover:bg-white/25',
  },
  ipn: {
    id: 'ipn',
    name: 'IPN',
    shortLabel: 'IPN',
    tagline: 'Instituto Politécnico Nacional',
    description: 'Practica con reactivos al estilo del examen de admisión al IPN.',
    heroHighlight: 'el IPN',
    banner: 'bg-gradient-to-br from-[#1a0509] via-[#6A1B29] to-[#3d0018]',
    accentBar: 'bg-white/80',
    tabActive: 'bg-white text-[#6A1B29] shadow-md',
    tabIdle: 'bg-white/15 text-white hover:bg-white/25',
  },
  uam: {
    id: 'uam',
    name: 'UAM',
    shortLabel: 'UAM',
    tagline: 'Universidad Autónoma Metropolitana',
    description: 'Prepárate para el examen de ingreso UAM con feedback inmediato.',
    heroHighlight: 'la UAM',
    banner: 'bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#2d1515]',
    accentBar: 'bg-[#F05454]',
    tabActive: 'bg-[#F05454] text-white shadow-md',
    tabIdle: 'bg-white/10 text-white/90 hover:bg-white/20',
  },
  todas: {
    id: 'todas',
    name: 'Todo en uno',
    shortLabel: 'Todo en uno',
    tagline: 'UNAM · IPN · UAM',
    description: 'Un solo lugar para practicar las tres universidades sin cambiar de app.',
    heroHighlight: 'UNAM, IPN y UAM',
    banner: 'bg-gradient-to-br from-[#001a2e] via-[#4a1530] to-[#111111]',
    accentBar: 'bg-gradient-to-r from-[#D4AF37] via-white to-[#F05454]',
    tabActive: 'bg-white text-slate-900 shadow-md',
    tabIdle: 'bg-white/15 text-white hover:bg-white/25',
  },
};

export function parsePageUniversidad(raw?: string | null): UniversidadFilter {
  if (raw === 'unam' || raw === 'ipn' || raw === 'uam' || raw === 'todas') {
    return raw;
  }
  return 'unam';
}

export function landingCopy(
  universidad: UniversidadFilter,
  plan: PlanScope,
  area = '2'
) {
  const simUni = plan === 'todo' || universidad === 'todas' ? 'todas' : universidad;
  const theme = universityThemes[simUni];
  const ctaUni = plan === 'todo' || universidad === 'todas' ? 'todas' : universidad;

  const heroContext =
    plan === 'todo' || universidad === 'todas'
      ? 'UNAM, IPN y UAM'
      : theme.heroHighlight;

  return {
    heroHighlight: theme.heroHighlight,
    heroTitle:
      'Entra a la universidad con el plan adaptativo que destruye tus puntos débiles. Mide tus fuerzas hoy mismo',
    heroSubtitle: `Tu meta: ${heroContext}. Diagnóstico real con 10 reactivos Meta. Sin tarjeta. Sin adivinar qué estudiar.`,
    ctaPrimary: getInstitutionalCta(ctaUni, area),
    ctaSecondary: 'Ver rutas de selección',
    simuladorHref: `/simulador-gratis?uni=${simUni}&freemium=diagnostico`,
    preciosHref: `/precios?uni=${simUni}&plan=${plan}`,
    theme,
  };
}

export const universidadFilterOptions = (
  ['unam', 'ipn', 'uam', 'todas'] as UniversidadFilter[]
).map((id) => {
  const t = universityThemes[id];
  return {
    id: t.id,
    label: t.name,
    shortLabel: t.shortLabel,
    description: t.description,
  };
});

export function parseUniversidadFilter(raw?: string): UniversidadFilter {
  if (raw === 'unam' || raw === 'ipn' || raw === 'uam' || raw === 'todas') {
    return raw;
  }
  return 'todas';
}

export function universidadFilterToQuery(universidad: UniversidadFilter): string | undefined {
  return universidad === 'todas' ? undefined : universidad;
}

export function diagnosticTitle(universidad: UniversidadFilter): string {
  const name = universityThemes[universidad].name;
  return universidad === 'todas'
    ? 'Diagnóstico todo en uno — 20 preguntas'
    : `Diagnóstico ${name} — 20 preguntas`;
}

export function getUniversityTheme(universidad: UniversidadFilter): UniversityTheme {
  return universityThemes[universidad] ?? universityThemes.todas;
}
