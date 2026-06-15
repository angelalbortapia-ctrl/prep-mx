'use client';

import { useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion, useReducedMotion } from 'framer-motion';
import { CyberCard, NeonStatusBadge } from '@/components/ui/cyber-card';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { cn } from '@/lib/utils';

const springFill = { type: 'spring' as const, stiffness: 120, damping: 18 };

interface RealAccuracyThermometerProps {
  currentScore: number;
  cutoffScore: number;
  careerLabel: string;
  accentHex: string;
  primaryHex: string;
}

function RealAccuracyThermometer({
  currentScore,
  cutoffScore,
  careerLabel,
  accentHex,
  primaryHex,
}: RealAccuracyThermometerProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const pct = Math.min(100, Math.round((currentScore / cutoffScore) * 100));
  const gap = Math.max(0, cutoffScore - currentScore);
  const inSafeZone = currentScore >= cutoffScore;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Termómetro de aciertos reales
        </p>
        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600">
          Meta · {careerLabel}
        </span>
      </div>

      <div className="relative h-3 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
        <motion.div
          initial={prefersReducedMotion ? false : { width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={springFill}
          className="relative h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${primaryHex} 0%, ${accentHex} 55%, #34d399 100%)`,
            boxShadow: `0 0 22px ${accentHex}66, inset 0 1px 0 rgba(255,255,255,0.15)`,
          }}
        >
          <span
            className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/80 blur-[1px]"
            aria-hidden
          />
        </motion.div>
        <div
          className="pointer-events-none absolute top-0 h-full w-0.5 bg-zinc-100/90 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          style={{ left: '100%', transform: 'translateX(-100%)' }}
          aria-hidden
        />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-3xl font-black tabular-nums tracking-tight text-zinc-50">
            {currentScore}
            <span className="text-base font-bold text-zinc-500"> / {cutoffScore}</span>
          </p>
          <p className="text-[11px] font-semibold text-zinc-500">aciertos simulados</p>
        </div>
        <p
          className={cn(
            'max-w-xs text-right text-xs font-bold leading-relaxed',
            inSafeZone ? 'text-emerald-400' : 'text-amber-400'
          )}
        >
          {inSafeZone
            ? 'Estás dentro de la zona segura de selección. Mantén el ritmo.'
            : `Estás a ${gap} aciertos de la zona segura de selección.`}
        </p>
      </div>
    </div>
  );
}

const CAREER_BY_UNI: Record<string, string> = {
  unam: 'Medicina · CU',
  ipn: 'Ing. en Inteligencia Artificial',
  uam: 'Medicina · UAM Xochimilco',
  todos: 'Carrera meta',
};

export function StudentGarageHeader() {
  const { user, isLoaded } = useUser();
  const { data: profile } = useUserProfile();
  const { entry, cutoffScore, hydrated } = useUniTheme();

  const currentScore = profile?.averageScore ?? 82;
  const careerLabel = CAREER_BY_UNI[entry.id] ?? profile?.examTarget ?? 'Carrera meta';
  const criticalGap = cutoffScore - currentScore > 15;

  const initials = useMemo(() => {
    const name = user?.fullName ?? user?.firstName ?? 'A';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }, [user]);

  const ringStyle = hydrated
    ? {
        boxShadow: `0 0 0 2px ${entry.colors.primary}, 0 0 28px ${entry.colors.accent}55, 0 0 48px ${entry.colors.primary}33`,
      }
    : undefined;

  return (
    <CyberCard className="overflow-hidden p-0">
      <div className="border-b border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900/80 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-lg font-black text-zinc-100 ring-2 ring-zinc-800"
              style={ringStyle}
            >
              {isLoaded && user?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                El garage del aspirante
              </p>
              <h2 className="text-xl font-black tracking-tight text-zinc-50 md:text-2xl">
                {isLoaded ? user?.fullName ?? 'Aspirante PrepMX' : 'Aspirante PrepMX'}
              </h2>
              <p className="mt-1 text-xs font-semibold text-zinc-500">
                {entry.shortLabel} · {careerLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <NeonStatusBadge tone="active" label="Tutor IA conectado" />
                {criticalGap && (
                  <NeonStatusBadge tone="critical" label="Alerta de corte crítico" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <RealAccuracyThermometer
          currentScore={currentScore}
          cutoffScore={cutoffScore}
          careerLabel={careerLabel}
          accentHex={entry.colors.accent}
          primaryHex={entry.colors.primary}
        />
      </div>
    </CyberCard>
  );
}
