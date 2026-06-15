export interface SocialProofEvent {
  id: string;
  message: string;
  /** Minutos atrás (simulado). */
  minutesAgo: number;
  uni?: 'unam' | 'ipn' | 'uam';
}

const POOL: Omit<SocialProofEvent, 'id' | 'minutesAgo'>[] = [
  { message: '3,412 exámenes completados hoy por la comunidad', uni: 'unam' },
  { message: 'Estudiantes de Medicina UNAM compitiendo en tiempo real', uni: 'unam' },
  { message: 'Aspirante IPN subió +12 aciertos en su primera semana de racha', uni: 'ipn' },
  { message: 'Grupo de amigos activó entrenamiento bajo presión — UAM', uni: 'uam' },
  { message: 'Eleva tus aciertos un 35% desde la primera semana de racha', uni: 'unam' },
  { message: 'Nuevo récord: 94 aciertos en simulacro completo esta madrugada', uni: 'ipn' },
  { message: 'Tu misma carrera ya está practicando ahora mismo', uni: 'uam' },
];

/** Lista fija (determinística) para evitar hydration mismatch en SSR. */
export const SOCIAL_PROOF_EVENTS: SocialProofEvent[] = POOL.map((item, i) => ({
  ...item,
  id: `fomo-${i}`,
  minutesAgo: 2 + i * 4,
}));

/** Eventos rotativos aleatorios — solo usar tras montaje en cliente. */
export function getSocialProofEvents(limit = 5): SocialProofEvent[] {
  const shuffled = [...POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit).map((item, i) => ({
    ...item,
    id: `fomo-${i}`,
    minutesAgo: 2 + i * 4 + Math.floor(Math.random() * 8),
  }));
}
