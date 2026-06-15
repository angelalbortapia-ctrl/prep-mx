'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Clock, LayoutDashboard, Trophy, Users } from 'lucide-react';
import { ShowcaseDiagnosticChart } from '@/components/marketing/ShowcaseDiagnosticChart';
import { useUniTheme } from '@/hooks/useUniTheme';
import { filterToUniId } from '@/lib/uni-theme-config';
import { getUniVisualIdentity } from '@/lib/uni-visual-identity';
import { playGameSound } from '@/lib/play-game-sound';
import { getLandingAccent, landingBody, landingSectionTitle } from '@/lib/landing-typography';
import { type UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

export type DemoTab = 'simulacros' | 'presion' | 'comunidad' | 'dashboard';

const springTransition = { type: 'spring' as const, stiffness: 280, damping: 26 };

const DEMO_TABS: { id: DemoTab; label: string; icon: typeof Trophy }[] = [
  { id: 'simulacros', label: 'Simulacro vivo', icon: Trophy },
  { id: 'presion', label: 'Modo presión', icon: Clock },
  { id: 'comunidad', label: 'La tribu', icon: Users },
  { id: 'dashboard', label: 'Diagnóstico avanzado', icon: LayoutDashboard },
];

const TUTOR_WRONG =
  'Casi, pero no. El tutor de IA nota que olvidaste balancear los hidrógenos del lado reactivo antes de contar.';
const TUTOR_CORRECT =
  '¡Excelente! Reacción balanceada correctamente: 2 moles de H₂O formados. +10 de dopamina.';

const EXAM_OPTIONS: {
  id: string;
  text: string;
  correct?: boolean;
}[] = [
  { id: 'A', text: '1 mol' },
  { id: 'B', text: '2 mol', correct: true },
  { id: 'C', text: '3 mol' },
  { id: 'D', text: '4 mol' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Ana M.', score: 84, initials: 'AM', avatar: 'bg-emerald-500' },
  { rank: 2, name: 'Carlos R.', score: 81, initials: 'CR', avatar: 'bg-sky-500' },
  { rank: 3, name: 'Diana L.', score: 79, initials: 'DL', avatar: 'bg-violet-500' },
  { rank: 4, name: 'Tú', score: 75, initials: 'TÚ', isUser: true, avatar: 'bg-primary' },
  { rank: 5, name: 'Marco P.', score: 73, initials: 'MP', avatar: 'bg-amber-500' },
];

const CAREER_BY_UNI: Record<UniversidadFilter, string> = {
  unam: 'Medicina · CU',
  ipn: 'Ing. en Inteligencia Artificial',
  uam: 'Medicina · UAM Azcapotzalco',
  todas: 'Medicina · CU',
};

const slideVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

function formatTimer(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

interface ShowcaseSimulacrosViewProps {
  accentHex: string;
  examShellClass: string;
  neonClass: string;
}

function ShowcaseSimulacrosView({ accentHex, examShellClass, neonClass }: ShowcaseSimulacrosViewProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const isCorrect = Boolean(EXAM_OPTIONS.find((o) => o.id === picked)?.correct);
  const shouldShake = picked !== null && !isCorrect && !prefersReducedMotion;

  function handlePick(id: string) {
    if (picked !== null) return;
    setPicked(id);
    const correct = Boolean(EXAM_OPTIONS.find((o) => o.id === id)?.correct);

    if (correct) {
      playGameSound('success');
      if (!prefersReducedMotion && typeof window !== 'undefined') {
        void import('canvas-confetti').then(({ default: confetti }) => {
          confetti({
            particleCount: 64,
            spread: 72,
            origin: { y: 0.62 },
            colors: ['#22c55e', '#3b82f6', '#eab308', accentHex],
          });
        });
      }
    } else {
      playGameSound('error');
      if (!prefersReducedMotion) setShakeKey((k) => k + 1);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          'mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-primary/[0.06] px-4 py-3',
          neonClass
        )}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Simulacro vivo</p>
          <p className="text-sm font-medium text-foreground">Química · Reactivo real de examen</p>
        </div>
        <span className={cn(
          'rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1',
          'text-xs font-semibold text-emerald-400'
        )}>
          En vivo
        </span>
      </div>

      <motion.div
        key={shakeKey}
        className={cn('exam-shell relative flex-1', examShellClass)}
        animate={shouldShake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
      >
        <AnimatePresence>
          {picked && isCorrect && (
            <motion.span
              key="success-badge"
              initial={{ opacity: 0, scale: 0.75, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={springTransition}
              className="absolute right-3 top-3 z-10 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-green-500/30"
            >
              ¡Correcto!
            </motion.span>
          )}
        </AnimatePresence>

        <p className="text-sm font-semibold text-foreground">
          ¿Cuántos moles de H₂O se forman al completar la reacción balanceada?
        </p>

        <div className="mt-4 space-y-2">
          {EXAM_OPTIONS.map((opt) => {
            const isPicked = picked === opt.id;
            const showResult = picked !== null;
            const correct = Boolean(opt.correct);
            return (
              <motion.button
                key={opt.id}
                type="button"
                disabled={picked !== null}
                onClick={() => handlePick(opt.id)}
                whileHover={picked === null && !prefersReducedMotion ? { scale: 1.015 } : undefined}
                whileFocus={picked === null && !prefersReducedMotion ? { scale: 1.02 } : undefined}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left text-sm tap-transparent transition-all duration-200',
                  !showResult &&
                    'border-border bg-muted/50 hover:border-primary/50 hover:bg-primary/[0.06] hover:shadow-md hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                  showResult && correct && 'border-green-400 bg-green-50 font-medium text-green-800',
                  showResult && isPicked && !correct && 'border-red-300 bg-red-50 font-medium text-red-800',
                  showResult && !isPicked && !correct && 'opacity-50'
                )}
              >
                {opt.id}) {opt.text}
                {showResult && correct && ' ✓'}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {picked && !isCorrect && (
            <motion.div
              key="tutor"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={springTransition}
              className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-800 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-400"
            >
              {TUTOR_WRONG}
            </motion.div>
          )}
          {picked && isCorrect && (
            <motion.div
              key="success-msg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
            >
              {TUTOR_CORRECT}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ShowcasePresionView({ metricClass }: { metricClass: string }) {
  const REACTIVO_SECONDS = 77;
  const [secondsLeft, setSecondsLeft] = useState(REACTIVO_SECONDS);
  const [mounted, setMounted] = useState(false);
  const [focusedOption, setFocusedOption] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : REACTIVO_SECONDS));
    }, 1000);
    return () => window.clearInterval(id);
  }, [mounted, prefersReducedMotion]);

  const displayTime = mounted ? formatTimer(secondsLeft) : '01:17';
  const urgent = mounted && secondsLeft <= 15;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Modo presión</p>
        <h3 className="mt-1 text-lg font-bold text-foreground">Entrena bajo estrés real</h3>
      </div>

      <motion.div
        className={cn(
          'font-sans text-7xl font-black tabular-nums tracking-tight md:text-8xl',
          urgent ? 'text-red-600 showcase-weak-blink' : 'text-foreground',
          metricClass
        )}
        animate={urgent && !prefersReducedMotion ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={{ repeat: urgent ? Infinity : 0, duration: 0.8 }}
      >
        {displayTime}
      </motion.div>

      <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
        En el examen real tienes solo{' '}
        <strong className={cn('text-foreground', metricClass)}>77 segundos</strong> por reactivo. Entrena tu
        cerebro bajo estrés.
      </p>

      <div className="w-full max-w-sm space-y-2">
        <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Reactivo bajo presión</p>
        {EXAM_OPTIONS.map((opt) => {
          const isFocused = focusedOption === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onMouseEnter={() => setFocusedOption(opt.id)}
              onMouseLeave={() => setFocusedOption(null)}
              onFocus={() => setFocusedOption(opt.id)}
              onBlur={() => setFocusedOption(null)}
              whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
              className={cn(
                'w-full rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-all duration-200',
                'border-border/70 bg-muted/40 hover:border-primary/50 hover:bg-primary/[0.06]',
                isFocused &&
                  'scale-[1.02] border-primary/60 bg-primary/[0.08] shadow-lg shadow-primary/20 ring-2 ring-primary/30'
              )}
            >
              {opt.id}) {opt.text}
            </motion.button>
          );
        })}
      </div>

      <div className="w-full max-w-sm">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className={cn('h-full rounded-full', urgent ? 'bg-red-500' : 'bg-primary')}
            style={{ width: `${(secondsLeft / REACTIVO_SECONDS) * 100}%` }}
            layout
            transition={springTransition}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Tiempo restante por reactivo</p>
      </div>
    </div>
  );
}

function ShowcaseComunidadView({
  universidad,
  metricClass,
  cardClass,
}: {
  universidad: UniversidadFilter;
  metricClass: string;
  cardClass: string;
}) {
  const careerLabel = CAREER_BY_UNI[universidad];

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">La tribu</p>
          <h3 className="text-lg font-bold text-foreground">Ranking en tiempo real</h3>
        </div>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
          {careerLabel}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        Compite por aciertos con aspirantes de tu misma carrera meta. Cada simulacro suma al ranking semanal.
      </p>

      <div className={cn('overflow-hidden', cardClass)}>
        <div className="grid grid-cols-[2rem_1fr_3rem] gap-2 bg-primary/[0.06] px-3 py-2 text-[10px] font-bold uppercase text-primary">
          <span>#</span>
          <span>Aspirante</span>
          <span className="text-right">Aciertos</span>
        </div>
        {LEADERBOARD.map((row) => (
          <motion.div
            key={row.rank}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springTransition, delay: row.rank * 0.05 }}
            className={cn(
              'grid grid-cols-[2rem_1fr_3rem] items-center gap-2 border-t border-border px-3 py-2.5',
              row.isUser && 'bg-primary/10'
            )}
          >
            <span className="text-xs font-bold text-muted-foreground">{row.rank}</span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white',
                  row.avatar
                )}
              >
                {row.initials}
              </span>
              <span className={cn('text-sm text-foreground', row.isUser && 'font-bold')}>
                {row.name}
                {row.isUser && (
                  <span className="ml-1.5 text-[10px] font-semibold uppercase text-primary">Tú</span>
                )}
              </span>
            </div>
            <span className={cn('text-right text-sm font-bold text-primary', metricClass)}>{row.score}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface ProductShowcaseProps {
  universidad: UniversidadFilter;
  variant?: 'default' | 'viewport';
}

export function ProductShowcase({ universidad, variant = 'default' }: ProductShowcaseProps) {
  const [activeDemoTab, setActiveDemoTab] = useState<DemoTab>('simulacros');
  const prefersReducedMotion = useReducedMotion();
  const { uniId, hydrated } = useUniTheme();

  const effectiveUniId = useMemo(() => {
    if (universidad !== 'todas') return filterToUniId(universidad);
    return uniId;
  }, [universidad, uniId]);

  const visual = useMemo(() => getUniVisualIdentity(effectiveUniId), [effectiveUniId]);
  const landingAccent = useMemo(() => getLandingAccent(effectiveUniId), [effectiveUniId]);
  const isUam = effectiveUniId === 'uam';

  const transition = prefersReducedMotion ? { duration: 0 } : springTransition;
  const isViewport = variant === 'viewport';
  const isPresion = activeDemoTab === 'presion';

  return (
    <section
      id="showcase"
      className={cn('scroll-mt-24 font-sans', isViewport ? 'mx-auto w-full max-w-5xl px-4 py-6' : 'py-10 md:py-14')}
      aria-label="Tour interactivo del producto"
    >
      <motion.div
        className="mb-5 text-center"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springTransition}
      >
        <span
          className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={
            hydrated
              ? { borderColor: `${landingAccent.primary}40`, color: landingAccent.primary, backgroundColor: `${landingAccent.primary}10` }
              : undefined
          }
        >
          Interés · Prueba el producto
        </span>
        <h2 className={cn('mt-3', landingSectionTitle)}>Siente la presión del examen real</h2>
        <p className={cn('mx-auto mt-3 max-w-2xl', landingBody)}>
          Cuatro modos demo: responde un reactivo, entrena el cronómetro, compite con tu tribu y mira tu diagnóstico.
        </p>
      </motion.div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-lg">
      <nav
        className="mb-0 flex overflow-x-auto border-b border-zinc-200 bg-zinc-50"
        aria-label="Módulos del producto"
      >
        {DEMO_TABS.map(({ id, label }) => {
          const active = activeDemoTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveDemoTab(id)}
              className={cn(
                'tap-transparent min-w-[120px] flex-1 border-b-2 px-2 py-4 text-center text-xs font-bold transition-all',
                active
                  ? 'border-zinc-900 bg-white text-zinc-900'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900'
              )}
              aria-pressed={active}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <motion.div
        className={cn(
          'showcase-carrosserie relative z-10 w-full overflow-hidden rounded-b-2xl border border-t-0 border-zinc-200 font-sans shadow-xl',
          isViewport
            ? 'min-h-[300px] bg-white p-6'
            : 'aspect-[16/10] p-4 md:aspect-[16/9] md:p-6',
          visual.skinClass,
          !isViewport && visual.shellClass,
          visual.showcaseClass,
          visual.neonClass,
          isUam && 'text-zinc-100'
        )}
        data-showcase-uni={effectiveUniId}
        animate={
          isPresion && !prefersReducedMotion ? { scale: 1.01 } : { scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          aria-hidden
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeDemoTab}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full min-h-0 overflow-hidden text-foreground"
          >
            {activeDemoTab === 'simulacros' && (
              <ShowcaseSimulacrosView
                accentHex={visual.primaryHex}
                examShellClass={visual.examShellClass}
                neonClass={visual.neonClass}
              />
            )}
            {activeDemoTab === 'presion' && <ShowcasePresionView metricClass={visual.metricClass} />}
            {activeDemoTab === 'comunidad' && (
              <ShowcaseComunidadView
                universidad={universidad}
                metricClass={visual.metricClass}
                cardClass={visual.cardClass}
              />
            )}
            {activeDemoTab === 'dashboard' && (
              <ShowcaseDiagnosticChart metricClass={visual.metricClass} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      </div>
    </section>
  );
}
