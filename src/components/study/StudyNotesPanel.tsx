'use client';

import { useEffect, useState } from 'react';
import { StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudyNotesPanelProps {
  slug: string;
  className?: string;
}

function storageKey(slug: string) {
  return `prepmx-study-notes-${slug}`;
}

/** Panel de notas Markdown personales (split screen en desktop / iPad horizontal). */
export function StudyNotesPanel({ slug, className }: StudyNotesPanelProps) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      setNotes(localStorage.getItem(storageKey(slug)) ?? '');
    } catch {
      /* ignore */
    }
  }, [slug]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(storageKey(slug), notes);
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [notes, slug]);

  return (
    <aside
      className={cn(
        'flex h-full min-h-[280px] flex-col rounded-2xl border border-border bg-card shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <StickyNote className="h-4 w-4 text-uni-primary" aria-hidden />
        <h2 className="text-sm font-bold">Mis notas</h2>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Escribe fórmulas, mnemotécnicos o dudas en Markdown…"
        className="min-h-[240px] flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
      />
    </aside>
  );
}
