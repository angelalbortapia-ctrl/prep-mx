'use client';

import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanScopeToggle } from '@/components/marketing/PlanScopeToggle';
import { StripeCheckoutButton } from '@/components/marketing/StripeCheckoutButton';
import { MONETIZATION_PLANS, type MonetizationPlan } from '@/data/pricing';
import { buildJourneyHref } from '@/lib/journey-links';
import { useUniTheme } from '@/hooks/useUniTheme';
import { filterToUniId } from '@/lib/uni-theme-config';
import { getUniVisualIdentity } from '@/lib/uni-visual-identity';
import type { PlanScope, UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

interface PlanOfferCardsProps {
  universidad: UniversidadFilter;
  plan: PlanScope;
  basePath?: string;
  variant?: 'default' | 'dark';
}

function highlightedShellClass(uniId: ReturnType<typeof filterToUniId>): string {
  if (uniId === 'unam') {
    return 'border-[#D4AF37]/50 bg-[#002B49] text-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.25)]';
  }
  if (uniId === 'ipn') {
    return 'border-[#6A1B29]/40 bg-card text-[#6A1B29] shadow-[0_0_32px_rgba(106,27,41,0.35)] ring-2 ring-[#6A1B29]/20 dark:text-rose-300';
  }
  if (uniId === 'uam') {
    return 'border-zinc-700 bg-[#111111] text-[#F05454] shadow-[0_0_0_1px_rgba(240,84,84,0.4)]';
  }
  return 'border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/25 ring-2 ring-primary/30';
}

function planCtaHref(
  item: MonetizationPlan,
  universidad: UniversidadFilter,
  plan: PlanScope,
  basePath?: string
): string {
  if (item.id === 'express') {
    return buildJourneyHref('/simulador-gratis', {
      uni: universidad,
      plan,
      extra: { freemium: 'diagnostico' },
    });
  }
  if (item.id === 'todos') {
    return buildJourneyHref('/sign-up', { uni: 'todas', plan: 'todo' });
  }
  const uni = universidad === 'todas' ? 'unam' : universidad;
  return buildJourneyHref('/sign-up', { uni, plan: 'universidad' });
}

export function PlanOfferCards({ universidad, plan, basePath, variant = 'default' }: PlanOfferCardsProps) {
  const prefersReducedMotion = useReducedMotion();
  const { uniId } = useUniTheme();
  const effectiveUniId = universidad !== 'todas' ? filterToUniId(universidad) : uniId;
  const visual = getUniVisualIdentity(effectiveUniId);
  const highlightClass = highlightedShellClass(effectiveUniId);
  const isDark = variant === 'dark';

  return (
    <div className="scroll-mt-24 space-y-10 overflow-x-clip md:space-y-12">
      <PlanScopeToggle value={plan} basePath={basePath} />

      <div className="mx-auto grid min-w-0 w-full grid-cols-1 gap-6 md:grid-cols-3">
        {MONETIZATION_PLANS.map((item) => {
          const highlighted = Boolean(item.highlighted);
          const isProSelected = item.id === 'pro' && plan === 'universidad';
          const isTodosSelected = item.id === 'todos' && plan === 'todo';

          const cardInner = (
            <Card
              className={cn(
                'relative flex h-full flex-col overflow-hidden transition-all duration-300',
                highlighted
                  ? cn(highlightClass)
                  : cn(
                      isDark
                        ? 'border-zinc-800 bg-zinc-900/60 text-zinc-100'
                        : 'border-border bg-card',
                      (isProSelected || isTodosSelected) && 'ring-2 ring-primary/25'
                    )
              )}
            >
              {highlighted && (
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80"
                  aria-hidden
                />
              )}
              <CardHeader>
                {item.badge && (
                  <Badge
                    variant={highlighted ? 'secondary' : 'outline'}
                    className={cn(
                      'mb-2 w-fit',
                      highlighted && effectiveUniId === 'unam' && 'border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#D4AF37]',
                      highlighted && effectiveUniId === 'ipn' && 'border-[#6A1B29]/30 bg-[#6A1B29]/10 text-[#6A1B29]',
                      highlighted && effectiveUniId === 'uam' && 'border-[#F05454]/40 bg-[#F05454]/15 text-[#F05454]',
                      highlighted && effectiveUniId === 'todos' && 'bg-primary-foreground/15 text-primary-foreground'
                    )}
                  >
                    {highlighted && <Sparkles className="mr-1 inline h-3 w-3" aria-hidden />}
                    {item.badge}
                  </Badge>
                )}
                <CardTitle className={cn('text-lg sm:text-xl', highlighted && 'text-inherit')}>{item.name}</CardTitle>
                <CardDescription className={cn(highlighted && 'text-inherit/80')}>
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className={cn('text-2xl font-bold sm:text-3xl', highlighted && 'text-inherit')}>
                  {item.priceLabel}
                  {item.price > 0 && (
                    <span className={cn('mt-1 block text-sm font-normal', highlighted ? 'opacity-80' : 'text-muted-foreground')}>
                      {item.period}
                    </span>
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn(
                          'mt-0.5 h-4 w-4 shrink-0',
                          highlighted ? 'text-inherit' : 'text-primary'
                        )}
                        aria-hidden
                      />
                      <span className={highlighted ? 'text-inherit/95' : undefined}>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {item.id === 'express' ? (
                  <Button asChild variant="outline" size="cta" className="w-full">
                    <Link href={planCtaHref(item, universidad, plan, basePath)}>{item.ctaLabel}</Link>
                  </Button>
                ) : (
                  <StripeCheckoutButton
                    planId={item.id}
                    universidad={universidad}
                    label={item.ctaLabel}
                    variant={item.id === 'pro' ? 'conversion' : 'outline'}
                    className="w-full"
                  />
                )}
              </CardFooter>
            </Card>
          );

          if (!highlighted) {
            return <div key={item.id}>{cardInner}</div>;
          }

          return (
            <div
              key={item.id}
              className={cn(
                'relative h-full md:z-10',
                !prefersReducedMotion && 'md:scale-110'
              )}
            >
              {cardInner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
