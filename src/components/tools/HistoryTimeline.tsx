'use client';

import { useState } from 'react';
import { Globe, MapPin } from 'lucide-react';
import { CyberCard } from '@/components/ui/cyber-card';
import { HISTORY_TIMELINE } from '@/data/study-tools/history-timeline';
import { cn } from '@/lib/utils';

export function HistoryTimeline() {
  const [activeYear, setActiveYear] = useState<number | null>(HISTORY_TIMELINE[0]?.year ?? null);

  const active = HISTORY_TIMELINE.find((e) => e.year === activeYear);

  return (
    <div className="space-y-6">
      <div className="relative overflow-x-auto pb-2">
        <div className="flex min-w-max gap-1 border-b border-border px-1">
          {HISTORY_TIMELINE.map((event) => (
            <button
              key={event.year}
              type="button"
              onClick={() => setActiveYear(event.year)}
              className={cn(
                'shrink-0 border-b-2 px-3 py-2 text-sm font-bold transition-colors',
                activeYear === event.year
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {event.year}
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div className="grid gap-4 md:grid-cols-2">
          <CyberCard className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
              <MapPin className="h-4 w-4" aria-hidden />
              México
            </div>
            <p className="leading-relaxed">{active.mexico}</p>
          </CyberCard>

          <CyberCard className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-sky-600">
              <Globe className="h-4 w-4" aria-hidden />
              Mundo
            </div>
            <p className="leading-relaxed">{active.world}</p>
          </CyberCard>
        </div>
      ) : null}

      {active?.connection ? (
        <CyberCard className="border-primary/20 bg-primary/5 p-4 text-sm">
          <p className="font-semibold text-primary">Conexión UNAM</p>
          <p className="mt-1 text-muted-foreground">{active.connection}</p>
        </CyberCard>
      ) : null}

      <ul className="space-y-2">
        {HISTORY_TIMELINE.map((event) => (
          <li
            key={event.year}
            className={cn(
              'grid gap-2 rounded-xl border p-3 text-sm md:grid-cols-[72px_1fr_1fr]',
              activeYear === event.year && 'border-primary/40 bg-primary/5'
            )}
          >
            <span className="font-black text-primary">{event.year}</span>
            <span>{event.mexico}</span>
            <span className="text-muted-foreground">{event.world}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
