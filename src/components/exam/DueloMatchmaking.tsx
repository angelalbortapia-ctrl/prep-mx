'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Swords, Timer, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AdaptiveSheet,
  AdaptiveSheetContent,
  AdaptiveSheetDescription,
  AdaptiveSheetHeader,
  AdaptiveSheetTitle,
  AdaptiveSheetTrigger,
} from '@/components/ui/adaptive-sheet';
import { useHaptics } from '@/hooks/useHaptics';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { cn } from '@/lib/utils';

type DuelPhase = 'idle' | 'searching' | 'matched' | 'live' | 'finished';

const BOT_HISTORY = [62, 71, 68, 75, 80, 77, 82, 79];

interface DueloMatchmakingProps {
  /** Puntaje del usuario para la barra comparativa (0–100). */
  userScore?: number;
  triggerClassName?: string;
}

/**
 * UI visual de "Duelo de Aciertos en Tiempo Real" — matchmaking simulado vs bot.
 * No altera el flujo del simulador; panel accesible vía trigger.
 */
export function DueloMatchmaking({ userScore = 0, triggerClassName }: DueloMatchmakingProps) {
  const prefersReducedMotion = useReducedMotion();
  const haptics = useHaptics();
  const { entry } = useUniTheme();

  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<DuelPhase>('idle');
  const [botScore, setBotScore] = useState(45);
  const [liveUser, setLiveUser] = useState(userScore);
  const [liveBot, setLiveBot] = useState(45);
  const matchTimeoutsRef = useRef<number[]>([]);

  const clearMatchTimeouts = () => {
    for (const id of matchTimeoutsRef.current) {
      window.clearTimeout(id);
    }
    matchTimeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearMatchTimeouts();
  }, []);

  useEffect(() => {
    setLiveUser(userScore);
  }, [userScore]);

  function startMatchmaking() {
    clearMatchTimeouts();
    setPhase('searching');
    void haptics.selection();

    matchTimeoutsRef.current.push(
      window.setTimeout(() => {
        setPhase('matched');
        void haptics.success();
      }, 1800)
    );

    matchTimeoutsRef.current.push(
      window.setTimeout(() => {
        setPhase('live');
        setBotScore(55 + Math.floor(Math.random() * 25));
      }, 2800)
    );
  }

  useEffect(() => {
    if (phase !== 'live') return;

    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;
      setLiveUser((u) => Math.min(100, u + Math.floor(Math.random() * 8)));
      setLiveBot((b) => {
        const hist = BOT_HISTORY[tick % BOT_HISTORY.length];
        return Math.min(100, b + Math.floor(hist / 20));
      });

      if (tick >= 8) {
        window.clearInterval(interval);
        setPhase('finished');
        void haptics.warning();
      }
    }, 700);

    return () => window.clearInterval(interval);
  }, [phase, haptics]);

  function reset() {
    clearMatchTimeouts();
    setPhase('idle');
    setLiveUser(userScore);
    setLiveBot(45);
    setBotScore(45);
  }

  const userWins = liveUser >= liveBot;

  return (
    <AdaptiveSheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <AdaptiveSheetTrigger asChild>
        <Button
          variant="outline"
          className={cn('h-11 rounded-xl border-uni-primary/30 active:scale-95', triggerClassName)}
        >
          <Swords className="mr-2 h-4 w-4 text-uni-primary" />
          Duelo en vivo
        </Button>
      </AdaptiveSheetTrigger>

      <AdaptiveSheetContent>
        <AdaptiveSheetHeader>
          <AdaptiveSheetTitle className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-uni-primary" aria-hidden />
            Duelo de Aciertos — {entry.shortLabel}
          </AdaptiveSheetTitle>
          <AdaptiveSheetDescription>
            Matchmaking simulado vs oponente bot. Datos históricos de referencia.
          </AdaptiveSheetDescription>
        </AdaptiveSheetHeader>

        <div className="mt-4 space-y-5">
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-uni-primary/10">
                  <Users className="h-8 w-8 text-uni-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Compite en tiempo real contra un oponente con historial similar al tuyo.
                </p>
                <Button onClick={startMatchmaking} className="h-12 w-full rounded-xl">
                  <Zap className="mr-2 h-4 w-4" />
                  Buscar oponente
                </Button>
              </motion.div>
            )}

            {phase === 'searching' && (
              <motion.div
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="h-12 w-12 rounded-full border-4 border-uni-primary/20 border-t-uni-primary"
                />
                <p className="text-sm font-medium">Buscando oponente en {entry.name}…</p>
              </motion.div>
            )}

            {(phase === 'matched' || phase === 'live' || phase === 'finished') && (
              <motion.div
                key="duel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {phase === 'matched' && (
                  <p className="rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700 dark:bg-green-950/30 dark:text-green-400">
                    ¡Oponente encontrado! Preparando duelo…
                  </p>
                )}

                <DuelBar
                  label="Tú"
                  score={phase === 'live' || phase === 'finished' ? liveUser : userScore}
                  color="hsl(var(--uni-primary))"
                  delay={0}
                  reducedMotion={Boolean(prefersReducedMotion)}
                />
                <DuelBar
                  label="Oponente Bot"
                  score={phase === 'live' || phase === 'finished' ? liveBot : botScore}
                  color="hsl(var(--uni-accent))"
                  delay={0.15}
                  reducedMotion={Boolean(prefersReducedMotion)}
                />

                {(phase === 'live' || phase === 'finished') && (
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Timer className="h-3.5 w-3.5" aria-hidden />
                    {phase === 'live' ? 'Duelo en curso…' : 'Duelo terminado'}
                  </div>
                )}

                {phase === 'finished' && (
                  <div
                    className={cn(
                      'rounded-2xl p-4 text-center text-sm font-bold',
                      userWins
                        ? 'bg-green-50 text-green-700 dark:bg-green-950/30'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30'
                    )}
                  >
                    {userWins ? '¡Ganaste el duelo!' : 'El bot se adelantó — sigue practicando.'}
                  </div>
                )}

                {phase === 'finished' && (
                  <Button variant="outline" className="h-11 w-full rounded-xl" onClick={reset}>
                    Nuevo duelo
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AdaptiveSheetContent>
    </AdaptiveSheet>
  );
}

interface DuelBarProps {
  label: string;
  score: number;
  color: string;
  delay: number;
  reducedMotion: boolean;
}

function DuelBar({ label, score, color, delay, reducedMotion }: DuelBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="tabular-nums text-muted-foreground">{score}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, score)}%` }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            delay: reducedMotion ? 0 : delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}
