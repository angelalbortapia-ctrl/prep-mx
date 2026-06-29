import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { DbUserCourseStateRow, DbUserLessonProgressRow } from '@/types/database';
import {
  completeLesson,
  getDefaultProgress,
  toggleStep,
  type CourseProgress,
} from '@/lib/course-progress';

type Supabase = SupabaseClient<Database>;

export interface LessonToggleInput {
  lessonId: string;
  completed?: boolean;
  stepId?: string;
  activeStepIndex?: number;
  currentLessonId?: string | null;
  justCompletedLessonId?: string | null;
  reset?: boolean;
  importProgress?: CourseProgress;
}

export interface CourseProgressStudentSummary {
  userId: string;
  email: string;
  fullName: string | null;
  currentLessonId: string | null;
  completedLessons: number;
  lastActivityAt: string | null;
}

function parseCheckedSteps(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((s): s is string => typeof s === 'string');
}

export function rowsToCourseProgress(
  rows: DbUserLessonProgressRow[],
  state: DbUserCourseStateRow | null
): CourseProgress {
  const progress = getDefaultProgress();

  for (const row of rows) {
    if (row.completed) {
      progress.completedLessonIds.push(row.lesson_id);
    }
    const steps = parseCheckedSteps(row.checked_steps);
    if (steps.length > 0) {
      progress.checkedSteps[row.lesson_id] = steps;
    }
    if (row.active_step_index > 0) {
      progress.activeStepIndex[row.lesson_id] = row.active_step_index;
    }
  }

  progress.completedLessonIds = Array.from(new Set(progress.completedLessonIds));
  progress.currentLessonId = state?.current_lesson_id ?? progress.currentLessonId;
  progress.justCompletedLessonId = state?.just_completed_lesson_id ?? null;

  return progress;
}

export async function fetchCourseProgress(
  supabase: Supabase,
  userId: string
): Promise<CourseProgress> {
  const [lessonsRes, stateRes] = await Promise.all([
    supabase.from('user_lessons_progress').select('*').eq('user_id', userId),
    supabase.from('user_course_state').select('*').eq('user_id', userId).maybeSingle(),
  ]);

  if (lessonsRes.error) throw new Error(lessonsRes.error.message);
  if (stateRes.error) throw new Error(stateRes.error.message);

  return rowsToCourseProgress(
    (lessonsRes.data ?? []) as DbUserLessonProgressRow[],
    (stateRes.data as DbUserCourseStateRow | null) ?? null
  );
}

async function upsertLessonRow(
  supabase: Supabase,
  userId: string,
  lessonId: string,
  patch: Partial<{
    completed: boolean;
    checked_steps: string[];
    active_step_index: number;
    completed_at: string | null;
  }>
): Promise<void> {
  const { data: existing } = await supabase
    .from('user_lessons_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .maybeSingle();

  const current = existing as DbUserLessonProgressRow | null;
  const checked_steps = patch.checked_steps ?? parseCheckedSteps(current?.checked_steps);
  const active_step_index = patch.active_step_index ?? current?.active_step_index ?? 0;
  const completed = patch.completed ?? current?.completed ?? false;

  const { error } = await supabase.from('user_lessons_progress').upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      completed,
      checked_steps,
      active_step_index,
      completed_at:
        patch.completed_at !== undefined
          ? patch.completed_at
          : completed
            ? (current?.completed_at ?? new Date().toISOString())
            : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_id' }
  );

  if (error) throw new Error(error.message);
}

async function upsertCourseState(
  supabase: Supabase,
  userId: string,
  patch: Partial<{
    current_lesson_id: string | null;
    just_completed_lesson_id: string | null;
  }>
): Promise<void> {
  const payload = {
    user_id: userId,
    ...patch,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('user_course_state').upsert(payload, {
    onConflict: 'user_id',
  });
  if (error) throw new Error(error.message);
}

export async function importCourseProgressToDb(
  supabase: Supabase,
  userId: string,
  progress: CourseProgress
): Promise<CourseProgress> {
  const lessonIds = new Set([
    ...progress.completedLessonIds,
    ...Object.keys(progress.checkedSteps),
    ...Object.keys(progress.activeStepIndex),
  ]);

  for (const lessonId of Array.from(lessonIds)) {
    await upsertLessonRow(supabase, userId, lessonId, {
      completed: progress.completedLessonIds.includes(lessonId),
      checked_steps: progress.checkedSteps[lessonId] ?? [],
      active_step_index: progress.activeStepIndex[lessonId] ?? 0,
      completed_at: progress.completedLessonIds.includes(lessonId)
        ? new Date().toISOString()
        : null,
    });
  }

  await upsertCourseState(supabase, userId, {
    current_lesson_id: progress.currentLessonId,
    just_completed_lesson_id: progress.justCompletedLessonId,
  });

  return fetchCourseProgress(supabase, userId);
}

export async function applyLessonToggle(
  supabase: Supabase,
  userId: string,
  input: LessonToggleInput
): Promise<CourseProgress> {
  if (input.reset) {
    await supabase.from('user_lessons_progress').delete().eq('user_id', userId);
    await supabase.from('user_course_state').delete().eq('user_id', userId);
    return getDefaultProgress();
  }

  if (input.importProgress) {
    return importCourseProgressToDb(supabase, userId, input.importProgress);
  }

  const { lessonId } = input;
  if (!lessonId) throw new Error('lessonId requerido');

  if (input.stepId) {
    const current = await fetchCourseProgress(supabase, userId);
    const next = toggleStep(current, lessonId, input.stepId);
    const steps = next.checkedSteps[lessonId] ?? [];
    await upsertLessonRow(supabase, userId, lessonId, {
      checked_steps: steps,
      active_step_index: input.activeStepIndex ?? next.activeStepIndex[lessonId] ?? 0,
    });
  } else if (input.activeStepIndex !== undefined) {
    await upsertLessonRow(supabase, userId, lessonId, {
      active_step_index: input.activeStepIndex,
    });
  }

  if (input.completed !== undefined) {
    await upsertLessonRow(supabase, userId, lessonId, {
      completed: input.completed,
      completed_at: input.completed ? new Date().toISOString() : null,
    });
  }

  if (input.currentLessonId !== undefined || input.justCompletedLessonId !== undefined) {
    const statePatch: Partial<{
      current_lesson_id: string | null;
      just_completed_lesson_id: string | null;
    }> = {};
    if (input.currentLessonId !== undefined) {
      statePatch.current_lesson_id = input.currentLessonId;
    }
    if (input.justCompletedLessonId !== undefined) {
      statePatch.just_completed_lesson_id = input.justCompletedLessonId;
    }
    await upsertCourseState(supabase, userId, statePatch);
  }

  return fetchCourseProgress(supabase, userId);
}

/** Resumen para panel admin: quién avanza y quién está trabado. */
export async function fetchCourseProgressSummaries(
  supabase: Supabase
): Promise<CourseProgressStudentSummary[]> {
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, email, full_name')
    .order('created_at', { ascending: false })
    .limit(200);

  if (usersError || !users?.length) return [];

  const userIds = users.map((u) => u.id);

  const [lessonsRes, statesRes] = await Promise.all([
    supabase.from('user_lessons_progress').select('*').in('user_id', userIds),
    supabase.from('user_course_state').select('*').in('user_id', userIds),
  ]);

  if (lessonsRes.error) throw new Error(lessonsRes.error.message);
  if (statesRes.error) throw new Error(statesRes.error.message);

  const lessonsByUser = new Map<string, DbUserLessonProgressRow[]>();
  for (const row of (lessonsRes.data ?? []) as DbUserLessonProgressRow[]) {
    const list = lessonsByUser.get(row.user_id) ?? [];
    list.push(row);
    lessonsByUser.set(row.user_id, list);
  }

  const stateByUser = new Map(
    ((statesRes.data ?? []) as DbUserCourseStateRow[]).map((s) => [s.user_id, s])
  );

  return users.map((user) => {
    const rows = lessonsByUser.get(user.id) ?? [];
    const state = stateByUser.get(user.id) ?? null;
    const completedLessons = rows.filter((r) => r.completed).length;
    const lastActivityAt =
      rows.reduce<string | null>((latest, row) => {
        if (!row.updated_at) return latest;
        if (!latest || row.updated_at > latest) return row.updated_at;
        return latest;
      }, state?.updated_at ?? null) ?? state?.updated_at ?? null;

    return {
      userId: user.id,
      email: user.email,
      fullName: user.full_name,
      currentLessonId: state?.current_lesson_id ?? null,
      completedLessons,
      lastActivityAt,
    };
  });
}

/** Atajo para marcar lección completa + avanzar a la siguiente. */
export function buildCompleteLessonToggle(
  progress: CourseProgress,
  lessonId: string,
  nextLessonId: string | null
): LessonToggleInput {
  const next = completeLesson(progress, lessonId, nextLessonId);
  return {
    lessonId,
    completed: true,
    currentLessonId: next.currentLessonId,
    justCompletedLessonId: next.justCompletedLessonId,
  };
}
