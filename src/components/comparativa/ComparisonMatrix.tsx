'use client';

import { CheckCircle2 } from 'lucide-react';
import { COMPARISON_ROWS, UNI_COLORS } from '@/data/university-comparison';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

const UNIS: Universidad[] = ['unam', 'ipn', 'uam'];

interface ComparisonMatrixProps {
  className?: string;
  dark?: boolean;
}

export function ComparisonMatrix({ className, dark = false }: ComparisonMatrixProps) {
  return (
    <section className={className}>
      <h2 className={cn('mb-4 text-lg font-bold', dark ? 'text-zinc-50' : 'text-foreground')}>
        Matriz técnica de comparación
      </h2>
      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className={dark ? 'border-b border-zinc-800 bg-zinc-900/50' : 'border-b bg-muted/40'}>
              <th className="px-4 py-3 text-left font-semibold">Aspecto</th>
              {UNIS.map((uni) => (
                <th
                  key={uni}
                  className="px-4 py-3 text-left font-bold"
                  style={{ color: UNI_COLORS[uni] }}
                >
                  {universidadLabels[uni]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr
                key={row.label}
                className={cn(
                  'border-b last:border-0',
                  dark ? 'border-zinc-800' : 'border-border/60'
                )}
              >
                <td className={cn('px-4 py-3 font-medium', dark ? 'text-zinc-300' : '')}>
                  {row.label}
                </td>
                {UNIS.map((uni) => (
                  <td
                    key={uni}
                    className={cn(
                      'whitespace-pre-line px-4 py-3',
                      dark ? 'text-zinc-400' : 'text-muted-foreground'
                    )}
                  >
                    <span className="inline-flex items-start gap-1.5">
                      {'uamHighlight' in row && row.uamHighlight && uni === 'uam' ? (
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: UNI_COLORS.uam }}
                          aria-hidden
                        />
                      ) : null}
                      {row[uni]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
