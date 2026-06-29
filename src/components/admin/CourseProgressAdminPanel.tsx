'use client';

import { useQuery } from '@tanstack/react-query';
import { implementationCourse } from '@/data/implementation-course';
import type { CourseProgressStudentSummary } from '@/lib/supabase/lessons-progress';

const TOTAL_LESSONS = implementationCourse.length;

function lessonTitle(lessonId: string | null): string {
  if (!lessonId) return 'Sin iniciar';
  return implementationCourse.find((l) => l.id === lessonId)?.title ?? lessonId;
}

export function CourseProgressAdminPanel() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'course-progress'],
    queryFn: async () => {
      const res = await fetch('/api/admin/course-progress', { credentials: 'include' });
      if (!res.ok) throw new Error('No se pudo cargar el resumen');
      return (await res.json()) as {
        students: CourseProgressStudentSummary[];
        synced: boolean;
      };
    },
    staleTime: 60_000,
  });

  const students = (data?.students ?? []).filter(
    (s) => s.completedLessons > 0 || s.currentLessonId
  );

  return (
    <div className="rounded-2xl border bg-white/80 p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold">Progreso del curso (alumnos)</p>
          <p className="text-xs text-muted-foreground">
            Sincronizado en Supabase · {TOTAL_LESSONS} lecciones
          </p>
        </div>
        {data?.synced ? (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            En vivo
          </span>
        ) : null}
      </div>

      {isLoading ? (
        <p className="mt-4 text-sm text-muted-foreground">Cargando…</p>
      ) : isError ? (
        <p className="mt-4 text-sm text-amber-700">
          Ejecuta la migración 005 en Supabase para ver el seguimiento.
        </p>
      ) : students.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Aún no hay alumnos con progreso guardado en la BD.
        </p>
      ) : (
        <ul className="mt-4 max-h-56 space-y-2 overflow-y-auto text-sm">
          {students.map((student) => {
            const pct = Math.round((student.completedLessons / TOTAL_LESSONS) * 100);
            const stuck = student.completedLessons < 2 && student.currentLessonId;
            return (
              <li
                key={student.userId}
                className="flex items-start justify-between gap-3 rounded-xl border border-border/60 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {student.fullName ?? student.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lessonTitle(student.currentLessonId)} · {student.completedLessons}/{TOTAL_LESSONS}{' '}
                    ({pct}%)
                  </p>
                </div>
                {stuck ? (
                  <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-800">
                    Seguimiento
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
