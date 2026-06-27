'use client';

import { useMemo, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UniversityBanner } from '@/components/marketing/UniversityBanner';
import { LandingBentoGrid } from '@/components/marketing/LandingBentoGrid';
import { ProductShowcase } from '@/components/marketing/ProductShowcase';
import { PlanOfferCards } from '@/components/marketing/PlanOfferCards';
import {
  UNIVERSIDAD_LANDING_CONFIG,
  resolveLandingUniId,
} from '@/data/universidad-landing-config';
import { filterToUniId } from '@/lib/uni-theme-config';
import { buildJourneyHref } from '@/lib/journey-links';
import { statusBadgeLive, statusDotLive } from '@/lib/landing-cyber-styles';
import {
  landingBadge,
  landingBody,
  landingHeroTitle,
  landingSectionTitle,
} from '@/lib/landing-typography';
import type { PlanScope, UniversidadFilter } from '@/lib/university-theme';
import { useUniTheme } from '@/hooks/useUniTheme';
import { cn } from '@/lib/utils';

const springTransition = { type: 'spring' as const, stiffness: 280, damping: 26 };

interface MotionTapProps {
  children: ReactNode;
  className?: string;
}

function MotionTap({ children, className }: MotionTapProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}

interface LandingPageViewProps {
  universidad: UniversidadFilter;
  plan: PlanScope;
}

export function LandingPageView({ universidad, plan }: LandingPageViewProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { uniId, hydrated: themeHydrated } = useUniTheme();

  const effectiveUniId = useMemo(() => {
    if (universidad !== 'todas') return filterToUniId(universidad);
    return uniId;
  }, [universidad, uniId]);

  const landingUni = useMemo(
    () => UNIVERSIDAD_LANDING_CONFIG[resolveLandingUniId(effectiveUniId)],
    [effectiveUniId]
  );

  const diagnosticHref = buildJourneyHref('/simulador-gratis', {
    uni: universidad === 'todas' ? 'todas' : universidad,
    plan,
    extra: { freemium: 'diagnostico' },
  });

  const badgeClass = cn(
    landingBadge,
    'border-zinc-200 bg-zinc-50 text-zinc-700'
  );

  const ctaClass =
    effectiveUniId === 'unam'
      ? 'bg-[#002B49] text-[#D4AF37] hover:bg-[#001f36]'
      : effectiveUniId === 'ipn'
        ? 'bg-[#6A1B29] text-white hover:bg-[#52141f]'
        : effectiveUniId === 'uam'
          ? 'bg-[#F05454] text-white hover:bg-[#d94141]'
          : 'bg-primary text-primary-foreground';

  return (
    <div className="relative pb-20 font-sans text-zinc-900 md:pb-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

      <section className="relative mx-auto max-w-5xl px-4 pb-10 pt-6 md:pt-8">
        <UniversityBanner value={universidad} plan={plan} basePath="/" hidePills compact />

        <motion.div
          className="flex flex-col items-center py-8 text-center md:py-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
        >
          <span className={cn(statusBadgeLive, badgeClass, 'mb-5')}>
            <span className={statusDotLive} aria-hidden />
            Convocatorias 2026 · Reactivos reales
          </span>

          <h1 className={landingHeroTitle}>
            No estudies más.{' '}
            <span style={themeHydrated ? { color: landingUni.primary } : undefined}>Estudia mejor.</span>
            <br className="hidden sm:block" />
            <span className="mt-2 block text-2xl font-bold text-zinc-600 md:text-3xl">
              El plan adaptado para la {landingUni.siglas}.
            </span>
          </h1>

          <p className={cn('mt-5 max-w-2xl', landingBody)}>
            Olvídate de guías infinitas y videos aburridos de dos horas. Entrena bajo presión con simulacros calibrados
            y destruye tus puntos débiles antes de que te cuesten el lugar.
          </p>

          <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <MotionTap className="w-full sm:w-auto">
              <Button asChild size="lg" className={cn('h-12 w-full rounded-full px-6 text-sm font-bold shadow-md', ctaClass)}>
                <Link href={diagnosticHref}>Probar Diagnóstico Gratis</Link>
              </Button>
            </MotionTap>
            <MotionTap className="w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-full border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                <Link href="#showcase">Ver demo en vivo</Link>
              </Button>
            </MotionTap>
          </div>
        </motion.div>
      </section>

      <ProductShowcase universidad={universidad} variant="viewport" />

      <section className="relative mx-auto max-w-5xl px-4 py-12">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[min(100%,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={
            themeHydrated
              ? { backgroundColor: landingUni.accent, opacity: 0.08 }
              : undefined
          }
          aria-hidden
        />
        <motion.div
          className="relative z-[1] mb-8 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springTransition}
        >
          <h2 className={landingSectionTitle}>Estadísticas del concurso oficial</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
            Métricas reales de convocatorias recientes.
          </p>
        </motion.div>
        <LandingBentoGrid universidad={universidad} className="relative z-[1]" />
      </section>

      <section
        id="planes"
        className="border-y border-zinc-200 bg-zinc-50 px-4 py-16 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-10 text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springTransition}
          >
            <h2 className={landingSectionTitle}>Invierte en tu lugar, no en más libros</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
              Elige el nivel de entrenamiento para tu postulación.
            </p>
          </motion.div>
          <PlanOfferCards universidad={universidad} plan={plan} basePath="/" />
        </div>
      </section>

      <div className="mobile-sticky-cta border-t border-zinc-200 bg-white/95 font-sans backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4">
          <MotionTap className="flex-1">
            <Button asChild className={cn('h-11 w-full font-bold shadow-lg', ctaClass)}>
              <Link href={diagnosticHref}>Diagnóstico gratis</Link>
            </Button>
          </MotionTap>
          <MotionTap>
            <Button asChild variant="outline" className="h-11 px-4 font-semibold">
              <Link href="#planes">Planes</Link>
            </Button>
          </MotionTap>
        </div>
      </div>
    </div>
  );
}
