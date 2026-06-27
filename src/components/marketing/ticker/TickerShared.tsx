'use client';

import { useMemo, type CSSProperties, type ReactNode } from 'react';
import type { TickerUniFilter } from '@/data/ticker/utils';
import { TICKER_UNI_FILTERS } from '@/data/ticker';
import type { TickerItem } from '@/data/ticker/types';
import { cn } from '@/lib/utils';

export function TickerShell({
  children,
  className,
  previewMode,
  hasMobileCta,
  paused,
  style,
}: {
  children: ReactNode;
  className?: string;
  previewMode?: boolean;
  hasMobileCta?: boolean;
  paused?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      className={cn(
        'university-ticker group',
        previewMode ? 'relative w-full' : 'fixed inset-x-0 z-[45]',
        !previewMode && (hasMobileCta ? 'bottom-[3.75rem] md:bottom-0' : 'bottom-0'),
        paused && 'is-paused',
        className
      )}
      style={style}
      aria-label="Radar de admisión universitaria"
    >
      {children}
    </section>
  );
}

export function TickerScrollTrack({
  items,
  durationSec,
  gap = 'gap-4',
  renderItem,
  className,
  emptyClassName = 'text-muted-foreground',
}: {
  items: TickerItem[];
  durationSec: number;
  gap?: string;
  renderItem: (item: TickerItem) => ReactNode;
  className?: string;
  emptyClassName?: string;
}) {
  const track = useMemo(
    () => (
      <>
        {items.map((item) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
        {items.map((item) => (
          <div key={`${item.id}-dup`}>{renderItem(item)}</div>
        ))}
      </>
    ),
    [items, renderItem]
  );

  if (items.length === 0) {
    return (
      <p className={cn('px-4 font-mono text-[10px]', emptyClassName)}>Sin señales para este filtro</p>
    );
  }

  return (
    <div className={cn('flex h-full items-center overflow-hidden', className)}>
      <div
        className={cn('university-ticker-track flex w-max items-center pl-3 pr-10', gap)}
        style={{ '--ticker-duration': `${durationSec}s` } as CSSProperties}
      >
        {track}
      </div>
    </div>
  );
}

export function TickerUniTabs({
  filter,
  onChange,
  dark,
}: {
  filter: TickerUniFilter;
  onChange: (id: TickerUniFilter) => void;
  dark?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5" role="tablist" aria-label="Filtrar universidad">
      {TICKER_UNI_FILTERS.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={filter === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'rounded px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide',
            filter === t.id
              ? dark
                ? 'bg-zinc-800 text-white'
                : 'bg-black/10 text-foreground'
              : dark
                ? 'text-zinc-500 hover:text-zinc-300'
                : 'text-muted-foreground hover:text-foreground'
          )}
          style={filter === t.id && t.id !== 'all' ? { color: t.color } : undefined}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
