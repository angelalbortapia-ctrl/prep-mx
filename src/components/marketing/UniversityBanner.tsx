'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { filterToUniId } from '@/lib/uni-theme-config';
import { cn } from '@/lib/utils';
import {
  getUniversityTheme,
  universidadFilterOptions,
  type PlanScope,
  type UniversidadFilter,
} from '@/lib/university-theme';

interface UniversityBannerProps {
  value: UniversidadFilter;
  plan?: PlanScope;
  basePath?: string;
  compact?: boolean;
  /** Oculta pills cuando el selector vive en el header (landing). */
  hidePills?: boolean;
}

export function UniversityBanner({
  value,
  plan = 'universidad',
  basePath = '/simulador-gratis',
  compact = false,
  hidePills = false,
}: UniversityBannerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const { setUniId, filterId: contextFilter, hydrated } = useUniTheme();

  const activeUni = plan === 'todo' || value === 'todas' ? 'todas' : value;
  const displayUni = hydrated && contextFilter ? contextFilter : activeUni;
  const theme = getUniversityTheme(displayUni);

  function select(universidad: UniversidadFilter) {
    if (universidad === value && plan === (universidad === 'todas' ? 'todo' : 'universidad')) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (universidad === 'todas') {
      params.set('uni', 'todas');
      params.set('plan', 'todo');
    } else {
      params.set('uni', universidad);
      params.set('plan', 'universidad');
    }

    setUniId(filterToUniId(universidad), { syncUrl: false });
    router.push(`${basePath}?${params.toString()}`, { scroll: false });
  }

  return (
    <motion.section
      key={displayUni}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 shadow-xl',
        theme.banner,
        compact ? 'shadow-lg' : 'shadow-2xl'
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className={cn('absolute inset-x-0 top-0 h-1', theme.accentBar)} aria-hidden />

      <div className={cn('relative z-10', compact ? 'p-5 md:p-6' : 'p-6 md:p-8')}>
        {!hidePills && (
          <div className="mb-5 flex flex-wrap gap-2">
            {universidadFilterOptions.map((option) => {
              const isActive = option.id === activeUni;
              const optTheme = getUniversityTheme(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => select(option.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'inline-flex min-h-9 items-center rounded-full px-4 py-1.5 text-sm font-semibold transition-all',
                    isActive ? optTheme.tabActive : optTheme.tabIdle
                  )}
                >
                  {option.shortLabel}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-white/70">
              <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-xs font-medium uppercase tracking-widest">{theme.tagline}</span>
            </div>
            <h2
              className={cn(
                'font-bold tracking-tight text-white text-balance',
                compact ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'
              )}
            >
              {activeUni === 'todas' ? 'Las 3 universidades' : `Prepárate para ${theme.name}`}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/85 md:text-base">{theme.description}</p>
          </div>

          {!compact && (
            <div className="rounded-xl border border-white/15 bg-black/20 p-4 backdrop-blur-sm md:min-w-[200px]">
              <div className="mb-2 flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 opacity-90" aria-hidden />
                <span className="text-sm font-semibold">
                  {activeUni === 'todas' ? 'Todo en uno' : 'Incluye'}
                </span>
              </div>
              <ul className="space-y-1 text-sm text-white/80">
                <li>Diagnóstico gratuito</li>
                <li>Simulacros calibrados</li>
                <li>Retroalimentación al instante</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
