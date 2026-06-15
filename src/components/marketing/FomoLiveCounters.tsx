'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CounterProps {
  label: string;
  base: number;
  incrementEveryMs: number;
  suffix?: string;
}

function LiveCounter({ label, base, incrementEveryMs, suffix = '' }: CounterProps) {
  const [value, setValue] = useState(base);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setValue((v) => v + 1);
    }, incrementEveryMs);
    return () => window.clearInterval(id);
  }, [incrementEveryMs, prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-card p-4 text-center shadow-sm"
    >
      <p className="text-2xl font-extrabold tabular-nums text-primary">
        {value.toLocaleString('es-MX')}
        {suffix}
      </p>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function FomoLiveCounters({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-4', className)}>
      <LiveCounter label="Exámenes completados hoy por la comunidad" base={3412} incrementEveryMs={9000} />
      <LiveCounter label="Estudiantes de tu misma carrera compitiendo en tiempo real" base={218} incrementEveryMs={7000} />
      <LiveCounter label="Eleva tus aciertos un 35% desde la 1.ª semana de racha" base={35} incrementEveryMs={0} suffix="%" />
      <LiveCounter label="Diagnósticos activos en este momento" base={127} incrementEveryMs={11000} />
    </div>
  );
}
