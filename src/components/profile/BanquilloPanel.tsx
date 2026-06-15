'use client';

import Link from 'next/link';
import { Bookmark, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CyberCard } from '@/components/ui/cyber-card';
import { useQuestionBookmarks } from '@/hooks/useQuestionBookmarks';

export function BanquilloPanel() {
  const { bookmarks, hydrated, toggleBookmark } = useQuestionBookmarks();

  if (!hydrated) return null;

  return (
    <CyberCard className="p-6">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-zinc-400">
        <Bookmark className="h-5 w-5 text-[hsl(var(--uni-primary))]" aria-hidden />
        Banquillo de dudas
      </h3>
      <div>
        {bookmarks.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Marca preguntas con el ícono de bookmark durante un simulador para repasarlas aquí.
          </p>
        ) : (
          <ul className="space-y-2">
            {bookmarks.map((b) => (
              <li
                key={b.questionId}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm"
              >
                <div>
                  <p className="font-bold capitalize text-zinc-200">{b.materia}</p>
                  <p className="text-xs text-zinc-500">{b.tema.replace(/_/g, ' ')}</p>
                </div>
                <div className="flex gap-1">
                  <Button asChild variant="outline" size="sm" className="h-9 rounded-lg border-zinc-700 bg-zinc-950">
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
        )}
      </div>
    </CyberCard>
  );
}
