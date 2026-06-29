'use client';

import Link from 'next/link';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { useEffect, useMemo, useState, useCallback, memo, type ReactNode } from 'react';
import type { TickerItem } from '@/data/ticker/types';
import { formatTickerBadge, isTickerPromo } from '@/data/ticker/types';
import {
  badgeGlow,
  configToCssVars,
  fontSizeClasses,
  glowShadow,
  itemGapClass,
  tickerCycleSeconds,
  type TickerConfig,
} from '@/data/ticker/ticker-config';
import { isLightTickerLayout } from '@/data/ticker/layouts';
import { resolveTickerHref } from '@/lib/ticker/feed';
import { cn } from '@/lib/utils';
import type { TickerViewProps } from './types';
import { TickerPromoEntry } from './TickerPromoEntry';
import { TickerMobileUniRow } from './TickerMobileUniRow';
import { TickerScrollTrack, TickerShell } from './TickerShared';

function splitAlerts(items: TickerItem[]) {
  return {
    alerts: items.filter((i) => i.category === 'alerta-corte' || isTickerPromo(i)),
    rest: items.filter((i) => i.category !== 'alerta-corte' && !isTickerPromo(i)),
  };
}

function shellBackground(config: TickerConfig): string {
  if (config.layoutId === 'aurora') {
    return 'linear-gradient(90deg, #0f172a 0%, #1e1b4b 45%, #134e4a 100%)';
  }
  if (config.layoutId === 'sunset-vibe') {
    return 'linear-gradient(90deg, #1a0a2e 0%, #4a1942 45%, #7c2d12 100%)';
  }
  return config.background;
}

function previewShellHeight(config: TickerConfig): string {
  if (!config.showUniFilters) return config.barHeight;
  return `calc(${config.barHeight} + var(--ticker-uni-filter-height, 1.75rem))`;
}

function ItemWrap({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!href) return <>{children}</>;
  return (
    <Link
      href={href}
      className={cn('group shrink-0 transition-opacity hover:opacity-85', className)}
    >
      {children}
    </Link>
  );
}

const ItemRenderer = memo(function ItemRenderer({
  item,
  config,
}: {
  item: TickerItem;
  config: TickerConfig;
}) {
  const fonts = fontSizeClasses(config.fontSize);
  const badge = formatTickerBadge(item.badge);
  const href = item.href ?? resolveTickerHref(item);

  if (isTickerPromo(item)) {
    return <TickerPromoEntry item={item} light={isLightTickerLayout(config.layoutId)} />;
  }

  let content: ReactNode;

  if (config.layoutId === 'card-stream') {
    content = (
      <article
        className={cn(
          'flex shrink-0 items-center gap-2 whitespace-nowrap border bg-white/90 px-3 py-1.5 shadow-sm',
          config.roundedTrack ? 'rounded-lg' : 'rounded-none'
        )}
        style={{ borderLeftWidth: 3, borderLeftColor: config.accentPrimary }}
      >
        {config.showItemBadges ? (
          <span
            className={cn('font-mono font-bold', fonts.badge)}
            style={{ color: config.badgeTextColor }}
          >
            {badge}
          </span>
        ) : null}
        <p className={cn('max-w-[280px] truncate font-medium', fonts.text)} style={{ color: config.itemTextColor }}>
          {item.text}
        </p>
      </article>
    );
  } else if (config.layoutId === 'newspaper') {
    content = (
      <p className={cn('shrink-0 whitespace-nowrap font-serif font-medium', fonts.text)} style={{ color: config.itemTextColor }}>
        <strong>{badge}:</strong> {item.text}
      </p>
    );
  } else if (config.layoutId === 'terminal-hacker') {
    content = (
      <span className={cn('shrink-0 whitespace-nowrap font-mono', fonts.text)} style={{ color: config.itemTextColor }}>
        [{item.category}] {item.text}
      </span>
    );
  } else if (config.layoutId === 'minimal-clean' || config.layoutId === 'corporate-navy') {
    content = (
      <span className={cn('shrink-0 whitespace-nowrap', fonts.text)} style={{ color: config.itemTextColor }}>
        {config.layoutId === 'corporate-navy' && config.showItemBadges ? (
          <strong className="mr-1.5 font-serif">{badge}</strong>
        ) : null}
        {item.text}
      </span>
    );
  } else if (config.layoutId === 'stock-tape') {
    content = (
      <span className={cn('shrink-0 whitespace-nowrap font-mono', fonts.text)} style={{ color: config.itemTextColor }}>
        <strong style={{ color: config.accentPrimary }}>{badge}</strong>
        {' '}
        {item.text}
        <span className="mx-3 opacity-50" style={{ color: config.accentPrimary }} aria-hidden>
          ◆
        </span>
      </span>
    );
  } else if (config.layoutId === 'neon-outline') {
    content = (
      <span
        className={cn('shrink-0 whitespace-nowrap font-mono font-bold uppercase tracking-wide', fonts.text)}
        style={{
          color: 'transparent',
          WebkitTextStroke: `1px ${config.accentPrimary}`,
          textShadow: `0 0 12px ${config.accentPrimary}, 0 0 24px ${config.accentPrimary}66`,
        }}
      >
        {item.text}
      </span>
    );
  } else if (config.layoutId === 'stadium-led') {
    content = (
      <span
        className={cn(
          'shrink-0 whitespace-nowrap rounded px-2 py-0.5 font-mono font-black uppercase tracking-widest',
          fonts.text
        )}
        style={{
          color: config.itemTextColor,
          backgroundColor: `${config.accentPrimary}22`,
          textShadow: `0 0 8px ${config.accentPrimary}`,
        }}
      >
        {config.showItemBadges ? `${badge} · ` : ''}
        {item.text}
      </span>
    );
  } else if (config.layoutId === 'retro-vhs') {
    content = (
      <span
        className={cn('ticker-vhs-item shrink-0 whitespace-nowrap font-mono font-bold', fonts.text)}
        style={{ color: config.itemTextColor, textShadow: `2px 0 ${config.accentPrimary}, -2px 0 ${config.accentSecondary}` }}
      >
        {item.text}
      </span>
    );
  } else {
    content = (
      <article className="flex shrink-0 items-center gap-2 whitespace-nowrap">
        {config.showItemBadges ? (
          <span
            className={cn(
              'rounded px-1 py-px font-mono font-bold',
              fonts.badge,
              config.uppercaseBadges && 'uppercase'
            )}
            style={{ color: config.badgeTextColor, textShadow: badgeGlow(config) }}
          >
            {badge}
          </span>
        ) : null}
        <p className={cn('font-mono', fonts.text)} style={{ color: `${config.itemTextColor}e6` }}>
          {item.text}
        </p>
      </article>
    );
  }

  return <ItemWrap href={href}>{content}</ItemWrap>;
});

function shellBorderTop(config: TickerConfig, override?: string): string | undefined {
  if (override) return override;
  if (config.borderStyle === 'gradient') {
    return `2px solid transparent`;
  }
  if (config.borderStyle === 'glow') {
    return `2px solid ${config.borderColor}80`;
  }
  return `2px solid ${config.borderColor}`;
}

function TickerChrome({
  props,
  children,
  className,
  borderTop,
}: {
  props: TickerViewProps;
  children: ReactNode;
  className?: string;
  borderTop?: string;
}) {
  const { config } = props;
  const cssVars = configToCssVars(config);
  const resolvedBorder = borderTop ?? shellBorderTop(config);

  return (
    <TickerShell
      previewMode={props.previewMode}
      placement={props.placement}
      hasMobileCta={props.hasMobileCta}
      paused={props.paused}
      className={cn(
        !config.pauseOnHover && 'no-hover-pause',
        !props.previewMode && 'university-ticker-shell',
        !props.previewMode && config.showUniFilters && 'with-uni-filters',
        className
      )}
      style={{
        ...cssVars,
        ...(props.previewMode ? { height: previewShellHeight(config) } : {}),
        backgroundColor: shellBackground(config),
        borderTop: resolvedBorder,
        boxShadow: config.borderStyle === 'glow' ? glowShadow(config) : undefined,
        backdropFilter: config.blurBackdrop ? 'blur(12px)' : undefined,
        transition:
          'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease',
      }}
    >
      {config.borderStyle === 'gradient' && !borderTop ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-0.5"
          style={{
            background: `linear-gradient(90deg, ${config.accentPrimary}, ${config.accentSecondary}, ${config.accentPrimary})`,
          }}
          aria-hidden
        />
      ) : null}
      {config.scanlines ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)',
          }}
          aria-hidden
        />
      ) : null}
      {children}
    </TickerShell>
  );
}

function BrandBlock({ config }: { config: TickerConfig }) {
  const isDark = !isLightTickerLayout(config.layoutId);
  return (
    <div
      className="flex shrink-0 items-center border-r px-3"
      style={{
        borderColor: `${config.borderColor}33`,
        backgroundColor: isDark ? `${config.accentPrimary}12` : `${config.accentPrimary}08`,
      }}
    >
      <span
        className="text-[10px] font-black uppercase tracking-widest"
        style={{
          backgroundImage: `linear-gradient(90deg, ${config.accentPrimary}, ${config.accentSecondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: config.layoutId === 'minimal-clean' || config.layoutId === 'corporate-navy' ? config.accentPrimary : undefined,
        }}
      >
        {config.brandLabel}
      </span>
    </div>
  );
}

function LiveBlock({ props }: { props: TickerViewProps }) {
  const { config } = props;
  if (!config.showLiveBadge) return null;
  return (
    <div
      className="hidden shrink-0 items-center gap-1.5 border-r px-2 sm:flex"
      style={{ borderColor: `${config.borderColor}33` }}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', !props.paused && 'animate-pulse')}
        style={{ backgroundColor: config.accentPrimary }}
      />
      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: config.accentPrimary }}>
        {props.paused ? 'Pausa' : config.liveLabel}
      </span>
    </div>
  );
}

function ControlsBlock({ props }: { props: TickerViewProps }) {
  const { config } = props;
  const light = isLightTickerLayout(config.layoutId);
  return (
    <div className="flex shrink-0 items-center">
      {config.showPauseButton ? (
        <button
          type="button"
          onClick={props.onTogglePause}
          className={cn(
            'flex h-full items-center px-2.5',
            light ? 'text-muted-foreground hover:text-foreground' : 'text-zinc-400 hover:text-white'
          )}
          aria-label={props.paused ? 'Reanudar' : 'Pausar'}
        >
          {props.paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      ) : null}
      {config.showSimularLink ? (
        <Link
          href={props.radarHref}
          className="hidden h-full items-center gap-1 border-l px-2.5 font-mono text-[9px] font-bold uppercase sm:flex"
          style={{ borderColor: `${config.borderColor}33`, color: config.accentPrimary }}
        >
          {config.simularLabel}
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      ) : null}
    </div>
  );
}

function StandardLayout(props: TickerViewProps) {
  const { config, items } = props;
  const dur = tickerCycleSeconds(items.length, config.speedMultiplier);
  const gap = itemGapClass(config.itemGap);
  const emptyClassName = isLightTickerLayout(config.layoutId)
    ? 'text-muted-foreground'
    : 'text-zinc-500';
  const renderItem = useCallback(
    (item: TickerItem) => <ItemRenderer item={item} config={config} />,
    [config]
  );

  return (
    <TickerChrome props={props} className="border-t">
      <div className="relative flex h-full flex-col md:flex-row md:items-stretch">
        <div className="flex min-h-0 flex-1 items-stretch">
          <BrandBlock config={config} />
          <LiveBlock props={props} />
          <div className="relative min-w-0 flex-1">
            <TickerScrollTrack
              items={items}
              durationSec={dur}
              gap={gap}
              emptyClassName={emptyClassName}
              renderItem={renderItem}
            />
          </div>
          <ControlsBlock props={props} />
        </div>
        {config.showUniFilters ? <TickerMobileUniRow props={props} /> : null}
      </div>
    </TickerChrome>
  );
}

function DualLaneLayout(props: TickerViewProps) {
  const { config, items } = props;
  const { alerts, rest } = useMemo(() => splitAlerts(items), [items]);
  const fast = tickerCycleSeconds(Math.max(alerts.length, 1), config.speedMultiplier * 0.55);
  const slow = tickerCycleSeconds(Math.max(rest.length, 1), config.speedMultiplier * 1.3);
  const renderItem = useCallback(
    (item: TickerItem) => <ItemRenderer item={item} config={config} />,
    [config]
  );

  return (
    <TickerChrome props={props} className="border-t-2" borderTop={`2px solid ${config.borderColor}66`}>
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex h-1/2 min-h-[1.25rem] items-center border-b border-red-900/40 bg-red-950/20">
            <span className="shrink-0 px-2 font-mono text-[8px] font-bold uppercase text-red-400">Alertas</span>
            <div className="min-w-0 flex-1">
              <TickerScrollTrack
                items={alerts.length ? alerts : items.slice(0, 4)}
                durationSec={fast}
                renderItem={renderItem}
              />
            </div>
          </div>
          <div className="flex h-1/2 min-h-[1.25rem] items-center">
            <BrandBlock config={config} />
            <div className="min-w-0 flex-1">
              <TickerScrollTrack
                items={rest.length ? rest : items}
                durationSec={slow}
                renderItem={renderItem}
              />
            </div>
            <ControlsBlock props={props} />
          </div>
        </div>
        <TickerMobileUniRow props={props} />
      </div>
    </TickerChrome>
  );
}

function SpotlightLayout(props: TickerViewProps) {
  const { config, items, paused, filter } = props;
  const [index, setIndex] = useState(0);
  const pool = items.length ? items : [];
  const current = pool[index % Math.max(pool.length, 1)];

  useEffect(() => {
    setIndex(0);
  }, [filter, items]);

  useEffect(() => {
    if (paused || pool.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % pool.length), 5000);
    return () => window.clearInterval(id);
  }, [paused, pool.length]);

  return (
    <TickerChrome props={props}>
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 items-center gap-3 px-3">
          <BrandBlock config={config} />
          <LiveBlock props={props} />
          <div className="min-w-0 flex-1 overflow-hidden">
            {current ? (
              <div key={current.id} className="animate-in fade-in duration-500">
                <ItemRenderer item={current} config={config} />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Sin señales</p>
            )}
          </div>
          {pool.length > 1 ? (
            <span className="hidden shrink-0 font-mono text-[9px] text-muted-foreground sm:block">
              {(index % pool.length) + 1}/{pool.length}
            </span>
          ) : null}
          <ControlsBlock props={props} />
        </div>
        <TickerMobileUniRow props={props} />
      </div>
    </TickerChrome>
  );
}

export function TickerLayoutView(props: TickerViewProps) {
  switch (props.config.layoutId) {
    case 'dual-lane':
      return <DualLaneLayout {...props} />;
    case 'spotlight':
      return <SpotlightLayout {...props} />;
    default:
      return <StandardLayout {...props} />;
  }
}
