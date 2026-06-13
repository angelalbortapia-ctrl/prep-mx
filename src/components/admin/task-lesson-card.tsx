'use client';

import { ChevronDown, CheckCircle2, Clock, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { PhaseStatus, PhaseTask, TaskPriority } from '@/data/project-phases';

const statusLabel: Record<PhaseStatus, string> = {
  completado: 'Hecho',
  en_progreso: 'En curso',
  pendiente: 'Pendiente',
};

const priorityLabel: Record<TaskPriority, string> = {
  critica: 'Crítica',
  alta: 'Alta',
  normal: 'Normal',
};

const statusAccent: Record<PhaseStatus, string> = {
  completado: 'border-l-green-500',
  en_progreso: 'border-l-amber-500',
  pendiente: 'border-l-primary',
};

function StatusIcon({ status }: { status: PhaseStatus }) {
  if (status === 'completado') return <CheckCircle2 className="h-5 w-5 text-green-600" />;
  if (status === 'en_progreso') return <Clock className="h-5 w-5 text-amber-500" />;
  return <Circle className="h-5 w-5 text-muted-foreground/35" />;
}

interface TaskLessonCardProps {
  task: PhaseTask;
  index: number;
  phaseLabel?: string;
  defaultOpen?: boolean;
  showAction?: boolean;
}

export function TaskLessonCard({
  task,
  index,
  phaseLabel,
  defaultOpen = false,
  showAction = true,
}: TaskLessonCardProps) {
  return (
    <details
      open={defaultOpen}
      className={`group exam-shell border-l-4 ${statusAccent[task.status]} overflow-hidden p-0`}
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 marker:content-none hover:bg-muted/30 [&::-webkit-details-marker]:hidden">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusIcon status={task.status} />
            <h3
              className={`font-semibold leading-snug ${
                task.status === 'completado' ? 'text-muted-foreground' : 'text-foreground'
              }`}
            >
              {task.label}
            </h3>
          </div>
          {phaseLabel && (
            <p className="mt-1 text-xs text-muted-foreground">{phaseLabel}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="outline" className="font-normal">
              {statusLabel[task.status]}
            </Badge>
            {task.priority && (
              <Badge
                variant={
                  task.priority === 'critica'
                    ? 'default'
                    : task.priority === 'alta'
                      ? 'warning'
                      : 'secondary'
                }
                className="font-normal"
              >
                {priorityLabel[task.priority]}
              </Badge>
            )}
          </div>
        </div>
        <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>

      <div className="border-t bg-muted/20 px-5 py-4">
        <dl className="space-y-4">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-primary">
              Qué es
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">
              {task.what}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-primary">
              Por qué importa
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">
              {task.why}
            </dd>
          </div>
          {showAction && task.action && task.status !== 'completado' && (
            <div className="rounded-xl border border-primary/20 bg-white p-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-primary">
                Qué hacer ahora
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed">{task.action}</dd>
            </div>
          )}
        </dl>
      </div>
    </details>
  );
}
