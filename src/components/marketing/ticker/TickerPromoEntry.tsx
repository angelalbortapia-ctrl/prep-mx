'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { TickerItem } from '@/data/ticker/types';
import { formatTickerBadge } from '@/data/ticker/types';
import { resolveTickerHref } from '@/lib/ticker/feed';
import { cn } from '@/lib/utils';

function HazardTriangle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-8 shrink-0 drop-shadow-sm', className)}
      aria-hidden
    >
      <path
        d="M22 4L39.5 36H4.5L22 4Z"
        fill="#FACC15"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <rect x="20" y="14" width="4" height="12" rx="1.5" fill="#000" />
      <circle cx="22" cy="30" r="2.25" fill="#000" />
    </svg>
  );
}

function PromoText({ children, href }: { children: ReactNode; href?: string }) {
  const className =
    'min-w-0 truncate font-sans text-[11px] font-bold uppercase tracking-tight text-black transition-colors hover:text-black/80';

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return <p className={className}>{children}</p>;
}

export function TickerPromoEntry({
  item,
  light = false,
}: {
  item: Pick<TickerItem, 'badge' | 'text' | 'href' | 'category' | 'uni'>;
  light?: boolean;
}) {
  const label = formatTickerBadge(item.badge).toUpperCase();
  const href = item.href ?? resolveTickerHref(item);

  return (
    <article
      className={cn(
        'ticker-promo-hazard relative flex shrink-0 items-center whitespace-nowrap pl-0.5',
        light && 'ticker-promo-hazard-light'
      )}
      aria-label={`Oferta: ${item.text}`}
    >
      <div className="relative z-10 -mr-2.5 shrink-0">
        <HazardTriangle />
      </div>

      <div
        className={cn(
          'ticker-promo-banner relative flex min-w-0 flex-col overflow-hidden rounded-r border-2',
          light ? 'border-yellow-700/50 shadow-sm' : 'border-black shadow-[2px_2px_0_#000]'
        )}
      >
        <div className="ticker-promo-stripe h-1 shrink-0 border-b border-black/80" aria-hidden />
        <div className="flex min-w-0 items-center gap-2 bg-[#FACC15] px-2 py-0.5">
          <span className="shrink-0 font-sans text-[9px] font-black uppercase tracking-widest text-black">
            {label}
          </span>
          <span className="h-3 w-px shrink-0 bg-black/30" aria-hidden />
          <PromoText href={href}>{item.text}</PromoText>
        </div>
        <div className="ticker-promo-stripe h-1 shrink-0 border-t border-black/80" aria-hidden />
      </div>
    </article>
  );
}
