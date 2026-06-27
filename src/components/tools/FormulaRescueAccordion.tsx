'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Atom, FlaskConical } from 'lucide-react';
import { CyberCard } from '@/components/ui/cyber-card';
import { RESCUE_FORMULAS } from '@/data/study-tools/formulas';
import { cn } from '@/lib/utils';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), {
  ssr: false,
  loading: () => <span className="inline-block h-6 w-24 animate-pulse rounded bg-muted" />,
});

export function FormulaRescueAccordion() {
  const [category, setCategory] = useState<'all' | 'fisica' | 'quimica'>('all');
  const [openId, setOpenId] = useState<string | null>(RESCUE_FORMULAS[0]?.id ?? null);

  const items = RESCUE_FORMULAS.filter((f) => category === 'all' || f.category === category);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['all', 'Todas'],
            ['fisica', 'Física'],
            ['quimica', 'Química'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setCategory(id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold',
              category === id
                ? 'border-primary bg-primary/10 text-primary'
                : 'text-muted-foreground'
            )}
          >
            {id === 'fisica' ? <Atom className="h-3.5 w-3.5" /> : null}
            {id === 'quimica' ? <FlaskConical className="h-3.5 w-3.5" /> : null}
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {items.map((formula) => {
          const open = openId === formula.id;
          return (
            <CyberCard key={formula.id} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : formula.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {formula.category}
                  </p>
                  <p className="font-bold">{formula.name}</p>
                </div>
                <div className="text-lg font-serif">
                  <MathRenderer content={`$${formula.latex}$`} />
                </div>
              </button>

              {open ? (
                <div className="space-y-4 border-t px-4 pb-4 pt-3 text-sm">
                  <p className="text-muted-foreground">{formula.whenToUse}</p>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="py-1 pr-2">Letra</th>
                        <th className="py-1 pr-2">Significado</th>
                        <th className="py-1">Unidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formula.variables.map((v) => (
                        <tr key={v.symbol} className="border-b border-border/50">
                          <td className="py-2 font-mono font-bold">{v.symbol}</td>
                          <td className="py-2 pr-2">{v.meaning}</td>
                          <td className="py-2 text-muted-foreground">{v.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs dark:border-amber-900 dark:bg-amber-950/30">
                    <strong>Despeje trampa:</strong> {formula.trap}
                  </p>
                </div>
              ) : null}
            </CyberCard>
          );
        })}
      </div>
    </div>
  );
}
