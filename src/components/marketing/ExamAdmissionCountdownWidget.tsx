'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AlarmClock, ArrowRight } from 'lucide-react';
import {
  getExamCountdownParts,
  landingExamCountdownMessage,
  resolveTimelineUniId,
} from '@/data/admission-timeline';
import { useClientMounted } from '@/hooks/useClientMounted';
import { UNI_THEME_CONFIG, type UniId } from '@/lib/uni-theme-config';
import { cn } from '@/lib/utils';
import { landingCtaLink } from '@/lib/landing-cta';

const TICK_MS = 30_000;

interface ExamAdmissionCountdownWidgetProps {
  uniId: UniId;
  href: string;
  className?: string;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-border bg-card px-1.5 py-2 shadow-sm sm:min-w-[3.25rem] sm:flex-none sm:px-2">
      <span className="font-mono text-xl font-bold tabular-nums leading-none text-foreground sm:text-2xl md:text-3xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function ExamAdmissionCountdownWidget({
  uniId,
  href,
  className,
}: ExamAdmissionCountdownWidgetProps) {
  const mounted = useClientMounted();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const timelineUni = resolveTimelineUniId(uniId);
  const shortLabel = UNI_THEME_CONFIG[timelineUni].shortLabel;
  const accent = UNI_THEME_CONFIG[timelineUni].colors.primary;

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!mounted) return;
    const id = window.setInterval(() => setNow(new Date()), TICK_MS);
    return () => window.clearInterval(id);
  }, [mounted]);

  const parts = useMemo(
    () => (mounted ? getExamCountdownParts(uniId, now) : null),
    [mounted, uniId, now]
  );

  const message = parts ? landingExamCountdownMessage(shortLabel, parts) : null;

  return (
    <motion.div
      className={cn('w-full max-w-xl', className)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.05 }}
    >
      <Link
        href={href}
        className={cn(
          'group block rounded-2xl border border-border bg-gradient-to-b from-card to-muted/80 p-4 shadow-sm',
          'transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-600',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
            style={{ backgroundColor: accent }}
            aria-hidden
          >
            <AlarmClock className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Reloj del examen · {shortLabel}
            </p>
            <p
              className="mt-1 text-balance text-xs font-semibold leading-snug text-foreground sm:text-sm"
              suppressHydrationWarning
            >
              {message ?? `Cargando cuenta regresiva ${shortLabel}…`}
            </p>
            {parts?.phase === 'upcoming' ? (
              <div className="mt-3 flex w-full justify-between gap-1.5 sm:justify-start sm:gap-2">
                <CountdownUnit value={parts.days} label="días" />
                <CountdownUnit value={parts.hours} label="horas" />
                <CountdownUnit value={parts.minutes} label="min" />
              </div>
            ) : null}
            <p className={cn('mt-3 flex items-center gap-1 text-xs', landingCtaLink)}>
              Entrena ahora con el simulador gratis
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </p>
          </div>
        </div>
        {parts ? (
          <p className="mt-3 text-center text-[10px] text-muted-foreground sm:text-left">
            Meta: {parts.target.label} · fechas orientativas
          </p>
        ) : null}
      </Link>
    </motion.div>
  );
}
