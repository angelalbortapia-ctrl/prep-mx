import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle, Clock } from 'lucide-react';
import {
  getProjectStats,
  projectPhases,
  type PhaseStatus,
} from '@/data/project-phases';

const statusLabel: Record<PhaseStatus, string> = {
  completado: 'Hecho',
  en_progreso: 'En curso',
  pendiente: 'Pendiente',
};

export default function ProyectoTimelinePage() {
  const stats = getProjectStats(projectPhases);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-5">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-lg font-bold">Roadmap PrepMX</h1>
            <p className="text-sm text-muted-foreground">
              {stats.done} de {stats.total} tareas · {stats.pct}%
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-4">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-10 px-4 py-8">
        {projectPhases.map((phase) => (
          <section key={phase.id}>
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground">{phase.weeks}</p>
              <h2 className="text-base font-bold">{phase.title}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{phase.objective}</p>
              <span className="mt-2 inline-block text-xs font-medium text-primary">
                {statusLabel[phase.status]}
              </span>
            </div>

            <ul className="divide-y rounded-xl border">
              {phase.tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-3 px-4 py-3 text-sm">
                  {task.status === 'completado' ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  ) : task.status === 'en_progreso' ? (
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                  )}
                  <span
                    className={
                      task.status === 'completado'
                        ? 'text-foreground line-through decoration-muted-foreground/50'
                        : 'text-foreground'
                    }
                  >
                    {task.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
