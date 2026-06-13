const STORAGE_KEY = 'prepmx-course-progress-v2';

export interface CourseProgress {
  completedLessonIds: string[];
  checkedSteps: Record<string, string[]>;
  currentLessonId: string | null;
  /** Índice del paso activo por lección (modo enfoque) */
  activeStepIndex: Record<string, number>;
  /** ID de lección recién completada (para pantalla de logro) */
  justCompletedLessonId: string | null;
}

export function getDefaultProgress(): CourseProgress {
  return {
    completedLessonIds: [],
    checkedSteps: {},
    currentLessonId: null,
    activeStepIndex: {},
    justCompletedLessonId: null,
  };
}

export function loadCourseProgress(): CourseProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return { ...getDefaultProgress(), ...JSON.parse(raw) };
  } catch {
    return getDefaultProgress();
  }
}

export function saveCourseProgress(progress: CourseProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isLessonComplete(
  lessonId: string,
  progress: CourseProgress,
  autoComplete?: boolean
): boolean {
  if (autoComplete) return true;
  return progress.completedLessonIds.includes(lessonId);
}

export function isStepChecked(
  lessonId: string,
  stepId: string,
  progress: CourseProgress
): boolean {
  return (progress.checkedSteps[lessonId] ?? []).includes(stepId);
}

export function toggleStep(
  progress: CourseProgress,
  lessonId: string,
  stepId: string
): CourseProgress {
  const current = progress.checkedSteps[lessonId] ?? [];
  const next = current.includes(stepId)
    ? current.filter((id) => id !== stepId)
    : [...current, stepId];
  return {
    ...progress,
    checkedSteps: { ...progress.checkedSteps, [lessonId]: next },
  };
}

export function completeStep(
  progress: CourseProgress,
  lessonId: string,
  stepId: string,
  totalSteps: number
): CourseProgress {
  const withCheck = toggleStep(progress, lessonId, stepId);
  const currentIdx = withCheck.activeStepIndex[lessonId] ?? 0;
  const nextIdx = Math.min(currentIdx + 1, totalSteps - 1);
  return {
    ...withCheck,
    activeStepIndex: { ...withCheck.activeStepIndex, [lessonId]: nextIdx },
  };
}

export function getActiveStepIndex(
  progress: CourseProgress,
  lessonId: string,
  totalSteps: number
): number {
  const saved = progress.activeStepIndex[lessonId];
  if (saved !== undefined) return Math.min(saved, totalSteps - 1);
  const checked = progress.checkedSteps[lessonId] ?? [];
  return Math.min(checked.length, totalSteps - 1);
}

export function completeLesson(
  progress: CourseProgress,
  lessonId: string,
  nextLessonId: string | null
): CourseProgress {
  const completed = progress.completedLessonIds.includes(lessonId)
    ? progress.completedLessonIds
    : [...progress.completedLessonIds, lessonId];
  return {
    ...progress,
    completedLessonIds: completed,
    currentLessonId: nextLessonId,
    justCompletedLessonId: lessonId,
  };
}

export function clearCelebration(progress: CourseProgress): CourseProgress {
  return { ...progress, justCompletedLessonId: null };
}

export function resetCourseProgress(): CourseProgress {
  const fresh = getDefaultProgress();
  saveCourseProgress(fresh);
  return fresh;
}
