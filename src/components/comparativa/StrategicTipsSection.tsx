'use client';

import { Lightbulb } from 'lucide-react';
import { STRATEGY_TIPS, UNI_COLORS } from '@/data/university-comparison';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

const TONE_STYLES = {
  amber: 'border-amber-500/30 bg-amber-500/5',
  red: 'border-red-500/30 bg-red-500/5',
  teal: 'border-teal-500/30 bg-teal-500/5',
} as const;

interface StrategicTipsSectionProps {
  className?: string;
  dark?: boolean;
  highlightUni?: Universidad;
}

export function StrategicTipsSection({
  className,
  dark = false,
  highlightUni,
}: StrategicTipsSectionProps) {
  const unis: Universidad[] = ['unam', 'ipn', 'uam'];

  return (
    <section className={className}>
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500" aria-hidden />
        <h2 className={cn('text-lg font-bold', dark ? 'text-zinc-50' : 'text-foreground')}>
          Consejos estratégicos por universidad
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {unis.map((uni) => {
          const block = STRATEGY_TIPS[uni];
          const highlighted = highlightUni === uni;
          return (
            <article
              key={uni}
              className={cn(
                'rounded-2xl border p-5 transition-shadow',
                TONE_STYLES[block.tone],
                highlighted && 'ring-2 ring-offset-2',
                dark ? 'border-zinc-800 bg-zinc-950' : 'bg-card',
                highlighted &&
                  (dark ? 'ring-primary/40 ring-offset-zinc-950' : 'ring-primary/30 ring-offset-background')
              )}
              style={highlighted ? { borderColor: UNI_COLORS[uni] } : undefined}
            >
              <h3 className="mb-2 text-sm font-bold" style={{ color: UNI_COLORS[uni] }}>
                {universidadLabels[uni]}
              </h3>
              <p className="mb-2 text-xs font-semibold">{block.title}</p>
              <p
                className={cn(
                  'text-xs leading-relaxed',
                  dark ? 'text-zinc-400' : 'text-muted-foreground'
                )}
              >
                {block.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
