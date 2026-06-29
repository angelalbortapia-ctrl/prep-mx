'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Flame,
  Lightbulb,
  List,
  Lock,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getCourseStats,
  getFirstIncompleteLesson,
  getGlobalLessonIndex,
  getLessonsGroupedByModule,
  getNextLesson,
  implementationCourse,
  isLessonUnlocked,
  type CourseLesson,
} from '@/data/implementation-course';
import {
  clearCelebration,
  completeLesson,
  isLessonComplete,
  isStepChecked,
  toggleStep,
  type CourseProgress,
} from '@/lib/course-progress';
import { useCourseProgress } from '@/hooks/useCourseProgress';

const XP_PER_STEP = 10;
const XP_PER_LESSON = 50;
const XP_PER_LEVEL = 100;

type CardKind = 'intro' | 'step' | 'cursor' | 'verify';

function computeXp(progress: CourseProgress) {
  const stepXp =
    Object.values(progress.checkedSteps).reduce((sum, arr) => sum + arr.length, 0) *
    XP_PER_STEP;
  const lessonXp = progress.completedLessonIds.length * XP_PER_LESSON;
  const total = stepXp + lessonXp;
  const level = Math.floor(total / XP_PER_LEVEL) + 1;
  const inLevel = total % XP_PER_LEVEL;
  return { total, level, inLevel, pctToNext: Math.round((inLevel / XP_PER_LEVEL) * 100) };
}

export function GuidedCourse() {
  const { progress, hydrated, isSyncing, useLocalOnly, persist, syncToggle, resetProgress } =
    useCourseProgress();
  const [copied, setCopied] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showTemario, setShowTemario] = useState(false);
  const [xpFlash, setXpFlash] = useState(0);

  useEffect(() => {
    if (!hydrated || progress.currentLessonId) return;
    const first = getFirstIncompleteLesson(progress.completedLessonIds);
    persist({ ...progress, currentLessonId: first.id });
    if (!useLocalOnly) {
      syncToggle({ lessonId: first.id, currentLessonId: first.id });
    }
    // Solo al hidratar sin lección activa guardada
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, progress.currentLessonId]);

  const saveProgress = useCallback(
    (next: CourseProgress, sync?: Parameters<typeof syncToggle>[0]) => {
      persist(next);
      if (sync) syncToggle(sync);
    },
    [persist, syncToggle]
  );

  const currentLesson =
    implementationCourse.find((l) => l.id === progress.currentLessonId) ??
    getFirstIncompleteLesson(progress.completedLessonIds);

  const courseStats = getCourseStats(progress.completedLessonIds);
  const nextLesson = getNextLesson(currentLesson.id);
  const globalNum = getGlobalLessonIndex(currentLesson.id);
  const stepCount = currentLesson.steps.length;
  const totalCards = stepCount + 3;
  const xp = computeXp(progress);

  const allStepsDone =
    currentLesson.autoComplete ||
    currentLesson.steps.every((s) => isStepChecked(currentLesson.id, s.id, progress));

  useEffect(() => {
    if (!hydrated) return;
    const done = currentLesson.steps.filter((s) =>
      isStepChecked(currentLesson.id, s.id, progress)
    ).length;
    if (done === 0) setCardIndex(0);
    else if (done < stepCount) setCardIndex(done + 1);
    else setCardIndex(stepCount + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLesson.id, hydrated]);

  const cardKind: CardKind =
    cardIndex === 0
      ? 'intro'
      : cardIndex <= stepCount
        ? 'step'
        : cardIndex === stepCount + 1
          ? 'cursor'
          : 'verify';

  const lessonPct = Math.round((cardIndex / (totalCards - 1)) * 100);

  const goToLesson = (lesson: CourseLesson) => {
    if (!isLessonUnlocked(lesson, progress.completedLessonIds)) return;
    setShowTemario(false);
    const next = { ...progress, currentLessonId: lesson.id, justCompletedLessonId: null };
    saveProgress(next, {
      lessonId: lesson.id,
      currentLessonId: lesson.id,
      justCompletedLessonId: null,
    });
  };

  const flashXp = () => {
    setXpFlash((n) => n + 1);
    setTimeout(() => setXpFlash((n) => Math.max(0, n - 1)), 1400);
  };

  const advance = () => setCardIndex((i) => Math.min(i + 1, totalCards - 1));
  const goBack = () => setCardIndex((i) => Math.max(i - 1, 0));

  const handleStepDone = (stepId: string) => {
    if (!isStepChecked(currentLesson.id, stepId, progress)) {
      const next = toggleStep(progress, currentLesson.id, stepId);
      saveProgress(next, {
        lessonId: currentLesson.id,
        stepId,
        activeStepIndex: next.activeStepIndex[currentLesson.id],
      });
      flashXp();
    }
    advance();
  };

  const handleCompleteLesson = () => {
    if (!allStepsDone) return;
    const next = completeLesson(progress, currentLesson.id, nextLesson?.id ?? null);
    saveProgress(next, {
      lessonId: currentLesson.id,
      completed: true,
      currentLessonId: next.currentLessonId,
      justCompletedLessonId: next.justCompletedLessonId,
    });
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(currentLesson.cursorPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (!confirm('¿Reiniciar progreso del curso? No borra tu código.')) return;
    resetProgress();
    setCardIndex(0);
    setShowTemario(false);
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border bg-white/80">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  /* ───── Celebración ───── */
  if (progress.justCompletedLessonId) {
    const done = implementationCourse.find((l) => l.id === progress.justCompletedLessonId);
    const nextAfter = done ? getNextLesson(done.id) : null;
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <div className="exam-shell border-green-200 bg-gradient-to-b from-green-50 to-white p-8">
          <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-green-100">
            <PartyPopper className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold">¡Bien hecho! 🎉</h2>
          <p className="mt-1 font-semibold text-primary">{done?.title}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-amber-600">
            <Zap className="h-4 w-4 fill-amber-500" />
            +{XP_PER_LESSON} XP · Nivel {xp.level}
          </div>

          <div className="mt-5 rounded-2xl bg-primary/5 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Avance del curso</span>
              <span className="font-bold tabular-nums text-primary">{courseStats.pct}%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                style={{ width: `${courseStats.pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {courseStats.done} de {courseStats.total} lecciones completadas
            </p>
          </div>

          <div className="mt-6">
            {nextAfter ? (
              <Button
                size="lg"
                className="w-full gap-2 shadow-lg shadow-primary/20"
                onClick={() => {
                  const next = clearCelebration({ ...progress, currentLessonId: nextAfter.id });
                  saveProgress(next, {
                    lessonId: nextAfter.id,
                    currentLessonId: nextAfter.id,
                    justCompletedLessonId: null,
                  });
                  setCardIndex(0);
                }}
              >
                Siguiente: {nextAfter.title}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="lg" className="w-full" onClick={() => {
                const next = clearCelebration(progress);
                saveProgress(next, {
                  lessonId: currentLesson.id,
                  justCompletedLessonId: null,
                });
              }}>
                ¡Terminaste el curso! Volver
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {xpFlash > 0 && (
        <div className="pointer-events-none fixed left-1/2 top-28 z-50 -translate-x-1/2 animate-bounce">
          <span className="flex items-center gap-1 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-amber-950 shadow-lg">
            <Zap className="h-4 w-4 fill-amber-950" />+{XP_PER_STEP} XP
          </span>
        </div>
      )}

      {/* Barra superior móvil */}
      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setShowTemario(true)}
          className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm font-medium shadow-sm"
        >
          <List className="h-4 w-4" />
          Temario
        </button>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-bold text-amber-600">
            <Zap className="h-4 w-4 fill-amber-500" />
            {xp.total}
          </span>
          <span className="font-bold text-primary">{courseStats.pct}%</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[270px_1fr] xl:grid-cols-[280px_1fr_300px]">
        {/* ───── IZQUIERDA · Tu ruta (lg+) ───── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <GamificationCard xp={xp} courseStats={courseStats} />
            <div className="exam-shell p-0">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-bold">Temario</p>
              </div>
              <div className="max-h-[52vh] overflow-y-auto p-2">
                <LessonList
                  progress={progress}
                  currentLessonId={currentLesson.id}
                  onSelect={goToLesson}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Reiniciar progreso
            </button>
            {!useLocalOnly && isSyncing ? (
              <p className="text-center text-[10px] text-primary">Guardando en Supabase…</p>
            ) : null}
          </div>
        </aside>

        {/* ───── CENTRO · Lección activa ───── */}
        <div className="min-w-0 space-y-5">
          {/* Hero de la lección */}
          <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-primary to-accent p-6 text-white shadow-lg shadow-primary/20 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                Módulo {currentLesson.moduleNumber} · {currentLesson.moduleTitle}
              </p>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                Lección {globalNum}/{implementationCourse.length}
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl">
              {currentLesson.title}
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${lessonPct}%` }}
                />
              </div>
              <span className="text-xs font-bold tabular-nums">
                {cardIndex + 1}/{totalCards}
              </span>
            </div>
          </div>

          {/* Tarjeta activa */}
          <div key={cardIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {cardKind === 'intro' && (
              <div className="exam-shell space-y-5 p-6 md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Lightbulb className="h-7 w-7 text-primary" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-primary/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Qué vas a hacer
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed">{currentLesson.what}</p>
                  </div>
                  <div className="rounded-2xl bg-accent/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-accent">
                      Por qué importa
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed">{currentLesson.why}</p>
                  </div>
                </div>
                <Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/20" onClick={advance}>
                  ¡Vamos! Empezar
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {cardKind === 'step' && (
              <StepCard
                stepNumber={cardIndex}
                totalSteps={stepCount}
                text={currentLesson.steps[cardIndex - 1].text}
                alreadyDone={isStepChecked(
                  currentLesson.id,
                  currentLesson.steps[cardIndex - 1].id,
                  progress
                )}
                onBack={goBack}
                onDone={() => handleStepDone(currentLesson.steps[cardIndex - 1].id)}
              />
            )}

            {cardKind === 'cursor' && (
              <div className="exam-shell space-y-4 bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6 md:p-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">Pídeselo a Cursor</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Abre Cursor con{' '}
                  <kbd className="rounded border bg-white px-1.5 py-0.5 font-mono text-xs">Cmd+I</kbd>{' '}
                  y pega este texto. Él hace el código por ti.
                </p>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {currentLesson.cursorPrompt}
                  </p>
                </div>
                <Button
                  size="lg"
                  variant={copied ? 'secondary' : 'default'}
                  className="w-full gap-2"
                  onClick={handleCopyPrompt}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? '¡Copiado! Pégalo en Cursor' : 'Copiar para Cursor'}
                </Button>
                <Button size="lg" variant="outline" className="w-full gap-2" onClick={advance}>
                  Ya lo pegué, continuar
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {cardKind === 'verify' && (
              <div className="exam-shell space-y-5 border-green-200 bg-gradient-to-b from-green-50/60 to-white p-6 md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <Target className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-800">
                    Última revisión
                  </p>
                  <p className="mt-1.5 text-lg font-medium leading-relaxed">{currentLesson.verify}</p>
                </div>
                {!allStepsDone && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Te faltan pasos por marcar. Usa “Atrás” para completarlos.
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={goBack}>
                    Atrás
                  </Button>
                  <Button
                    size="lg"
                    disabled={!allStepsDone}
                    onClick={handleCompleteLesson}
                    className="flex-1 gap-2 shadow-lg shadow-primary/20"
                  >
                    {nextLesson ? '¡Completar lección!' : '¡Terminar el curso!'}
                    <Check className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ───── DERECHA · Chuleta de apoyo (xl+) ───── */}
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-4">
            <div className="exam-shell p-5">
              <div className="flex items-center gap-2 text-primary">
                <Target className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wider">Objetivo</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{currentLesson.what}</p>
              <div className="mt-4 rounded-xl bg-green-50 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-green-800">
                  Sabrás que terminaste cuando
                </p>
                <p className="mt-1 text-sm leading-relaxed text-green-950/90">
                  {currentLesson.verify}
                </p>
              </div>
            </div>

            <div className="exam-shell p-5">
              <div className="flex items-center gap-2 text-primary">
                <Wrench className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wider">Herramientas Cursor</p>
              </div>
              <ul className="mt-3 space-y-3">
                {currentLesson.cursorTools.map((t) => (
                  <li key={t.name} className="text-sm">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.when}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {showTemario && (
        <TemarioOverlay
          progress={progress}
          currentLessonId={currentLesson.id}
          coursePct={courseStats.pct}
          onClose={() => setShowTemario(false)}
          onSelect={goToLesson}
        />
      )}
    </div>
  );
}

/* ───────────── Gamificación ───────────── */

function GamificationCard({
  xp,
  courseStats,
}: {
  xp: { total: number; level: number; inLevel: number; pctToNext: number };
  courseStats: { done: number; total: number; pct: number };
}) {
  return (
    <div className="exam-shell overflow-hidden p-0">
      <div className="bg-gradient-to-br from-primary to-accent p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-white/80">Nivel</p>
              <p className="text-xl font-extrabold leading-none">{xp.level}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold">
            <Zap className="h-3.5 w-3.5 fill-white" />
            {xp.total} XP
          </span>
        </div>
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${xp.pctToNext}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-white/80">
            {XP_PER_LEVEL - xp.inLevel} XP para nivel {xp.level + 1}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x">
        <div className="p-3 text-center">
          <p className="text-lg font-extrabold tabular-nums">{courseStats.done}</p>
          <p className="text-[11px] text-muted-foreground">Lecciones</p>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-3">
          <Flame className="h-4 w-4 text-amber-500" />
          <div>
            <p className="text-lg font-extrabold leading-none tabular-nums">{courseStats.pct}%</p>
            <p className="text-[11px] text-muted-foreground">Avance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Tarjeta de paso ───────────── */

function StepCard({
  stepNumber,
  totalSteps,
  text,
  alreadyDone,
  onBack,
  onDone,
}: {
  stepNumber: number;
  totalSteps: number;
  text: string;
  alreadyDone: boolean;
  onBack: () => void;
  onDone: () => void;
}) {
  return (
    <div className="exam-shell space-y-6 border-2 border-primary/15 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
          <Target className="h-4 w-4" />
          Haz esto ahora
        </span>
        <span className="text-xs font-medium tabular-nums text-muted-foreground">
          Paso {stepNumber} de {totalSteps}
        </span>
      </div>
      <p className="text-2xl font-semibold leading-relaxed md:text-3xl">{text}</p>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onBack}>
          Atrás
        </Button>
        <Button size="lg" onClick={onDone} className="flex-1 gap-2 shadow-lg shadow-primary/20">
          {alreadyDone ? (
            <>
              Siguiente
              <ArrowRight className="h-5 w-5" />
            </>
          ) : (
            <>
              <Check className="h-5 w-5" />
              ¡Listo! Marcar y seguir
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

/* ───────────── Lista de lecciones (reutilizable) ───────────── */

function LessonList({
  progress,
  currentLessonId,
  onSelect,
}: {
  progress: CourseProgress;
  currentLessonId: string;
  onSelect: (lesson: CourseLesson) => void;
}) {
  const modules = getLessonsGroupedByModule();
  return (
    <>
      {modules.map((mod) => (
        <div key={mod.id} className="mb-3">
          <p className="mb-1 px-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            M{mod.number} · {mod.title}
          </p>
          <ul className="space-y-0.5">
            {mod.lessons.map((lesson) => {
              const unlocked = isLessonUnlocked(lesson, progress.completedLessonIds);
              const done = isLessonComplete(lesson.id, progress, lesson.autoComplete);
              const active = lesson.id === currentLessonId;
              return (
                <li key={lesson.id}>
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => onSelect(lesson)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : unlocked
                          ? 'hover:bg-muted'
                          : 'cursor-not-allowed opacity-40'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        active
                          ? 'bg-white/20'
                          : done
                            ? 'bg-green-100 text-green-700'
                            : unlocked
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : !unlocked ? (
                        <Lock className="h-3 w-3" />
                      ) : (
                        lesson.lessonNumber
                      )}
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate font-medium">{lesson.title}</span>
                      <span
                        className={`text-[11px] ${
                          active ? 'text-primary-foreground/75' : 'text-muted-foreground'
                        }`}
                      >
                        {lesson.duration}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ───────────── Temario overlay (móvil) ───────────── */

function TemarioOverlay({
  progress,
  currentLessonId,
  coursePct,
  onClose,
  onSelect,
}: {
  progress: CourseProgress;
  currentLessonId: string;
  coursePct: number;
  onClose: () => void;
  onSelect: (lesson: CourseLesson) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <p className="font-bold">Temario del curso</p>
            <p className="text-xs text-muted-foreground">{coursePct}% completado</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <LessonList progress={progress} currentLessonId={currentLessonId} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}
