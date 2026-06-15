'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const POSITION_KEY = 'prepmx-audio-guia-position';

interface AudioGuiaPlayerProps {
  /** Texto a narrar (demo con Web Speech API). */
  summaryText: string;
  title?: string;
  className?: string;
}

function readPosition(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(POSITION_KEY);
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}

function writePosition(charIndex: number): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(POSITION_KEY, String(charIndex));
  } catch {
    /* best-effort */
  }
}

/**
 * Mini reproductor flotante para resúmenes narrados (demo TTS con speechSynthesis).
 * Persiste posición de lectura y pausa al ocultar la pestaña (Page Visibility API).
 */
export function AudioGuiaPlayer({
  summaryText,
  title = 'Resumen narrado',
  className,
}: AudioGuiaPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startIndexRef = useRef(0);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    setCharIndex(readPosition());
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setPlaying(false);
    utteranceRef.current = null;
  }, []);

  const playFrom = useCallback(
    (fromIndex: number) => {
      if (!supported || typeof window === 'undefined') return;
      stop();

      const text = summaryText.slice(fromIndex);
      if (!text.trim()) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.rate = 0.95;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const next = fromIndex + event.charIndex;
          setCharIndex(next);
          writePosition(next);
        }
      };

      utterance.onend = () => {
        setPlaying(false);
        writePosition(0);
        setCharIndex(0);
      };

      utterance.onerror = () => setPlaying(false);

      utteranceRef.current = utterance;
      startIndexRef.current = fromIndex;
      window.speechSynthesis.speak(utterance);
      setPlaying(true);
    },
    [summaryText, supported, stop]
  );

  const toggle = useCallback(() => {
    if (playing) {
      const pos = startIndexRef.current + (utteranceRef.current ? 0 : charIndex);
      writePosition(pos);
      stop();
    } else {
      playFrom(charIndex);
    }
  }, [playing, charIndex, playFrom, stop]);

  // Pausar al cambiar de pestaña (mobile-friendly).
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && playing) {
        writePosition(charIndex);
        stop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [playing, charIndex, stop]);

  useEffect(() => () => stop(), [stop]);

  if (!supported) {
    return (
      <p className={cn('text-xs text-muted-foreground', className)}>
        Narración demo no disponible en este navegador.
      </p>
    );
  }

  const progress = summaryText.length > 0 ? Math.round((charIndex / summaryText.length) * 100) : 0;

  return (
    <div
      className={cn(
        'fixed z-40 flex items-center gap-3 rounded-2xl border bg-card/95 px-4 py-3 shadow-xl backdrop-blur-md',
        className
      )}
      style={{
        bottom: 'calc(5.5rem + env(safe-area-inset-bottom))',
        left: 'max(1rem, env(safe-area-inset-left))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pausar narración' : 'Reproducir narración demo'}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-uni-primary text-white shadow-md active:scale-95"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 pl-0.5" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Volume2 className="h-3.5 w-3.5 shrink-0 text-uni-accent" aria-hidden />
          <p className="truncate text-sm font-semibold">{title}</p>
          <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-700">
            Demo TTS
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-uni-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 truncate text-[11px] text-muted-foreground">
          Web Speech API — placeholder hasta lección OpenAI
        </p>
      </div>
    </div>
  );
}
