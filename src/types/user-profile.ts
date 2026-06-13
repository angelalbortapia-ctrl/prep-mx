export type Universidad = 'unam' | 'ipn' | 'uam';
export type ExamTarget = `${Universidad}_area${1 | 2 | 3 | 4 | 5 | 6}` | string;

export interface UserProfile {
  fullName: string;
  email: string;
  universidad: Universidad;
  area: string;
  examDate: string;
  examTarget: string;
  xpTotal: number;
  streakDays: number;
  planCompletionPct: number;
  onboardingComplete: boolean;
}

export const defaultProfile: UserProfile = {
  fullName: 'Alumno PrepMX',
  email: 'demo@prepmx.com',
  universidad: 'unam',
  area: 'area2',
  examDate: '',
  examTarget: 'unam_area2',
  xpTotal: 120,
  streakDays: 3,
  planCompletionPct: 18,
  onboardingComplete: false,
};

export const universidadLabels: Record<Universidad, string> = {
  unam: 'UNAM',
  ipn: 'IPN',
  uam: 'UAM',
};

export const areaLabels: Record<string, string> = {
  area1: 'Área 1 — Físico-Matemáticas',
  area2: 'Área 2 — Biológicas',
  area3: 'Área 3 — Ciencias Sociales',
  area4: 'Área 4 — Humanidades',
  area5: 'Área 5 — Arte y Diseño',
  area6: 'Área 6 — Económico-Administrativas',
};
