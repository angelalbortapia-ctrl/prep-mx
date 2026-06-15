import type { PlanScope, UniversidadFilter } from '@/lib/university-theme';

interface JourneyLinkOptions {
  uni?: UniversidadFilter;
  plan?: PlanScope;
  extra?: Record<string, string>;
}

/** URLs de marketing con uni/plan coherentes entre landing, simulador y precios. */
export function buildJourneyHref(path: string, opts?: JourneyLinkOptions): string {
  const params = new URLSearchParams();
  if (opts?.uni) {
    params.set('uni', opts.uni);
  }
  if (opts?.plan) {
    params.set('plan', opts.plan);
  }
  if (opts?.extra) {
    for (const [key, value] of Object.entries(opts.extra)) {
      params.set(key, value);
    }
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

export function marketingJourneyContext(
  uni: UniversidadFilter,
  plan: PlanScope
): { uni: UniversidadFilter; plan: PlanScope } {
  if (plan === 'todo' || uni === 'todas') {
    return { uni: 'todas', plan: 'todo' };
  }
  return { uni, plan: 'universidad' };
}
