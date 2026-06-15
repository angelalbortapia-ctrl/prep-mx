'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROWS = [
  { feature: 'Simulacros con línea de corte real', prep: true, trad: false },
  { feature: 'Audio-guías con IA', prep: true, trad: false },
  { feature: 'Offline con TanStack Query', prep: true, trad: false },
  { feature: 'Hápticos en móvil (Capacitor)', prep: true, trad: false },
  { feature: 'Métrica de integridad en examen', prep: true, trad: false },
  { feature: 'Libros físicos / PDFs estáticos', prep: false, trad: true },
];

export function ComparativaTabs({ className }: { className?: string }) {
  const [tab, setTab] = useState<'prep' | 'trad'>('prep');

  return (
    <section className={cn('rounded-3xl border bg-card p-6 md:p-8', className)}>
      <h2 className="mb-4 text-2xl font-bold">PrepMX vs métodos tradicionales</h2>
      <div className="mb-6 inline-flex rounded-xl border bg-muted/40 p-1">
        {(['prep', 'trad'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-semibold transition-all active:scale-95',
              tab === id ? 'bg-card shadow-sm' : 'text-muted-foreground'
            )}
          >
            {id === 'prep' ? 'PrepMX' : 'Tradicional'}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {ROWS.map((row) => {
          const active = tab === 'prep' ? row.prep : row.trad;
          return (
            <li key={row.feature} className="flex items-center gap-3 text-sm">
              {active ? (
                <Check className="h-4 w-4 shrink-0 text-green-600" aria-hidden />
              ) : (
                <X className="h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden />
              )}
              <span className={active ? 'font-medium' : 'text-muted-foreground'}>{row.feature}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
