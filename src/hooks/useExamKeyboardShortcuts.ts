'use client';

import { useEffect, useRef } from 'react';
import type { OpcionId } from '@/types/question';

const OPTION_KEYS: OpcionId[] = ['A', 'B', 'C', 'D', 'E'];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

interface UseExamKeyboardShortcutsOptions {
  enabled: boolean;
  availableOptions: OpcionId[];
  onSelect: (optionId: OpcionId) => void;
  onNext?: () => void;
  onBack?: () => void;
}

/**
 * Atajos A–E y flechas durante el simulador.
 * Siempre registra cleanup en unmount para evitar fugas al cambiar de ruta.
 */
export function useExamKeyboardShortcuts({
  enabled,
  availableOptions,
  onSelect,
  onNext,
  onBack,
}: UseExamKeyboardShortcutsOptions) {
  const onSelectRef = useRef(onSelect);
  const onNextRef = useRef(onNext);
  const onBackRef = useRef(onBack);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);

  useEffect(() => {
    onBackRef.current = onBack;
  }, [onBack]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const optionSet = new Set(availableOptions);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isTypingTarget(event.target)) return;

      const key = event.key.toUpperCase();
      if (OPTION_KEYS.includes(key as OpcionId) && optionSet.has(key as OpcionId)) {
        event.preventDefault();
        onSelectRef.current(key as OpcionId);
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        event.preventDefault();
        onNextRef.current?.();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onBackRef.current?.();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, availableOptions]);
}
