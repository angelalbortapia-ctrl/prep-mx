import type { UniId } from '@/lib/uni-theme-config';

export type MilestoneStatus = 'past' | 'current' | 'future';

export interface AdmissionMilestone {
  id: string;
  label: string;
  windowStart: Date;
  windowEnd: Date;
  isExam?: boolean;
}

function d(iso: string): Date {
  return new Date(`${iso}T12:00:00`);
}

/** Ciclo de selección — ventanas orientativas por convocatoria pública. */
function buildMilestones(year: number) {
  const y = String(year);
  return {
    unam: [
      { id: 'convocatoria', label: 'Convocatoria (Ene)', windowStart: d(`${y}-01-05`), windowEnd: d(`${y}-01-31`) },
      { id: 'registro', label: 'Registro (Feb)', windowStart: d(`${y}-02-01`), windowEnd: d(`${y}-02-28`) },
      { id: 'boleta', label: 'Boleta-Credencial (May)', windowStart: d(`${y}-05-01`), windowEnd: d(`${y}-05-20`) },
      {
        id: 'examen',
        label: 'Examen Presencial (May/Jun)',
        windowStart: d(`${y}-05-25`),
        windowEnd: d(`${y}-06-10`),
        isExam: true,
      },
      { id: 'resultados', label: 'Resultados (Jul)', windowStart: d(`${y}-07-01`), windowEnd: d(`${y}-07-31`) },
    ] satisfies AdmissionMilestone[],
    ipn: [
      {
        id: 'registro',
        label: 'Registro en Línea (Feb/Mar)',
        windowStart: d(`${y}-02-01`),
        windowEnd: d(`${y}-03-31`),
      },
      { id: 'simulacro', label: 'Simulacro Digital (May)', windowStart: d(`${y}-05-01`), windowEnd: d(`${y}-05-31`) },
      {
        id: 'examen',
        label: 'Examen en Línea (Jun)',
        windowStart: d(`${y}-06-01`),
        windowEnd: d(`${y}-06-30`),
        isExam: true,
      },
      {
        id: 'resultados',
        label: 'Resultados Oficiales (Jul)',
        windowStart: d(`${y}-07-01`),
        windowEnd: d(`${y}-07-31`),
      },
    ] satisfies AdmissionMilestone[],
    uam: [
      { id: 'promedio', label: 'Captura de Promedio (Feb)', windowStart: d(`${y}-02-01`), windowEnd: d(`${y}-02-28`) },
      { id: 'prueba', label: 'Examen de Prueba (Mar)', windowStart: d(`${y}-03-01`), windowEnd: d(`${y}-03-31`) },
      {
        id: 'examen',
        label: 'Examen de Selección (Abr)',
        windowStart: d(`${y}-04-01`),
        windowEnd: d(`${y}-04-30`),
        isExam: true,
      },
      {
        id: 'resultados',
        label: 'Resultados Primavera (May)',
        windowStart: d(`${y}-05-01`),
        windowEnd: d(`${y}-05-31`),
      },
    ] satisfies AdmissionMilestone[],
  };
}

/** Segunda vuelta / complementaria / convocatorias de fin de año (ventanas orientativas). */
function buildSecondaryExams(year: number) {
  const y = String(year);
  return {
    unam: [
      {
        id: 'examen-noviembre',
        label: 'Examen SUAyED (Nov)',
        windowStart: d(`${y}-11-04`),
        windowEnd: d(`${y}-11-08`),
        isExam: true,
      },
    ] satisfies AdmissionMilestone[],
    ipn: [
      {
        id: 'examen-complementario',
        label: 'Examen Complementario (Sep)',
        windowStart: d(`${y}-09-28`),
        windowEnd: d(`${y}-09-28`),
        isExam: true,
      },
    ] satisfies AdmissionMilestone[],
    uam: [
      {
        id: 'examen-otono',
        label: 'Examen Otoño (Sep)',
        windowStart: d(`${y}-09-15`),
        windowEnd: d(`${y}-09-30`),
        isExam: true,
      },
    ] satisfies AdmissionMilestone[],
  };
}

function collectExamWindows(uniId: UniId, now: Date): AdmissionMilestone[] {
  const key = resolveTimelineUniId(uniId);
  const year = getActiveAdmissionYear(now);
  const primary = buildMilestones(year)[key].filter((m) => m.isExam);
  const secondary = buildSecondaryExams(year)[key];
  const nextPrimary = buildMilestones(year + 1)[key].filter((m) => m.isExam);
  return [...primary, ...secondary, ...nextPrimary];
}

/** Próxima ventana de examen (primera vuelta, complementaria o ciclo siguiente). */
export function getNextExamTarget(uniId: UniId, now = new Date()): AdmissionMilestone {
  const today = startOfDay(now).getTime();
  const candidates = collectExamWindows(uniId, now);
  const upcoming = candidates.find((m) => m.windowEnd.getTime() >= today);
  return upcoming ?? candidates[candidates.length - 1];
}

export type ExamCountdownPhase = 'upcoming' | 'active' | 'past';

export interface ExamCountdownParts {
  days: number;
  hours: number;
  minutes: number;
  target: AdmissionMilestone;
  phase: ExamCountdownPhase;
  targetYear: number;
}

export function getExamCountdownParts(uniId: UniId, now = new Date()): ExamCountdownParts {
  const target = getNextExamTarget(uniId, now);
  const today = startOfDay(now).getTime();
  const examStart = target.windowStart.getTime();
  const examEnd = target.windowEnd.getTime();

  if (today > examEnd) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      target,
      phase: 'past',
      targetYear: target.windowStart.getFullYear(),
    };
  }

  if (today >= examStart && today <= examEnd) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      target,
      phase: 'active',
      targetYear: target.windowStart.getFullYear(),
    };
  }

  const diffMs = Math.max(0, examStart - now.getTime());
  const totalMinutes = Math.floor(diffMs / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    days,
    hours,
    minutes,
    target,
    phase: 'upcoming',
    targetYear: target.windowStart.getFullYear(),
  };
}

export function landingExamCountdownMessage(
  shortLabel: string,
  parts: ExamCountdownParts
): string {
  if (parts.phase === 'active') {
    return `La ventana del examen de admisión ${shortLabel} está activa ahora`;
  }
  if (parts.phase === 'past') {
    return `Convocatoria ${shortLabel} ${parts.targetYear} en preparación`;
  }
  const { days, hours, minutes } = parts;
  return `Faltan ${days} días, ${hours} horas y ${minutes} minutos para el próximo examen de admisión ${shortLabel}`;
}

export function getActiveAdmissionYear(now = new Date()): number {
  const month = now.getMonth();
  const year = now.getFullYear();
  return month >= 7 ? year + 1 : year;
}

export function resolveTimelineUniId(uniId: UniId): Exclude<UniId, 'todos'> {
  if (uniId === 'ipn' || uniId === 'uam') return uniId;
  return 'unam';
}

export function getAdmissionMilestones(uniId: UniId, now = new Date()): AdmissionMilestone[] {
  const year = getActiveAdmissionYear(now);
  const key = resolveTimelineUniId(uniId);
  return buildMilestones(year)[key];
}

export function resolveCurrentMilestoneIndex(milestones: AdmissionMilestone[], now: Date): number {
  const idx = milestones.findIndex((m) => now <= m.windowEnd);
  return idx === -1 ? milestones.length - 1 : idx;
}

export function resolveMilestoneStatuses(milestones: AdmissionMilestone[], now: Date): MilestoneStatus[] {
  const currentIdx = resolveCurrentMilestoneIndex(milestones, now);
  return milestones.map((_, i) => {
    if (i < currentIdx) return 'past';
    if (i === currentIdx) return 'current';
    return 'future';
  });
}

export function getExamMilestone(milestones: AdmissionMilestone[]): AdmissionMilestone {
  return milestones.find((m) => m.isExam) ?? milestones[Math.max(0, milestones.length - 2)];
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function daysUntilExam(milestones: AdmissionMilestone[], now: Date): number {
  const exam = getExamMilestone(milestones);
  const ms = exam.windowStart.getTime() - startOfDay(now).getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function examCountdownLabel(milestones: AdmissionMilestone[], now: Date): string {
  const exam = getExamMilestone(milestones);
  const today = startOfDay(now).getTime();
  const examStart = exam.windowStart.getTime();
  const examEnd = exam.windowEnd.getTime();

  if (today < examStart) {
    const days = daysUntilExam(milestones, now);
    return days === 1 ? 'Falta 1 día para el Examen Real' : `Faltan ${days} días para el Examen Real`;
  }
  if (today <= examEnd) return 'Ventana del Examen Real activa';
  return 'Examen Real completado · Espera resultados';
}

/** Etiqueta de cuenta regresiva con segunda vuelta y ciclo siguiente. */
export function examCountdownLabelForUni(uniId: UniId, now = new Date()): string {
  const parts = getExamCountdownParts(uniId, now);
  if (parts.phase === 'active') return 'Ventana del Examen Real activa';
  if (parts.phase === 'past') return 'Examen Real completado · Espera resultados';
  const { days } = parts;
  return days === 1 ? 'Falta 1 día para el Examen Real' : `Faltan ${days} días para el Examen Real`;
}
