'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  ListTodo,
  Map,
  Trophy,
  Target,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskLessonCard } from '@/components/admin/task-lesson-card';
import { GuidedCourse } from '@/components/admin/guided-course';
import { CourseProgressAdminPanel } from '@/components/admin/CourseProgressAdminPanel';
import {
  getAdminPriorities,
  getCompletedTasks,
  getPhaseStats,
  getProjectStats,
  projectPhases,
  type PhaseStatus,
} from '@/data/project-phases';

type TabId = 'curso' | 'resumen' | 'pendientes' | 'fases' | 'logros';

const tabs: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'curso', label: 'Mi curso', icon: GraduationCap },
  { id: 'resumen', label: 'Resumen', icon: LayoutDashboard },
  { id: 'pendientes', label: 'Pendientes', icon: ListTodo },
  { id: 'fases', label: 'Plan completo', icon: Map },
  { id: 'logros', label: 'Logros', icon: Trophy },
];

const statusLabel: Record<PhaseStatus, string> = {
  completado: 'Hecho',
  en_progreso: 'En curso',
  pendiente: 'Pendiente',
};

function ProgressBar({ pct, tall = false }: { pct: number; tall?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-full bg-muted ${tall ? 'h-3' : 'h-2'}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function AdminRoadmap() {
  const [activeTab, setActiveTab] = useState<TabId>('curso');
  const stats = getProjectStats(projectPhases);
  const priorities = getAdminPriorities(projectPhases);
  const completed = getCompletedTasks(projectPhases);
  const currentPhase = projectPhases.find((p) => p.status === 'en_progreso');
  const nextTask = priorities[0];

  if (activeTab === 'curso') {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-white/80 text-muted-foreground hover:bg-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
        <CourseProgressAdminPanel />
        <GuidedCourse />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Navegación lateral — estilo módulos de curso */}
      <nav className="lg:w-52 lg:shrink-0">
        <p className="mb-3 hidden text-xs font-bold uppercase tracking-wider text-muted-foreground lg:block">
          Menú
        </p>
        <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <li key={id} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {id === 'pendientes' && stats.pending + stats.inProgress > 0 && (
                  <span
                    className={`ml-auto hidden rounded-full px-2 py-0.5 text-xs lg:inline ${
                      activeTab === id ? 'bg-white/20' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {stats.pending + stats.inProgress}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="min-w-0 flex-1 space-y-6">
        {activeTab === 'resumen' && (
          <>
            <Card className="exam-shell overflow-hidden border-primary/15">
              <CardHeader className="pb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Tu progreso
                </p>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <CardTitle className="text-2xl">Avance del MVP</CardTitle>
                  <span className="text-4xl font-extrabold tabular-nums text-primary">
                    {stats.pct}%
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar pct={stats.pct} tall />
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Hecho', value: stats.done, color: 'text-green-600' },
                    { label: 'En curso', value: stats.inProgress, color: 'text-amber-600' },
                    { label: 'Falta', value: stats.pending, color: 'text-foreground' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-muted/50 py-3">
                      <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mapa de fases — vista rápida */}
            <section>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Las 4 etapas
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {projectPhases.map((phase, i) => {
                  const ps = getPhaseStats(phase);
                  const isActive = phase.status === 'en_progreso';
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setActiveTab('fases')}
                      className={`exam-shell text-left transition-shadow hover:shadow-lg ${
                        isActive ? 'ring-2 ring-primary/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-tight">{phase.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{phase.weeks}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <ProgressBar pct={ps.pct} />
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {ps.pct}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Siguiente paso — una sola tarjeta destacada */}
            {nextTask && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Tu siguiente paso
                  </h2>
                </div>
                <TaskLessonCard
                  task={nextTask}
                  index={1}
                  phaseLabel={nextTask.phaseTitle}
                  defaultOpen
                />
                {priorities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('pendientes')}
                    className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Ver los {priorities.length} pendientes
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </section>
            )}
          </>
        )}

        {activeTab === 'pendientes' && (
          <section>
            <header className="mb-6">
              <h2 className="text-xl font-bold">Pendientes de implementación</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ordenados por prioridad. Toca cada tarjeta para ver la explicación completa.
              </p>
            </header>
            <ol className="space-y-3">
              {priorities.map((task, i) => (
                <li key={task.id}>
                  <TaskLessonCard
                    task={task}
                    index={i + 1}
                    phaseLabel={task.phaseTitle}
                    defaultOpen={i === 0}
                  />
                </li>
              ))}
            </ol>
          </section>
        )}

        {activeTab === 'fases' && (
          <section>
            <header className="mb-6">
              <h2 className="text-xl font-bold">Plan completo por fases</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cada fase es un bloque del proyecto. Abre una fase para ver sus lecciones.
              </p>
            </header>
            <div className="space-y-4">
              {projectPhases.map((phase, phaseIndex) => {
                const phaseStats = getPhaseStats(phase);
                const isActive = phase.status === 'en_progreso';

                return (
                  <details
                    key={phase.id}
                    open={isActive}
                    className="group exam-shell overflow-hidden p-0"
                  >
                    <summary className="cursor-pointer list-none px-5 py-5 marker:content-none hover:bg-muted/20 [&::-webkit-details-marker]:hidden">
                      <div className="flex flex-wrap items-start gap-4">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {phaseIndex + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold">{phase.title}</h3>
                            <Badge
                              variant={
                                phase.status === 'completado'
                                  ? 'success'
                                  : phase.status === 'en_progreso'
                                    ? 'warning'
                                    : 'secondary'
                              }
                            >
                              {statusLabel[phase.status]}
                            </Badge>
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{phase.weeks}</p>
                          <p className="mt-1 text-sm">{phase.objective}</p>
                          <div className="mt-3 max-w-md">
                            <ProgressBar pct={phaseStats.pct} tall />
                            <p className="mt-1 text-xs text-muted-foreground">
                              {phaseStats.done} de {phaseStats.total} lecciones · {phaseStats.pct}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </summary>

                    <div className="space-y-4 border-t bg-muted/10 px-5 py-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border bg-white p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-primary">
                            Qué es esta fase
                          </p>
                          <p className="mt-2 text-sm leading-relaxed">{phase.what}</p>
                        </div>
                        <div className="rounded-xl border bg-white p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-primary">
                            Por qué importa
                          </p>
                          <p className="mt-2 text-sm leading-relaxed">{phase.why}</p>
                        </div>
                      </div>

                      <ol className="space-y-3">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={task.id}>
                            <TaskLessonCard
                              task={task}
                              index={taskIndex + 1}
                              defaultOpen={false}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'logros' && (
          <section>
            <header className="mb-6">
              <h2 className="text-xl font-bold">Lo que ya lograste</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {completed.length} piezas listas. Toca cualquiera si quieres recordar qué hiciste y por qué.
              </p>
            </header>
            <ol className="space-y-3">
              {completed.map((task, i) => (
                <li key={task.id}>
                  <TaskLessonCard
                    task={task}
                    index={i + 1}
                    phaseLabel={task.phaseTitle}
                    showAction={false}
                  />
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
