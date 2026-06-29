'use client';

import { Suspense } from 'react';
import { TickerRenderer } from '@/components/marketing/ticker/TickerRenderer';
import type { TickerConfig } from '@/data/ticker/ticker-config';

const DASHBOARD_TICKER_CONFIG: Partial<TickerConfig> = {
  brandLabel: 'Avisos',
  liveLabel: 'En vivo',
  layoutId: 'minimal-clean',
  showSimularLink: false,
  showUniFilters: true,
  showLiveBadge: true,
  showPauseButton: true,
  barHeight: '2.25rem',
  scanlines: false,
  blurBackdrop: true,
  borderStyle: 'solid',
  speedMultiplier: 0.9,
  background: 'hsl(var(--card) / 0.92)',
  itemTextColor: 'hsl(var(--foreground))',
  borderColor: 'hsl(var(--border))',
};

function DashboardAdmissionTickerInner() {
  return (
    <TickerRenderer
      placement="top-sticky"
      surface="dashboard"
      configOverride={DASHBOARD_TICKER_CONFIG}
    />
  );
}

/** Barra superior del dashboard: avisos oficiales desde /api/ticker (misma fuente que /admin/ticker). */
export function DashboardAdmissionTicker() {
  return (
    <Suspense
      fallback={
        <div
          className="sticky top-16 z-40 h-9 shrink-0 border-b border-border/60 bg-card/80"
          aria-hidden
        />
      }
    >
      <DashboardAdmissionTickerInner />
    </Suspense>
  );
}
