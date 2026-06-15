'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, GraduationCap, Search, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { studyGuideSlugs, getStudyGuide } from '@/data/study-guides';
import { UNI_IDS, getUniThemeEntry } from '@/lib/uni-theme-config';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  href: string;
  icon: React.ReactNode;
  keywords: string[];
}

interface CommandPaletteProps {
  /** Si true, escucha Cmd/Ctrl+K globalmente. */
  globalHotkey?: boolean;
}

export function CommandPalette({ globalHotkey = true }: CommandPaletteProps) {
  const router = useRouter();
  const { setUniId } = useUniTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const items = useMemo<CommandItem[]>(() => {
    const uniItems: CommandItem[] = UNI_IDS.map((id) => {
      const entry = getUniThemeEntry(id);
      return {
        id: `uni-${id}`,
        label: `Cambiar a ${entry.shortLabel}`,
        hint: entry.slogan,
        href: `/?uni=${id === 'todos' ? 'todas' : id}`,
        icon: <GraduationCap className="h-4 w-4" />,
        keywords: [id, entry.name, entry.shortLabel, 'universidad'],
      };
    });

    const guideItems: CommandItem[] = studyGuideSlugs.flatMap((slug) => {
      const guide = getStudyGuide(slug);
      if (!guide) return [];
      return [
        {
          id: `guide-${slug}`,
          label: guide.titulo,
          hint: guide.materia,
          href: `/dashboard/estudio/guia/${slug}?tab=guia`,
          icon: <BookOpen className="h-4 w-4" />,
          keywords: [slug, guide.materia, guide.titulo, 'guía', 'estudio'],
        },
      ];
    });

    const extras: CommandItem[] = [
      {
        id: 'sim',
        label: 'Simulador gratis',
        href: '/simulador-gratis?uni=unam',
        icon: <Sparkles className="h-4 w-4" />,
        keywords: ['simulador', 'examen', 'diagnóstico'],
      },
      {
        id: 'precios',
        label: 'Ver planes y precios',
        href: '/precios',
        icon: <Sparkles className="h-4 w-4" />,
        keywords: ['precio', 'plan', 'suscripción'],
      },
    ];

    return [...uniItems, ...guideItems, ...extras];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint?.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  const runItem = useCallback(
    (item: CommandItem) => {
      setOpen(false);
      setQuery('');
      if (item.id.startsWith('uni-')) {
        const uniId = item.id.replace('uni-', '') as (typeof UNI_IDS)[number];
        setUniId(uniId, { syncUrl: true });
      }
      router.push(item.href);
    },
    [router, setUniId]
  );

  useEffect(() => {
    if (!globalHotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [globalHotkey]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-border/60 bg-white/60 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-white md:inline-flex"
      >
        <Search className="h-3.5 w-3.5" />
        Buscar temas…
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle className="text-base">Búsqueda universal</DialogTitle>
            <DialogDescription className="text-xs">
              Temas, guías, universidades y accesos rápidos
            </DialogDescription>
          </DialogHeader>
          <div className="border-b px-3 py-2">
            <Input
              autoFocus
              placeholder='Ej: "Trigonometría", "IPN", "simulador"…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
            {filtered.length === 0 ? (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                Sin resultados para &quot;{query}&quot;
              </li>
            ) : (
              filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={false}
                    onClick={() => runItem(item)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm',
                      'hover:bg-primary/5 active:scale-[0.99]'
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      {item.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{item.label}</span>
                      {item.hint && (
                        <span className="block truncate text-xs text-muted-foreground">
                          {item.hint}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
