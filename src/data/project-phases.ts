export type PhaseStatus = 'completado' | 'en_progreso' | 'pendiente';

export interface PhaseTask {
  id: string;
  label: string;
  status: PhaseStatus;
}

export interface ProjectPhase {
  id: string;
  title: string;
  weeks: string;
  objective: string;
  status: PhaseStatus;
  tasks: PhaseTask[];
}

export const projectPhases: ProjectPhase[] = [
  {
    id: 'paso-1',
    title: 'Paso 1 — Fundación',
    weeks: 'Semanas 1–3',
    objective: 'Infraestructura, registro y banco de preguntas inicial.',
    status: 'en_progreso',
    tasks: [
      { id: '1-1', label: 'Repositorio GitHub + ramas main/develop', status: 'completado' },
      { id: '1-2', label: 'Next.js 14 + Tailwind + Shadcn/ui', status: 'completado' },
      { id: '1-3', label: 'Landing + rutas marketing y dashboard', status: 'completado' },
      { id: '1-4', label: 'Componentes simulador (QuestionCard, Timer, MathRenderer)', status: 'completado' },
      { id: '1-5', label: 'Supabase — tablas users, questions, user_progress', status: 'pendiente' },
      { id: '1-6', label: 'Clerk — autenticación alumnos', status: 'pendiente' },
      { id: '1-7', label: '200 preguntas iniciales en BD', status: 'pendiente' },
      { id: '1-8', label: 'Vercel + Sentry + Cloudflare', status: 'pendiente' },
    ],
  },
  {
    id: 'paso-2',
    title: 'Paso 2 — Simulador y AI',
    weeks: 'Semanas 4–7',
    objective: 'Simulacros con diagnóstico IA y tutor 24/7.',
    status: 'pendiente',
    tasks: [
      { id: '2-1', label: 'Flujo simulacro → submit → Inngest job', status: 'pendiente' },
      { id: '2-2', label: 'Algoritmo SM-2 (repetición espaciada)', status: 'pendiente' },
      { id: '2-3', label: 'AI Tutor seguro (/api/ai-tutor)', status: 'pendiente' },
      { id: '2-4', label: 'Multi-LLM + caché semántico', status: 'pendiente' },
      { id: '2-5', label: 'Planificador adaptativo', status: 'pendiente' },
    ],
  },
  {
    id: 'paso-3',
    title: 'Paso 3 — Monetización',
    weeks: 'Semanas 8–10',
    objective: 'Ingresos reales con Stripe, LFPD y admin.',
    status: 'pendiente',
    tasks: [
      { id: '3-1', label: 'Stripe (tarjeta, OXXO, SPEI)', status: 'pendiente' },
      { id: '3-2', label: 'Aviso de privacidad LFPD', status: 'pendiente' },
      { id: '3-3', label: 'Facturapi CFDI 4.0', status: 'pendiente' },
      { id: '3-4', label: 'Admin dashboard (MRR, DAU)', status: 'pendiente' },
    ],
  },
  {
    id: 'paso-4',
    title: 'Paso 4 — Escala',
    weeks: 'Semanas 11–16',
    objective: 'App móvil, gamificación y B2B.',
    status: 'pendiente',
    tasks: [
      { id: '4-1', label: 'Capacitor iOS/Android', status: 'pendiente' },
      { id: '4-2', label: 'Gamificación (insignias, rachas, leaderboard)', status: 'pendiente' },
      { id: '4-3', label: 'Dashboard tutor/papás', status: 'pendiente' },
      { id: '4-4', label: 'Publicación App Store / Google Play', status: 'pendiente' },
    ],
  },
];

export function getProjectStats(phases: ProjectPhase[]) {
  const allTasks = phases.flatMap((p) => p.tasks);
  const done = allTasks.filter((t) => t.status === 'completado').length;
  const inProgress = allTasks.filter((t) => t.status === 'en_progreso').length;
  const total = allTasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return { done, inProgress, total, pct };
}
