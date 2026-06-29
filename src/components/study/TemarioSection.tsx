'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookMarked, ChevronDown, Construction, Lock } from 'lucide-react';
import { StudyUniSwitcher } from '@/components/study/StudyUniSwitcher';
import { TemarioUniTreeSection } from '@/components/study/TemarioUniTreeSection';
import { useTemarioSummary } from '@/hooks/useTemario';
import {
  isPlaceholderPesoRelativo,
  resolveTemarioUniId,
  temarioHasDetailedContent,
  type TemarioMateriaSummary,
  type TemarioUniId,
} from '@/data/temario-registry';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { uniThemedHeaderBadge } from '@/lib/study-appearance-styles';
import { SkeletonTemarioSection } from '@/components/ui/skeleton-body';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 280, damping: 26 };

interface TemarioSectionProps {
  className?: string;
}

export function TemarioSection({ className }: TemarioSectionProps) {
  const { filterId, uniId } = useUniTheme();
  const temarioUni = resolveTemarioUniId(filterId, uniId);

  return (
    <div className={cn('space-y-4', className)}>
      <StudyUniSwitcher />
      {temarioHasDetailedContent(temarioUni) ? (
        <TemarioUniTreeSection key={`temario-${temarioUni}`} uni={temarioUni} />
      ) : (
        <PlaceholderTemarioSection key={`temario-ph-${temarioUni}`} uni={temarioUni} />
      )}
    </div>
  );
}

function PlaceholderTemarioSection({ uni }: { uni: TemarioUniId }) {
  const [divisionFilter, setDivisionFilter] = useState<string>('todas');
  const [expandedMateria, setExpandedMateria] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { isDark } = useStudyAppearance();
  const { data, isLoading } = useTemarioSummary(uni, divisionFilter);

  useEffect(() => {
    setDivisionFilter('todas');
    setExpandedMateria(null);
  }, [uni]);

  const meta = data?.meta;
  const materias = data?.materias ?? [];
  const filters = data?.filters ?? [];
  const showDivisionTabs = filters.length > 1;
  const pesoRelativo = isPlaceholderPesoRelativo(uni);

  if (isLoading && !data) {
    return <SkeletonTemarioSection />;
  }

  if (!meta) return null;

  return (
    <section
      id={`temario-${uni}`}
      className="scroll-mt-24 font-sans"
      aria-label={`Temario ${meta.nombre}`}
    >
      <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className={uniThemedHeaderBadge(isDark)}>
            <BookMarked className="h-3.5 w-3.5" aria-hidden />
            Temario {meta.nombre} · Convocatoria {meta.convocatoria}
          </span>
          <h2 className="mt-3 text-xl font-black tracking-tight text-foreground md:text-2xl">
            Mapa del examen de ingreso
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {meta.totalReactivos} reactivos · {meta.horasExamen} h · {materias.length} materias
            esperadas.
          </p>
        </div>
        <div className="flex gap-3 text-center text-xs">
          <StatPill label="Materias" value={String(materias.length)} />
          <StatPill label="Temas listos" value="0" muted />
          <StatPill label="Por cargar" value={String(materias.length)} muted />
        </div>
      </header>

      <div
        className={cn(
          'mb-4 flex items-start gap-3 rounded-xl border px-4 py-3',
          isDark
            ? 'border-[hsl(var(--uni-primary)/0.35)] bg-[hsl(var(--uni-primary)/0.08)]'
            : 'border-[hsl(var(--uni-primary)/0.25)] bg-[hsl(var(--uni-primary)/0.05)]'
        )}
      >
        <Construction
          className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--uni-primary))]"
          aria-hidden
        />
        <div>
          <p className="text-sm font-bold text-foreground">Temario en preparación</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Estamos armando el mapa oficial de {meta.nombre}. Mientras tanto, puedes ver las
            materias esperadas y practicar en los módulos de abajo.
          </p>
        </div>
      </div>

      {showDivisionTabs && (
        <div
          className="mb-4 flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/40 p-1 scrollbar-none"
          role="tablist"
          aria-label="Filtrar por división o área"
        >
          {filters.map(({ id, label }) => {
            const active = divisionFilter === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDivisionFilter(id)}
                className={cn(
                  'shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition-all',
                  active
                    ? 'bg-[hsl(var(--uni-primary))] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-2">
        {materias.map((materia, index) => (
          <PlaceholderMateriaRow
            key={materia.id}
            materia={materia}
            uniNombre={meta.nombre}
            pesoRelativo={pesoRelativo}
            index={index}
            expanded={expandedMateria === materia.id}
            onToggle={() =>
              setExpandedMateria((prev) => (prev === materia.id ? null : materia.id))
            }
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {materias.length === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground">
          No hay materias para esta división todavía.
        </p>
      )}
    </section>
  );
}

function StatPill({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <p
        className={cn(
          'text-lg font-black tabular-nums',
          !muted && 'text-[hsl(var(--uni-primary))]',
          muted && 'text-muted-foreground'
        )}
      >
        {value}
      </p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

interface PlaceholderMateriaRowProps {
  materia: TemarioMateriaSummary;
  uniNombre: string;
  pesoRelativo: boolean;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  prefersReducedMotion: boolean;
}

function PlaceholderMateriaRow({
  materia,
  uniNombre,
  pesoRelativo,
  index,
  expanded,
  onToggle,
  prefersReducedMotion,
}: PlaceholderMateriaRowProps) {
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: index * 0.03 }}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">
          {materia.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-foreground">{materia.nombre}</span>
            {materia.reactivosOficiales > 0 && (
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-muted-foreground">
                {pesoRelativo
                  ? `~${materia.reactivosOficiales}% peso estimado`
                  : `${materia.reactivosOficiales} reactivos`}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Temario por definir</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-muted-foreground">
          <Lock className="h-3 w-3" aria-hidden />
          Próximo
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
            expanded && 'rotate-180'
          )}
          aria-hidden
        />
      </button>

      {expanded && (
        <div className="border-t border-border bg-muted/20 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Los subtemas oficiales de {uniNombre} para esta materia se publicarán aquí en cuanto
            estén disponibles.
          </p>
        </div>
      )}
    </motion.div>
  );
}
