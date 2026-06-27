'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CyberCard } from '@/components/ui/cyber-card';
import { FALLACIES } from '@/data/study-tools/fallacies';
import { cn } from '@/lib/utils';

export function FallaciesDictionary() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(FALLACIES[0]?.id ?? null);

  const filtered = FALLACIES.filter(
    (f) =>
      !query.trim() ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.latin.toLowerCase().includes(query.toLowerCase()) ||
      f.mexicanExample.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar falacia…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 rounded-xl pl-10"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((f) => {
          const open = expanded === f.id;
          return (
            <CyberCard key={f.id} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setExpanded(open ? null : f.id)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span className="text-2xl" aria-hidden>
                  {f.emoji}
                </span>
                <div className="flex-1">
                  <p className="font-bold">{f.name}</p>
                  <p className="text-xs italic text-muted-foreground">{f.latin}</p>
                </div>
                <span className="text-muted-foreground">{open ? '−' : '+'}</span>
              </button>

              {open ? (
                <div className="space-y-3 border-t px-4 pb-4 pt-2 text-sm">
                  <p>{f.definition}</p>
                  <blockquote
                    className={cn(
                      'rounded-xl border-l-4 border-amber-400 bg-amber-50/80 px-4 py-3 text-sm italic dark:bg-amber-950/20'
                    )}
                  >
                    🇲🇽 {f.mexicanExample}
                  </blockquote>
                  <p className="rounded-lg bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
                    Tip de examen: {f.examTip}
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
