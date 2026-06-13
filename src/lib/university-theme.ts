export type UniversidadFilter = 'unam' | 'ipn' | 'uam' | 'todas';
export type LandingUniversidad = 'unam' | 'ipn' | 'uam';

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
    banner: 'bg-gradient-to-br from-[#001a33] via-[#003B71] to-[#005a9e]',
    accentBar: 'bg-[#C5A572]',
    tabActive: 'bg-white text-[#003B71] shadow-lg',
    tabIdle: 'bg-white/15 text-white hover:bg-white/25',
  },
  ipn: {
    id: 'ipn',
    name: 'IPN',
    shortLabel: 'IPN',
    tagline: 'Instituto Politécnico Nacional',
    description: 'Practica con reactivos al estilo del examen de admisión al IPN.',
    heroHighlight: 'el IPN',
    banner: 'bg-gradient-to-br from-[#3d0018] via-[#7B0337] to-[#a31545]',
    accentBar: 'bg-white/90',
    tabActive: 'bg-white text-[#7B0337] shadow-lg',
    tabIdle: 'bg-white/15 text-white hover:bg-white/25',
  },
  uam: {
    id: 'uam',
    name: 'UAM',
    shortLabel: 'UAM',
    tagline: 'Universidad Autónoma Metropolitana',
    description: 'Prepárate para el examen de ingreso UAM con feedback inmediato.',
    heroHighlight: 'la UAM',
    banner: 'bg-gradient-to-br from-[#003d24] via-[#006B3F] to-[#00875a]',
    accentBar: 'bg-emerald-200',
    tabActive: 'bg-white text-[#006B3F] shadow-lg',
    tabIdle: 'bg-white/15 text-white hover:bg-white/25',
  },
  todas: {
    id: 'todas',
    name: 'Mixto',
    shortLabel: 'Mixto',
    tagline: 'UNAM · IPN · UAM',
    description: 'Mezcla de preguntas de las tres universidades en un solo diagnóstico.',
    heroHighlight: 'cualquier universidad',
    banner: 'bg-gradient-to-br from-[#1e3a5f] via-[#2563eb] to-[#0891b2]',
    accentBar: 'bg-gradient-to-r from-[#C5A572] via-white to-emerald-300',
    tabActive: 'bg-white text-slate-800 shadow-lg',
    tabIdle: 'bg-white/15 text-white hover:bg-white/25',
  },
};

export function parseLandingUniversidad(raw?: string | null): LandingUniversidad {
  if (raw === 'ipn' || raw === 'uam') return raw;
  return 'unam';
}

export const landingUniversidadOptions = (
  ['unam', 'ipn', 'uam'] as LandingUniversidad[]
).map((id) => universityThemes[id]);

export function landingCopy(universidad: LandingUniversidad) {
  const theme = universityThemes[universidad];
  return {
    badge: theme.tagline,
    heroHighlight: theme.heroHighlight,
    simuladorHref: `/simulador-gratis?uni=${universidad}`,
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
    ? 'Diagnóstico mixto — 20 preguntas'
    : `Diagnóstico ${name} — 20 preguntas`;
}

export function getUniversityTheme(universidad: UniversidadFilter | LandingUniversidad): UniversityTheme {
  return universityThemes[universidad as UniversidadFilter] ?? universityThemes.todas;
}
