'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getUniversityTheme,
  landingUniversidadOptions,
  universidadFilterOptions,
  type LandingUniversidad,
  type UniversidadFilter,
} from '@/lib/university-theme';

interface UniversityBannerProps {
  value: LandingUniversidad | UniversidadFilter;
  basePath?: string;
  showMixto?: boolean;
  compact?: boolean;
}

export function UniversityBanner({
  value,
  basePath = '/simulador-gratis',
  showMixto = true,
  compact = false,
}: UniversityBannerProps) {
  const router = useRouter();
  const theme = getUniversityTheme(value);

  const options = showMixto
    ? universidadFilterOptions
    : landingUniversidadOptions.map((t) => ({
        id: t.id,
        shortLabel: t.shortLabel,
      }));

  function select(universidad: string) {
    if (universidad === value) return;
    router.push(`${basePath}?uni=${universidad}`, { scroll: false });
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl transition-all duration-500',
        theme.banner,
        compact ? 'shadow-lg' : 'shadow-primary/20'
      )}
    >
      {/* Decoración */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-black/10 blur-3xl"
        aria-hidden
      />
      <div
        className={cn('absolute left-0 top-0 h-1 w-full', theme.accentBar)}
        aria-hidden
      />

      <div className={cn('relative z-10', compact ? 'p-5 md:p-6' : 'p-6 md:p-8 lg:p-10')}>
        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {options.map((option) => {
            const isActive = option.id === value;
            const optTheme = getUniversityTheme(option.id as UniversidadFilter);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => select(option.id)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex min-h-10 items-center rounded-full px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300',
                  isActive ? optTheme.tabActive : optTheme.tabIdle
                )}
              >
                {option.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Contenido del banner */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-white/70">
              <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                {theme.tagline}
              </span>
            </div>
            <h2
              className={cn(
                'font-extrabold tracking-tight text-white',
                compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'
              )}
            >
              Prepárate para {theme.name}
            </h2>
            <p className="text-base leading-relaxed text-white/85 md:text-lg">
              {theme.description}
            </p>
          </div>

          {!compact && (
            <div className="flex shrink-0 flex-col gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md md:min-w-[200px]">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-white/90" aria-hidden />
                <span className="text-sm font-semibold">Incluye</span>
              </div>
              <ul className="space-y-1.5 text-sm text-white/80">
                <li>· 20 preguntas aleatorias</li>
                <li>· Opciones mezcladas</li>
                <li>· Feedback al instante</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
