'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, GraduationCap, Lock } from 'lucide-react';
import { PaywallSheet } from '@/components/paywall/PaywallSheet';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { UNI_IDS, getUniThemeEntry, type UniId } from '@/lib/uni-theme-config';
import { cn } from '@/lib/utils';

const CARD_LAYOUT = {
  unam: 'md:col-span-2 md:row-span-2',
  ipn: 'md:col-span-1',
  uam: 'md:col-span-1 md:row-start-2',
  todos: 'md:col-span-2 md:row-start-3',
} as const satisfies Record<UniId, string>;

interface LandingWelcomeSelectorProps {
  navigateToDashboard?: boolean;
  className?: string;
  /** Modo embebido dentro del Product Showcase (sin overlay fullscreen). */
  embedded?: boolean;
}

export function LandingWelcomeSelector({
  navigateToDashboard = false,
  className,
  embedded = false,
}: LandingWelcomeSelectorProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { uniId, setUniId } = useUniTheme();
  const { hasAccess, canFreeDiagnostic, hydrated: subsReady } = useSubscription();
  const [expanding, setExpanding] = useState<UniId | null>(null);
  const [paywallUni, setPaywallUni] = useState<UniId | null>(null);

  function navigateAfterSelect(id: UniId) {
    const delay = prefersReducedMotion ? 80 : embedded ? 320 : 650;
    window.setTimeout(() => {
      if (navigateToDashboard) {
        router.push('/dashboard');
      } else {
        setExpanding(null);
      }
    }, delay);
  }

  function handleSelect(id: UniId) {
    if (expanding) return;

    const locked = subsReady && !hasAccess(id);

    if (locked) {
      setPaywallUni(id);
      return;
    }

    setExpanding(id);
    setUniId(id, { syncUrl: !navigateToDashboard });
    navigateAfterSelect(id);
  }

  function startFreeDiagnostic(id: UniId) {
    setUniId(id, { syncUrl: true });
    router.push(`/simulador-gratis?uni=${id === 'todos' ? 'todas' : id}&freemium=diagnostico`);
  }

  return (
    <>
      <section className={cn('relative', className)} aria-label="Elige tu universidad">
        {!embedded && (
          <div className="mb-6 space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden />
              Bienvenida personalizada
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              ¿Para qué universidad te preparas?
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Elige tu destino — adaptamos colores, puntaje de corte y simulacros a tu examen.
            </p>
          </div>
        )}

        <div
          className={cn(
            'grid auto-rows-[minmax(120px,auto)] grid-cols-1 gap-3 md:grid-cols-3 md:gap-4',
            embedded && 'auto-rows-[minmax(96px,auto)] gap-2 md:grid-cols-3 md:gap-3'
          )}
        >
          {(embedded ? UNI_IDS.filter((id) => id !== 'todos') : UNI_IDS).map((id, index) => {
            const config = getUniThemeEntry(id);
            const isSelected = uniId === id;
            const isExpanding = expanding === id;
            const locked = subsReady && !hasAccess(id);

            return (
              <motion.button
                key={id}
                type="button"
                layoutId={`uni-card-${id}`}
                onClick={() => handleSelect(id)}
                disabled={Boolean(expanding)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={
                  isExpanding && !embedded
                    ? {
                        position: 'fixed',
                        inset: 0,
                        zIndex: 60,
                        borderRadius: 0,
                        opacity: 1,
                      }
                    : isExpanding && embedded
                      ? { scale: 1.02, opacity: 1 }
                      : { opacity: 1, y: 0 }
                }
                transition={{
                  layout: { duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.08 },
                  y: { duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.08 },
                }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border p-5 text-left shadow-lg transition-shadow tap-transparent gpu',
                  CARD_LAYOUT[id],
                  embedded && id === 'uam' && 'md:row-start-auto',
                  embedded && 'p-3 md:p-4',
                  isSelected && !locked
                    ? id === 'uam'
                      ? 'border-primary ring-2 ring-primary/50'
                      : 'border-accent ring-2 ring-accent/40'
                    : 'border-white/20',
                  !expanding && !locked && 'hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]'
                )}
                style={{
                  background:
                    id === 'uam'
                      ? 'linear-gradient(135deg, #111111 0%, #1a1a1a 55%, hsl(0 84% 64% / 0.45) 100%)'
                      : `linear-gradient(135deg, hsl(${config.colors.primaryHsl} / 0.95), hsl(${config.colors.primaryHsl} / 0.78))`,
                }}
                aria-pressed={isSelected}
                aria-disabled={locked}
              >
                {locked && (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 z-20 rounded-2xl bg-black/25 backdrop-blur-[2px]"
                      aria-hidden
                    />
                    <motion.div
                      className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
                      animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      aria-hidden
                    >
                      <Lock className="h-5 w-5 text-white" />
                    </motion.div>
                  </>
                )}

                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"
                  aria-hidden
                />
                <div className="relative z-10 flex h-full flex-col justify-between gap-3 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                      {config.slogan}
                    </p>
                    <p className={cn('mt-1 font-extrabold tracking-tight', embedded ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl')}>
                      {config.shortLabel}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-white/85">
                      {config.identityTemplate}
                    </p>
                    {locked && (
                      <p className="mt-2 text-xs font-semibold text-white/90">
                        Diagnóstico gratis de 10 preguntas disponible
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                      Corte ~{config.cutoffScore} pts
                    </span>
                    {!locked && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                        Elegir
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {expanding && !embedded && (
            <motion.div
              key="expanding-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              aria-hidden
            />
          )}
        </AnimatePresence>
      </section>

      {paywallUni && (
        <PaywallSheet
          open={Boolean(paywallUni)}
          onOpenChange={(open) => !open && setPaywallUni(null)}
          uniId={paywallUni}
          freeDiagnosticAvailable={canFreeDiagnostic(paywallUni)}
          onStartFreeDiagnostic={() => startFreeDiagnostic(paywallUni)}
        />
      )}
    </>
  );
}
