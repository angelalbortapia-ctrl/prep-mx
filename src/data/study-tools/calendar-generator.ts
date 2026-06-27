import type { Universidad } from '@/types/user-profile';

export type StudyIntensity = 'pesada' | 'ligera' | 'media';

export interface CalendarSubject {
  id: string;
  label: string;
  intensity: StudyIntensity;
  universidades: Universidad[];
  hours: number;
}

export interface CalendarDayPlan {
  date: string;
  dayLabel: string;
  subject: string;
  intensity: StudyIntensity;
  hours: number;
  universidades: Universidad[];
  note?: string;
}

export interface CalendarGeneratorInput {
  universidades: Universidad[];
  freeDays: boolean[];
  hoursPerDay: number;
  weeks: number;
  startDate?: Date;
}

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const SUBJECT_POOL: CalendarSubject[] = [
  { id: 'calculo-ipn', label: 'Cálculo (IPN)', intensity: 'pesada', universidades: ['ipn'], hours: 2 },
  { id: 'fisica-ipn', label: 'Física aplicada', intensity: 'pesada', universidades: ['ipn', 'unam'], hours: 1.5 },
  { id: 'quimica', label: 'Estequiometría / Química', intensity: 'pesada', universidades: ['ipn', 'unam'], hours: 1.5 },
  { id: 'ingles-ipn', label: 'Inglés técnico', intensity: 'media', universidades: ['ipn'], hours: 1 },
  { id: 'historia-mx', label: 'Historia de México', intensity: 'ligera', universidades: ['unam'], hours: 1 },
  { id: 'geografia', label: 'Geografía UNAM', intensity: 'ligera', universidades: ['unam'], hours: 1 },
  { id: 'literatura', label: 'Literatura y comprensión', intensity: 'ligera', universidades: ['unam'], hours: 1 },
  { id: 'razonamiento-uam', label: 'Razonamiento lógico UAM', intensity: 'media', universidades: ['uam'], hours: 1.5 },
  { id: 'filosofia', label: 'Filosofía / falacias', intensity: 'media', universidades: ['unam', 'uam'], hours: 1 },
  { id: 'biologia', label: 'Biología', intensity: 'media', universidades: ['unam', 'ipn', 'uam'], hours: 1 },
  { id: 'simulacro', label: 'Simulacro parcial', intensity: 'pesada', universidades: ['unam', 'ipn', 'uam'], hours: 2 },
  { id: 'repaso-sm2', label: 'Repaso SM-2 (tarjetas)', intensity: 'ligera', universidades: ['unam', 'ipn', 'uam'], hours: 0.5 },
];

function filterSubjects(unis: Universidad[]): CalendarSubject[] {
  if (unis.length === 0) return SUBJECT_POOL;
  return SUBJECT_POOL.filter((s) => s.universidades.some((u) => unis.includes(u)));
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Alterna materias pesadas y ligeras en días libres del alumno. */
export function generateStudyCalendar(input: CalendarGeneratorInput): CalendarDayPlan[] {
  const start = input.startDate ?? new Date();
  const subjects = filterSubjects(input.universidades);
  const heavy = subjects.filter((s) => s.intensity === 'pesada');
  const light = subjects.filter((s) => s.intensity === 'ligera');
  const medium = subjects.filter((s) => s.intensity === 'media');
  const plan: CalendarDayPlan[] = [];

  let heavyIdx = 0;
  let lightIdx = 0;
  let mediumIdx = 0;
  let useHeavy = true;

  for (let w = 0; w < input.weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);

      if (!input.freeDays[d]) continue;

      let pick: CalendarSubject;
      if (useHeavy && heavy.length > 0) {
        pick = heavy[heavyIdx % heavy.length];
        heavyIdx++;
      } else if (!useHeavy && light.length > 0) {
        pick = light[lightIdx % light.length];
        lightIdx++;
      } else if (medium.length > 0) {
        pick = medium[mediumIdx % medium.length];
        mediumIdx++;
      } else {
        pick = subjects[(heavyIdx + lightIdx) % subjects.length];
      }
      useHeavy = !useHeavy;

      const hours = Math.min(input.hoursPerDay, pick.hours);

      plan.push({
        date: formatDate(date),
        dayLabel: DAY_LABELS[d],
        subject: pick.label,
        intensity: pick.intensity,
        hours,
        universidades: pick.universidades.filter((u) =>
          input.universidades.length ? input.universidades.includes(u) : true
        ),
        note:
          pick.intensity === 'pesada'
            ? 'Bloque profundo — sin distracciones'
            : pick.intensity === 'ligera'
              ? 'Ideal después de un bloque pesado'
              : undefined,
      });
    }
  }

  return plan;
}

export function calendarToCsv(plan: CalendarDayPlan[]): string {
  const header = 'Fecha,Día,Materia,Intensidad,Horas,Universidades,Nota';
  const rows = plan.map(
    (p) =>
      `${p.date},${p.dayLabel},"${p.subject}",${p.intensity},${p.hours},"${p.universidades.join('+')}","${p.note ?? ''}"`
  );
  return [header, ...rows].join('\n');
}

export { DAY_LABELS };
