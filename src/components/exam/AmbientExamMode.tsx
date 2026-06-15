'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Headphones, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'prepmx-ambient-exam-mode';

interface AmbientSettings {
  enabled: boolean;
  volume: number;
  muted: boolean;
}

function readSettings(): AmbientSettings {
  if (typeof window === 'undefined') {
    return { enabled: false, volume: 0.25, muted: false };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { enabled: false, volume: 0.25, muted: false };
    const parsed = JSON.parse(raw) as Partial<AmbientSettings>;
    return {
      enabled: Boolean(parsed.enabled),
      volume: typeof parsed.volume === 'number' ? parsed.volume : 0.25,
      muted: Boolean(parsed.muted),
    };
  } catch {
    return { enabled: false, volume: 0.25, muted: false };
  }
}

function writeSettings(settings: AmbientSettings): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* best-effort */
  }
}

/** Generador de ruido marrón suave vía Web Audio (sin assets externos). */
function createBrownNoise(ctx: AudioContext, gainNode: GainNode): AudioBufferSourceNode {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(gainNode);
  return source;
}

interface AmbientExamModeProps {
  className?: string;
}

/**
 * Toggle "Modo Examen de Admisión Real" con audio ambiental sutil.
 * Usa Web Audio brown noise como fallback sin depender de archivos en /public.
 */
export function AmbientExamMode({ className }: AmbientExamModeProps) {
  const [settings, setSettings] = useState<AmbientSettings>(() => readSettings());
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const effectiveVolume = settings.muted ? 0 : settings.volume;

  const stopAudio = useCallback(() => {
    sourceRef.current?.stop();
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    void audioCtxRef.current?.close();
    audioCtxRef.current = null;
    gainRef.current = null;
  }, []);

  const startAudio = useCallback(async () => {
    if (typeof window === 'undefined') return;
    stopAudio();
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    const ctx = new Ctx();
    const gain = ctx.createGain();
    gain.gain.value = effectiveVolume;
    gain.connect(ctx.destination);

    const source = createBrownNoise(ctx, gain);
    source.start(0);

    audioCtxRef.current = ctx;
    gainRef.current = gain;
    sourceRef.current = source;
  }, [effectiveVolume, stopAudio]);

  useEffect(() => {
    writeSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (settings.enabled && !settings.muted) {
      void startAudio();
    } else {
      stopAudio();
    }
    return () => stopAudio();
  }, [settings.enabled, settings.muted, startAudio, stopAudio]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = effectiveVolume;
    }
  }, [effectiveVolume]);

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card/80 p-4 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-uni-primary/10 text-uni-primary">
            <Headphones className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Modo Examen de Admisión Real</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Ambiente de aula sutil para concentrarte (ruido marrón generado localmente).
            </p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={settings.enabled}
          onClick={() => setSettings((s) => ({ ...s, enabled: !s.enabled }))}
          className={cn(
            'relative h-7 w-12 shrink-0 rounded-full transition-colors',
            settings.enabled ? 'bg-uni-primary' : 'bg-muted'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform',
              settings.enabled ? 'translate-x-5' : 'translate-x-0.5'
            )}
          />
        </button>
      </div>

      {settings.enabled && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            aria-label={settings.muted ? 'Activar sonido' : 'Silenciar'}
            onClick={() => setSettings((s) => ({ ...s, muted: !s.muted }))}
            className="rounded-lg border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.volume}
            onChange={(e) => setSettings((s) => ({ ...s, volume: Number(e.target.value), muted: false }))}
            className="h-2 flex-1 cursor-pointer accent-[hsl(var(--uni-primary))]"
            aria-label="Volumen ambiente"
          />
          <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
            {Math.round(settings.volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
