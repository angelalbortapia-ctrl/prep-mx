'use client';

import { useMemo, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LandingContainer } from '@/components/marketing/LandingContainer';
import { LandingHeroVisual } from '@/components/marketing/LandingHeroVisual';
import { LandingMateriasSemaforo } from '@/components/marketing/LandingMateriasSemaforo';
import { UniversityLogosStrip } from '@/components/marketing/UniversityLogosStrip';
import { LandingBentoGrid } from '@/components/marketing/LandingBentoGrid';
import { ProductShowcase } from '@/components/marketing/ProductShowcase';
import { OfficialQuestionBankSection } from '@/components/marketing/OfficialQuestionBankSection';
import { Sm2InteractiveTimeline } from '@/components/marketing/Sm2InteractiveTimeline';
import dynamic from 'next/dynamic';
import { ExamAdmissionCountdownWidget } from '@/components/marketing/ExamAdmissionCountdownWidget';
import { PlanOfferCards } from '@/components/marketing/PlanOfferCards';
import { UniversityBanner } from '@/components/marketing/UniversityBanner';
import {
  UNIVERSIDAD_LANDING_CONFIG,
  resolveLandingUniId,
} from '@/data/universidad-landing-config';
import { filterToUniId } from '@/lib/uni-theme-config';
import { buildJourneyHref } from '@/lib/journey-links';
import { LANDING_SIMULATOR_CTA } from '@/lib/landing-cta';
import { statusBadgeLive, statusDotLive } from '@/lib/landing-cyber-styles';
import {
  landingBadge,
  landingBody,
  landingHeroSection,
  landingHeroTitle,
  landingSection,
  landingSectionHeader,
  landingSectionLead,
  landingSectionMuted,
  landingSectionTitle,
} from '@/lib/landing-typography';
import type { LandingTemarioBlock } from '@/lib/temario/landing-display';
import type { PlanScope, UniversidadFilter } from '@/lib/university-theme';
import { useUniTheme } from '@/hooks/useUniTheme';
import { cn } from '@/lib/utils';

const AspirantChecklistTool = dynamic(
  () =>
    import('@/components/marketing/AspirantChecklistTool').then((m) => m.AspirantChecklistTool),
  { ssr: false }
);

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
  temarioCatalog: LandingTemarioBlock[];
}

export function LandingPageView({ universidad, plan, temarioCatalog }: LandingPageViewProps) {
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

  const badgeClass = cn(landingBadge, 'border-border bg-muted text-muted-foreground');

  return (
    <div className="relative min-w-0 overflow-x-clip pb-20 font-sans text-foreground md:pb-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

      {/* 1. Hero zig-zag: copy | imagen del producto */}
      <section id="universidades" className={cn('relative', landingHeroSection)}>
        <LandingContainer>
          <div className="mb-6 md:mb-8">
            <UniversityBanner value={universidad} plan={plan} basePath="/" hidePills compact />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springTransition}
            >
              <span className={cn(statusBadgeLive, badgeClass, 'mb-6')}>
                <span className={statusDotLive} aria-hidden />
                Convocatorias 2026 · Reactivos reales
              </span>

              <ExamAdmissionCountdownWidget
                uniId={effectiveUniId}
                href={diagnosticHref}
                className="mb-6 w-full max-w-md lg:max-w-none"
              />

              <h1 className={landingHeroTitle}>
                No estudies más.{' '}
                <span style={themeHydrated ? { color: landingUni.primary } : undefined}>
                  Estudia mejor.
                </span>
                <span className="mt-2 block text-xl font-bold text-muted-foreground sm:text-2xl md:text-3xl">
                  El plan adaptado para la {landingUni.siglas}.
                </span>
              </h1>

              <p className={cn('mt-6 max-w-xl', landingBody)}>
                Olvídate de guías infinitas y videos aburridos de dos horas. Entrena bajo presión con
                simulacros calibrados y destruye tus puntos débiles antes de que te cuesten el lugar.
              </p>

              <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row lg:justify-start">
                <MotionTap className="w-full sm:w-auto">
                  <Button asChild variant="conversion" size="cta" className="w-full">
                    <Link href={diagnosticHref}>{LANDING_SIMULATOR_CTA}</Link>
                  </Button>
                </MotionTap>
                <MotionTap className="w-full sm:w-auto">
                  <Button asChild variant="outline" size="cta" className="w-full">
                    <Link href="#showcase">Ver demo en vivo</Link>
                  </Button>
                </MotionTap>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.08 }}
            >
              <LandingHeroVisual universidad={universidad} />
            </motion.div>
          </div>
        </LandingContainer>
      </section>

      {/* 2. Logos universidades */}
      <UniversityLogosStrip />

      {/* 3. Características — semáforo de materias (zig-zag) */}
      <LandingMateriasSemaforo />

      {/* 4. Precios */}
      <section id="planes" className={landingSectionMuted}>
        <LandingContainer>
          <motion.div
            className={landingSectionHeader}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springTransition}
          >
            <h2 className={landingSectionTitle}>Invierte en tu lugar, no en más libros</h2>
            <p className={landingSectionLead}>
              Elige el nivel de entrenamiento para tu postulación.
            </p>
          </motion.div>
          <PlanOfferCards universidad={universidad} plan={plan} basePath="/" />
        </LandingContainer>
      </section>

      {/* Contenido ampliado (post-conversión) */}
      <ProductShowcase universidad={universidad} variant="viewport" />

      <section id="sm2" className={landingSection}>
        <LandingContainer>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springTransition}
          >
            <Sm2InteractiveTimeline variant="landing" />
          </motion.div>
        </LandingContainer>
      </section>

      <section className={cn(landingSection, 'relative')}>
        <LandingContainer className="relative">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[min(100%,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={
              themeHydrated ? { backgroundColor: landingUni.accent, opacity: 0.08 } : undefined
            }
            aria-hidden
          />
          <motion.div
            className={cn('relative z-[1]', landingSectionHeader)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springTransition}
          >
            <h2 className={landingSectionTitle}>Estadísticas del concurso oficial</h2>
            <p className={landingSectionLead}>Métricas reales de convocatorias recientes.</p>
          </motion.div>
          <LandingBentoGrid universidad={universidad} className="relative z-[1]" />
        </LandingContainer>
      </section>

      <OfficialQuestionBankSection catalog={temarioCatalog} effectiveUniId={effectiveUniId} />

      <LandingContainer className="py-12 md:py-16">
        <AspirantChecklistTool variant="landing" />
      </LandingContainer>

      <div className="mobile-sticky-cta font-sans">
        <LandingContainer className="flex items-stretch gap-3">
          <MotionTap className="min-w-0 flex-1">
            <Button asChild variant="conversion" size="cta" className="w-full">
              <Link href={diagnosticHref}>{LANDING_SIMULATOR_CTA}</Link>
            </Button>
          </MotionTap>
          <MotionTap className="shrink-0">
            <Button asChild variant="outline" size="cta" className="min-w-[5.5rem]">
              <Link href="#planes">Planes</Link>
            </Button>
          </MotionTap>
        </LandingContainer>
      </div>
    </div>
  );
}
