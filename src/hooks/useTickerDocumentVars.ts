'use client';

import { useEffect } from 'react';
import { mergeTickerConfig } from '@/data/ticker/ticker-config';
import { applyTickerDocumentVars } from '@/lib/ticker/document-vars';
import { useTickerSettings } from '@/hooks/useTickerData';

/** Mantiene `--ticker-height` y `--ticker-uni-filter-height` en `:root`. */
export function useTickerDocumentVars(enabled = true): void {
  const { data } = useTickerSettings();

  useEffect(() => {
    if (!enabled) return;
    applyTickerDocumentVars(mergeTickerConfig(data?.theme));
  }, [enabled, data?.theme]);
}
