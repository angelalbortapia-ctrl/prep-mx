'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useTemarioOverview } from '@/hooks/useTemario';
import { buildJourneyHref } from '@/lib/journey-links';
import { cn } from '@/lib/utils';
import type { TemarioUniId } from '@/data/temario-registry';

interface SupportedExamsNavDropdownProps {
  activeUni?: TemarioUniId | 'todas';
  className?: string;
}

export function SupportedExamsNavDropdown({ activeUni, className }: SupportedExamsNavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { data } = useTemarioOverview();
  const exams = data?.exams ?? [];

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const isActive = activeUni && activeUni !== 'todas';

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'tap-transparent inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive || open
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
        )}
      >
        Exámenes soportados
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 min-w-[280px] overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          {exams.map((exam) => (
            <Link
              key={exam.id}
              role="menuitem"
              href={`${buildJourneyHref('/', { uni: exam.id, plan: 'universidad' })}#universidades`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-foreground">{exam.label}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {exam.availability === 'disponible' ? 'Temario activo' : 'En preparación'}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {exam.convocatoria} · {exam.totalReactivos} reactivos · {exam.horasExamen}h
              </p>
              <p className="text-xs text-muted-foreground">
                {exam.materiasCount} materias
                {exam.topicsPublicados > 0 ? ` · ${exam.topicsPublicados} temas publicados` : ''}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
