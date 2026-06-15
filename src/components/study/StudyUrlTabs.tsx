'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { parseStudyTab, type StudyTabId } from '@/data/study-milestones';

const TABS: { id: StudyTabId; label: string }[] = [
  { id: 'timeline', label: 'Ruta' },
  { id: 'guia', label: 'Guía' },
  { id: 'flashcards', label: 'Flashcards' },
];

interface StudyUrlTabsProps {
  className?: string;
}

/** Pestañas sincronizadas con `?tab=` en la URL (persistente al refrescar/compartir). */
export function StudyUrlTabs({ className }: StudyUrlTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = parseStudyTab(searchParams.get('tab'));

  const setTab = useCallback(
    (tab: StudyTabId) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', tab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div
      className={cn(
        'inline-flex rounded-xl border border-border bg-muted/40 p-1',
        className
      )}
      role="tablist"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => setTab(tab.id)}
          className={cn(
            'min-h-10 rounded-lg px-4 py-2 text-sm font-semibold transition-all active:scale-95',
            active === tab.id
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground md:hover:bg-card/50'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function useStudyTab(): StudyTabId {
  const searchParams = useSearchParams();
  return parseStudyTab(searchParams.get('tab'));
}
