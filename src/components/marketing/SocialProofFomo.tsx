'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Users } from 'lucide-react';
import { SOCIAL_PROOF_EVENTS, type SocialProofEvent } from '@/data/social-proof-events';
import { cn } from '@/lib/utils';

interface SocialProofFomoProps {
  className?: string;
}

export function SocialProofFomo({ className }: SocialProofFomoProps) {
  const prefersReducedMotion = useReducedMotion();
  const [events] = useState<SocialProofEvent[]>(SOCIAL_PROOF_EVENTS);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion || events.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % events.length), 4500);
    return () => window.clearInterval(id);
  }, [mounted, events.length, prefersReducedMotion]);

  const current = events[index];
  if (!current) return null;

  return (
    <div
      className={cn(
        'inline-flex max-w-md items-center gap-2 rounded-full border border-border/60 bg-card/90 px-3 py-2 text-xs shadow-sm backdrop-blur-sm',
        className
      )}
      aria-live="polite"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Users className="h-3.5 w-3.5" aria-hidden />
      </span>
      <AnimatePresence mode="wait">
        <motion.p
          key={current.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className="line-clamp-2 text-muted-foreground"
        >
          <span className="font-medium text-foreground">{current.message}</span>
          <span className="ml-1 text-[10px] opacity-70">· hace {current.minutesAgo} min</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
