'use client';

import Link from 'next/link';
import { Bookmark, Trash2 } from 'lucide-react';
import { BookmarksEmptyState } from '@/components/bookmarks/BookmarksEmptyState';
import { Button } from '@/components/ui/button';
import { CyberCard } from '@/components/ui/cyber-card';
import { SkeletonBody } from '@/components/ui/skeleton-body';
import { useQuestionBookmarks } from '@/hooks/useQuestionBookmarks';
import { cn } from '@/lib/utils';

interface BanquilloPanelProps {
  className?: string;
  /** Variante clara para el dashboard principal (sin CyberCard oscuro). */
  variant?: 'cyber' | 'card';
}

export function BanquilloPanel({ className, variant = 'cyber' }: BanquilloPanelProps) {
  const { bookmarks, hydrated, toggleBookmark } = useQuestionBookmarks();

  const title = (
    <h3
      className={cn(
        'mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider',
        variant === 'cyber' ? 'text-zinc-400' : 'text-muted-foreground'
      )}
    >
      <Bookmark className="h-5 w-5 text-[hsl(var(--uni-primary))]" aria-hidden />
      Banquillo de dudas
    </h3>
  );

  const body = !hydrated ? (
    <SkeletonBody lines={3} className="max-w-md" />
  ) : bookmarks.length === 0 ? (
    <BookmarksEmptyState />
  ) : (
    <ul className="space-y-2">
      {bookmarks.map((b) => (
        <li
          key={b.questionId}
          className={cn(
            'flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm',
            variant === 'cyber'
              ? 'border-zinc-800 bg-zinc-900/60'
              : 'border-border bg-card'
          )}
        >
          <div>
            <p
              className={cn(
                'font-bold capitalize',
                variant === 'cyber' ? 'text-zinc-200' : 'text-foreground'
              )}
            >
              {b.materia}
            </p>
            <p className={cn('text-xs', variant === 'cyber' ? 'text-zinc-500' : 'text-muted-foreground')}>
              {b.tema.replace(/_/g, ' ')}
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              asChild
              variant="outline"
              size="sm"
              className={cn(
                'h-9 rounded-lg',
                variant === 'cyber' && 'border-zinc-700 bg-zinc-950'
              )}
            >
              <Link href="/dashboard/simulacros">Repasar</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 w-9 rounded-lg p-0"
              aria-label="Quitar de banquillo"
              onClick={() =>
                toggleBookmark({
                  questionId: b.questionId,
                  materia: b.materia,
                  tema: b.tema,
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );

  if (variant === 'card') {
    return (
      <section className={cn('rounded-2xl border border-border bg-card p-6 shadow-sm', className)}>
        {title}
        {body}
      </section>
    );
  }

  return (
    <CyberCard className={cn('p-6', className)}>
      {title}
      {body}
    </CyberCard>
  );
}
