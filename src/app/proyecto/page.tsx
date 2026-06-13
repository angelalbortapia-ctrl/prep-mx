'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getProjectStats,
  projectPhases,
  type PhaseStatus,
} from '@/data/project-phases';

const statusConfig: Record<
  PhaseStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  completado: {
    label: 'Completado',
    className: 'bg-green-100 text-green-700',
    icon: CheckCircle2,
  },
  en_progreso: {
    label: 'En progreso',
    className: 'bg-amber-100 text-amber-700',
    icon: Clock,
  },
  pendiente: {
    label: 'Pendiente',
    className: 'bg-muted text-muted-foreground',
    icon: Circle,
  },
};

export default function ProyectoTimelinePage() {
  const router = useRouter();
  const stats = getProjectStats(projectPhases);

  async function handleLogout() {
    await fetch('/api/proyecto/logout', { method: 'POST' });
    router.push('/proyecto/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-mesh">
      <header className="glass-header border-b">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">PrepMX</p>
            <h1 className="text-xl font-bold">Timeline del proyecto</h1>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl bg-white" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Salir
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8 md:px-8">
        <section className="exam-shell grid gap-4 sm:grid-cols-4">
          <Stat label="Progreso total" value={`${stats.pct}%`} highlight />
          <Stat label="Completadas" value={String(stats.done)} />
          <Stat label="En progreso" value={String(stats.inProgress)} />
          <Stat label="Total tareas" value={String(stats.total)} />
        </section>

        <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-border md:before:left-[23px]">
          {projectPhases.map((phase, index) => {
            const cfg = statusConfig[phase.status];
            const PhaseIcon = cfg.icon;

            return (
              <article key={phase.id} className="relative pl-12 md:pl-14">
                <span
                  className={`absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-sm md:h-12 md:w-12 ${cfg.className}`}
                >
                  <PhaseIcon className="h-5 w-5" />
                </span>

                <div className="exam-shell space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{phase.weeks}</p>
                      <h2 className="text-lg font-bold">{phase.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{phase.objective}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cfg.className}`}>
                      {cfg.label}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {phase.tasks.map((task) => {
                      const taskCfg = statusConfig[task.status];
                      const TaskIcon = taskCfg.icon;
                      return (
                        <li
                          key={task.id}
                          className="flex items-center gap-3 rounded-lg border bg-white/60 px-3 py-2.5 text-sm"
                        >
                          <TaskIcon className={`h-4 w-4 shrink-0 ${task.status === 'completado' ? 'text-green-600' : task.status === 'en_progreso' ? 'text-amber-600' : 'text-muted-foreground'}`} />
                          <span className={task.status === 'completado' ? 'text-foreground' : 'text-muted-foreground'}>
                            {task.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {index === 0 && phase.status === 'en_progreso' && (
                    <p className="text-xs text-primary font-medium">
                      ← Estamos aquí ahora
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-primary' : ''}`}>{value}</p>
    </div>
  );
}
