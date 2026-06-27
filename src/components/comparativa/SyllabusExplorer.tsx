'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TEMARIOS_BY_UNI } from '@/data/university-comparison';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

const UNIS: Universidad[] = ['unam', 'ipn', 'uam'];

interface SyllabusExplorerProps {
  className?: string;
  dark?: boolean;
  /** Oculta el enlace a zona de estudio (p. ej. durante onboarding). */
  showStudyLink?: boolean;
}

export function SyllabusExplorer({
  className,
  dark = false,
  showStudyLink = true,
}: SyllabusExplorerProps) {
  const [activeUni, setActiveUni] = useState<Universidad>('unam');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const items = TEMARIOS_BY_UNI[activeUni];
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (m) =>
        m.materia.toLowerCase().includes(q) ||
        m.conceptos.some((c) => c.toLowerCase().includes(q))
    );
  }, [activeUni, query]);

  return (
    <section className={className}>
      <h2 className={cn('mb-4 text-lg font-bold', dark ? 'text-zinc-50' : 'text-foreground')}>
        Explorador de temario
      </h2>

      <div className="mb-4 flex flex-wrap gap-2">
        {UNIS.map((uni) => (
          <button
            key={uni}
            type="button"
            onClick={() => setActiveUni(uni)}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm font-semibold transition-colors',
              activeUni === uni
                ? 'border-primary bg-primary/10 text-primary'
                : dark
                  ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                  : 'text-muted-foreground hover:bg-muted'
            )}
          >
            {universidadLabels[uni]}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
            dark ? 'text-zinc-500' : 'text-muted-foreground'
          )}
          aria-hidden
        />
        <Input
          placeholder="Buscar materia o concepto…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 rounded-xl pl-10"
        />
      </div>

      <ul className="space-y-3">
        {filtered.length === 0 ? (
          <li
            className={cn(
              'py-6 text-center text-sm',
              dark ? 'text-zinc-500' : 'text-muted-foreground'
            )}
          >
            No hay materias que coincidan con tu búsqueda.
          </li>
        ) : (
          filtered.map((m) => (
            <li
              key={m.materia}
              className={cn(
                'rounded-xl border p-4',
                dark ? 'border-zinc-800 bg-zinc-950' : 'border-border bg-card'
              )}
            >
              <div className="mb-2 flex items-center gap-2 font-medium">
                <BookOpen className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {m.materia}
              </div>
              <ul className="space-y-1">
                {m.conceptos.map((c) => (
                  <li
                    key={c}
                    className={cn(
                      'text-xs leading-relaxed',
                      dark ? 'text-zinc-500' : 'text-muted-foreground'
                    )}
                  >
                    · {c}
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>

      {showStudyLink ? (
        <p className={cn('mt-3 text-xs', dark ? 'text-zinc-600' : 'text-muted-foreground')}>
          Temario detallado con ejercicios en{' '}
          <Link
            href={`/dashboard/estudio?uni=${activeUni}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            Zona de estudio
          </Link>
          .
        </p>
      ) : null}
    </section>
  );
}
