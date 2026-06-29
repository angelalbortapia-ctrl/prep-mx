import { calcularProximaRevision } from '@/lib/sm2';
import { addCalendarDaysIso, formatCalendarDateMx, getTodayCalendarIsoMx } from '@/lib/format-date';

export const SM2_DEMO_QUESTION = {
  id: 'demo-quimica-oxidacion',
  materia: 'Química',
  tema: 'Número de oxidación',
  text: '¿Cuál es el número de oxidación del oxígeno en H₂O₂ (peróxido de hidrógeno)?',
  hint: 'En peróxidos el oxígeno no va en −2.',
} as const;

export type Sm2DemoEventKind = 'fail' | 'review' | 'reminder' | 'exam';

export interface Sm2DemoEvent {
  dayOffset: number;
  dateIso: string;
  dateLabel: string;
  kind: Sm2DemoEventKind;
  quality?: 0 | 1 | 2 | 3 | 4 | 5;
  intervalDays: number;
  easeFactor: number;
  headline: string;
  detail: string;
}

/** Calidades simuladas: fallo inicial → repasos exitosos (misma lógica que tras un simulacro). */
const DEMO_QUALITIES: Array<0 | 1 | 2 | 3 | 4 | 5> = [1, 4, 5, 4, 5];

const REMINDER_DAYS_BEFORE_EXAM = 3;

function formatDayLabel(dayOffset: number, startIso: string): string {
  if (dayOffset === 0) return 'Hoy';
  if (dayOffset === 1) return 'Mañana';
  if (dayOffset <= 7) return `En ${dayOffset} días`;
  return formatCalendarDateMx(addCalendarDaysIso(startIso, dayOffset));
}

/**
 * Trayectoria educativa demo: misma función `calcularProximaRevision` que usa PrepMX en producción.
 * @param examDayOffset Días hasta el examen real (p. ej. 42 ≈ 6 semanas).
 */
export function buildSm2DemoEvents(examDayOffset = 42): Sm2DemoEvent[] {
  const start = getTodayCalendarIsoMx();
  let interval = 1;
  let ease = 2.5;
  let day = 0;
  const events: Sm2DemoEvent[] = [];

  events.push({
    dayOffset: 0,
    dateIso: start,
    dateLabel: 'Hoy',
    kind: 'fail',
    quality: DEMO_QUALITIES[0],
    intervalDays: interval,
    easeFactor: ease,
    headline: 'Simulacro diagnóstico',
    detail:
      'Fallaste esta pregunta de Química. PrepMX la guarda y calcula cuándo debes verla otra vez.',
  });

  let next = calcularProximaRevision(DEMO_QUALITIES[0], interval, ease);
  interval = next.nuevoIntervalo;
  ease = next.nuevaFacilidad;
  day += interval;

  const reminderDay = examDayOffset - REMINDER_DAYS_BEFORE_EXAM;

  for (let i = 1; i < DEMO_QUALITIES.length; i++) {
    const quality = DEMO_QUALITIES[i];
    const isReminderPass = i === DEMO_QUALITIES.length - 1;
    const dayOffset = isReminderPass ? reminderDay : day;
    const dateIso = addCalendarDaysIso(start, dayOffset);

    events.push({
      dayOffset,
      dateIso,
      dateLabel: isReminderPass
        ? `${REMINDER_DAYS_BEFORE_EXAM} días antes del examen`
        : formatDayLabel(dayOffset, start),
      kind: isReminderPass ? 'reminder' : 'review',
      quality,
      intervalDays: interval,
      easeFactor: Number(ease.toFixed(2)),
      headline: isReminderPass
        ? `${REMINDER_DAYS_BEFORE_EXAM} días antes del examen UNAM`
        : `Repaso SM-2 · día ${dayOffset}`,
      detail: isReminderPass
        ? `PrepMX te notifica: «${SM2_DEMO_QUESTION.materia} · ${SM2_DEMO_QUESTION.tema}» vence hoy.`
        : quality >= 4
          ? `Respondiste bien. Próximo intervalo: ${interval} día${interval === 1 ? '' : 's'}.`
          : 'Necesitas reforzar. El intervalo se acorta.',
    });

    if (isReminderPass) break;

    next = calcularProximaRevision(quality, interval, ease);
    interval = next.nuevoIntervalo;
    ease = next.nuevaFacilidad;
    day += interval;
  }

  events.push({
    dayOffset: examDayOffset,
    dateIso: addCalendarDaysIso(start, examDayOffset),
    dateLabel: formatDayLabel(examDayOffset, start),
    kind: 'exam',
    intervalDays: 0,
    easeFactor: Number(ease.toFixed(2)),
    headline: 'Día del examen de admisión',
    detail:
      'La misma pregunta ya no te sorprende: la repasaste en el momento exacto, no la leíste 40 veces en PDF.',
  });

  return events;
}

/** Un paso interactivo tras responder con calidad SM-2 (0–5). */
export function sm2DemoStep(
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  interval: number,
  ease: number
): { interval: number; ease: number; nextReviewDays: number } {
  const { nuevoIntervalo, nuevaFacilidad } = calcularProximaRevision(quality, interval, ease);
  return {
    interval: nuevoIntervalo,
    ease: nuevaFacilidad,
    nextReviewDays: nuevoIntervalo,
  };
}
