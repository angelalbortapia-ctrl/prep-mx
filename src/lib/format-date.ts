/** Zona horaria fija para fechas de estudio / SM-2 (alumno en México). */
export const MX_TIME_ZONE = 'America/Mexico_City';

/** Fecha calendario YYYY-MM-DD en hora de México. */
export function getTodayCalendarIsoMx(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: MX_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** Suma días a una fecha ISO calendario (sin hora). */
export function addCalendarDaysIso(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  const date = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
  return date.toISOString().slice(0, 10);
}

/** Formatea YYYY-MM-DD como dd/mm/aaaa (es-MX, CDMX). Solo llamar en cliente. */
export function formatCalendarDateMx(isoDate: string): string {
  const [y, m, d] = isoDate.slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  const anchor = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: MX_TIME_ZONE,
  }).format(anchor);
}

/** Días calendario entre dos fechas ISO (fin − inicio). */
export function daysUntilCalendarIso(targetIso: string, fromIso = getTodayCalendarIsoMx()): number {
  const [y1, m1, d1] = fromIso.slice(0, 10).split('-').map(Number);
  const [y2, m2, d2] = targetIso.slice(0, 10).split('-').map(Number);
  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) return 0;
  const from = Date.UTC(y1, m1 - 1, d1);
  const to = Date.UTC(y2, m2 - 1, d2);
  return Math.round((to - from) / 86_400_000);
}

export function resolveSm2ReviewTitle(
  nextReviewAt: string | null,
  dueTomorrow: number,
  dueToday: number
): string {
  if (dueTomorrow === 0) return 'Sin repasos';
  if (!nextReviewAt) return dueToday > 0 ? 'Hoy' : 'Mañana';

  const dateOnly = nextReviewAt.slice(0, 10);
  const today = getTodayCalendarIsoMx();
  const tomorrow = addCalendarDaysIso(today, 1);

  if (dateOnly <= today) return 'Hoy';
  if (dateOnly === tomorrow) return 'Mañana';
  return formatCalendarDateMx(dateOnly);
}
