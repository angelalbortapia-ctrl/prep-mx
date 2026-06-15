'use client';

import { CommandPalette } from '@/components/search/CommandPalette';

/** Atajos globales dentro del dashboard autenticado. */
export function AppCommandPalette() {
  return <CommandPalette globalHotkey />;
}
