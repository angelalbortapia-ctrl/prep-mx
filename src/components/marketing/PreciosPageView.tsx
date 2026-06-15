'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UniversityBanner } from '@/components/marketing/UniversityBanner';
import { PageHeader } from '@/components/layout/PageHeader';
import { PlanOfferCards } from '@/components/marketing/PlanOfferCards';
import { buildJourneyHref } from '@/lib/journey-links';
import type { PlanScope, UniversidadFilter } from '@/lib/university-theme';

interface PreciosPageViewProps {
  universidad: UniversidadFilter;
  plan: PlanScope;
}

export function PreciosPageView({ universidad, plan }: PreciosPageViewProps) {
  return (
    <section className="space-y-10">
      <UniversityBanner value={universidad} plan={plan} basePath="/precios" compact />

      <PageHeader
        title="Planes PrepMX"
        description="Empieza gratis con el Express. Escala al Pro o al Pase Completo cuando estés listo — OXXO, SPEI o tarjeta."
        className="mx-auto max-w-2xl text-center [&_h1]:mx-auto [&_p]:mx-auto"
      />

      <PlanOfferCards universidad={universidad} plan={plan} basePath="/precios" />

      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-primary/[0.04] p-6 text-center">
        <p className="text-sm font-semibold text-foreground">¿Aún no sabes tu nivel?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          El Plan Express te da diagnóstico + 3 créditos sin tarjeta.
        </p>
        <Button asChild variant="outline" className="mt-4 h-11 rounded-xl">
          <Link
            href={buildJourneyHref('/simulador-gratis', {
              uni: universidad,
              plan,
              extra: { freemium: 'diagnostico' },
            })}
          >
            Probar diagnóstico gratis
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
