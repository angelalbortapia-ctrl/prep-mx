'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookMarked, ChevronDown, Layers } from 'lucide-react';
import {
  UAM_APTITUD_MATERIAS,
  UAM_TEMARIO_DIVISIONS,
  UAM_TEMARIO_META,
  UAM_TRONCO_MATERIAS,
  filterUamMateriasByDivision,
  getUamTemarioDivision,
  type UamDivisionFilter,
} from '@/data/uam-temario';
import { countTemarioTopics, type TemarioMateria, type TemarioTopic } from '@/data/temario-registry';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { uniThemedHeaderBadge } from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 280, damping: 26 };

const DIVISION_FILTERS: { id: UamDivisionFilter; label: string }[] = [
  { id: 'todas', label: 'Todo el examen' },
  ...UAM_TEMARIO_DIVISIONS.map((d) => ({
    id: d.id,
    label: d.nombre.replace(/^(CBI|CBS|CSH|CAD|CNI|CCD) — /, ''),
  })),
];

interface UamTemarioSectionProps {
  className?: string;
}

export function UamTemarioSection({ className }: UamTemarioSectionProps) {
  const [divisionFilter, setDivisionFilter] = useState<UamDivisionFilter>('cbi');
  const [expandedMateria, setExpandedMateria] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { isDark } = useStudyAppearance();

  const materias = useMemo(() => filterUamMateriasByDivision(divisionFilter), [divisionFilter]);
  const troncoIds = useMemo(() => new Set(UAM_TRONCO_MATERIAS.map((m) => m.id)), []);
  const stats = useMemo(() => countTemarioTopics(materias), [materias]);

  const activeDivision =
    divisionFilter !== 'todas' ? getUamTemarioDivision(divisionFilter) : null;

  return (
    <section
      id="temario-uam"
      className={cn('scroll-mt-24 font-sans', className)}
      aria-label="Temario oficial UAM"
    >
      <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className={uniThemedHeaderBadge(isDark)}>
            <BookMarked className="h-3.5 w-3.5" aria-hidden />
            Temario UAM · Convocatoria {UAM_TEMARIO_META.convocatoria}
          </span>
          <h2 className="mt-3 text-xl font-black tracking-tight text-foreground md:text-2xl">
            Mapa del examen de ingreso
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {UAM_TEMARIO_META.totalReactivos} reactivos · {UAM_TEMARIO_META.horasExamen} h · examen
            digital desde casa · {stats.publicados} subtemas cargados.
          </p>
        </div>
        <div className="flex gap-3 text-center text-xs">
          <StatPill label="Materias" value={String(materias.length)} />
          <StatPill label="Temas listos" value={String(stats.publicados)} accent />
          <StatPill label="Por cargar" value={String(stats.pendientes)} muted />
        </div>
      </header>

      <div
        className="mb-4 flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/40 p-1 scrollbar-none"
        role="tablist"
        aria-label="Filtrar por división académica"
      >
        {DIVISION_FILTERS.map(({ id, label }) => {
          const active = divisionFilter === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setDivisionFilter(id);
                setExpandedMateria(null);
              }}
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

      {divisionFilter === 'todas' && (
        <p className="mb-4 rounded-xl border border-dashed border-[hsl(var(--uni-primary)/0.3)] bg-[hsl(var(--uni-primary)/0.05)] px-4 py-3 text-xs text-muted-foreground">
          Vista general: solo el <strong className="text-foreground">tronco común de aptitud</strong>{' '}
          (~40 %). Elige tu división (CBI, CBS, CSH…) para ver los conocimientos específicos de tu
          carrera.
        </p>
      )}

      {activeDivision?.cuajimalpaOnly && (
        <p className="mb-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
          División exclusiva del campus <strong className="text-foreground">Cuajimalpa</strong>.
          El tronco común de aptitud aplica igual para todas las divisiones.
        </p>
      )}

      <div className="mb-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Tronco común — Aptitud (~40 %)
        </p>
      </div>

      <div className="space-y-2">
        {materias.map((materia, index) => {
          const isTronco = troncoIds.has(materia.id);
          const showDivisionHeader = !isTronco && index === UAM_APTITUD_MATERIAS.length;

          return (
            <div key={materia.id}>
              {showDivisionHeader && divisionFilter === 'todas' && (
                <p className="mb-2 mt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Secciones por división
                </p>
              )}
              {showDivisionHeader && divisionFilter !== 'todas' && activeDivision && (
                <p className="mb-2 mt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {activeDivision.nombre} (~60 %)
                </p>
              )}
              <MateriaTemarioRow
                materia={materia}
                isTronco={isTronco}
                index={index}
                expanded={expandedMateria === materia.id}
                onToggle={() =>
                  setExpandedMateria((prev) => (prev === materia.id ? null : materia.id))
                }
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          );
        })}
      </div>

      {stats.total === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground">
          <Layers className="mx-auto mb-2 h-4 w-4 opacity-60" aria-hidden />
          Sin subtemas cargados aún para UAM.
        </p>
      )}
    </section>
  );
}

function StatPill({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <p
        className={cn(
          'text-lg font-black tabular-nums',
          accent && 'text-[hsl(var(--uni-primary))]',
          !accent && !muted && 'text-[hsl(var(--uni-primary))]',
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

interface MateriaTemarioRowProps {
  materia: TemarioMateria;
  isTronco: boolean;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  prefersReducedMotion: boolean;
}

function countMateriaLeaves(topics: TemarioTopic[]): { total: number; publicados: number } {
  let total = 0;
  let publicados = 0;
  for (const topic of topics) {
    if (topic.children?.length) {
      const nested = countMateriaLeaves(topic.children);
      total += nested.total;
      publicados += nested.publicados;
    } else {
      total += 1;
      if (topic.status === 'publicado') publicados += 1;
    }
  }
  return { total, publicados };
}

function MateriaTemarioRow({
  materia,
  isTronco,
  index,
  expanded,
  onToggle,
  prefersReducedMotion,
}: MateriaTemarioRowProps) {
  const leafCounts = countMateriaLeaves(materia.topics);
  const topicCount = leafCounts.total;
  const publishedCount = leafCounts.publicados;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: index * 0.03 }}
      className={cn(
        'overflow-hidden rounded-xl border bg-card',
        isTronco ? 'border-[hsl(var(--uni-primary)/0.25)]' : 'border-border'
      )}
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
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-muted-foreground">
              {materia.reactivosOficiales} reactivos
            </span>
            {isTronco && (
              <span className="rounded-md bg-[hsl(var(--uni-primary)/0.12)] px-1.5 py-0.5 text-[10px] font-bold text-[hsl(var(--uni-primary))]">
                Tronco común
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {topicCount === 0
              ? 'Temario por definir'
              : `${publishedCount}/${topicCount} temas publicados`}
          </p>
        </div>
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
          {materia.topics.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin temas cargados aún.</p>
          ) : (
            <ol className="space-y-1">
              {materia.topics.map((topic) => (
                <TopicTree key={topic.id} topic={topic} depth={0} />
              ))}
            </ol>
          )}
        </div>
      )}
    </motion.div>
  );
}

function TopicTree({ topic, depth }: { topic: TemarioTopic; depth: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(topic.children?.length);
  const isLeaf = !hasChildren;
  const longDescription = (topic.descripcion?.length ?? 0) > 160;
  const showExpand = isLeaf && longDescription;

  return (
    <li
      className={cn(
        'rounded-lg border border-border/60 bg-background',
        depth > 0 && 'ml-3 border-l-2 border-l-[hsl(var(--uni-primary)/0.15)]'
      )}
    >
      <div
        className={cn(
          'flex items-start justify-between gap-2 px-3 py-2',
          depth >= 2 && 'text-xs',
          depth < 2 && 'text-sm'
        )}
        style={{ paddingLeft: depth > 0 ? `${12 + depth * 8}px` : undefined }}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {topic.codigo ? (
              <span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-[hsl(var(--uni-primary)/0.8)]">
                {topic.codigo}
              </span>
            ) : (
              <span className="shrink-0 tabular-nums text-muted-foreground">{topic.orden}.</span>
            )}
            <span
              className={cn(
                'font-medium text-foreground',
                hasChildren && depth === 0 && 'text-sm font-bold',
                hasChildren && depth === 1 && 'text-sm font-semibold'
              )}
            >
              {topic.titulo}
            </span>
          </div>
          {isLeaf && topic.descripcion && (
            <p
              className={cn(
                'mt-1 text-muted-foreground',
                depth >= 2 ? 'text-[11px] leading-relaxed' : 'text-xs leading-relaxed',
                !expanded && 'line-clamp-3'
              )}
            >
              {topic.descripcion}
            </p>
          )}
          {showExpand && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-1 text-[10px] font-semibold text-[hsl(var(--uni-primary))] hover:underline"
            >
              {expanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
        {isLeaf && (
          <span className="shrink-0 text-[10px] font-semibold uppercase text-muted-foreground">
            {topic.status === 'publicado' ? 'Listo' : 'Pendiente'}
          </span>
        )}
      </div>
      {hasChildren && (
        <ol className="space-y-1 pb-2">
          {topic.children!.map((child) => (
            <TopicTree key={child.id} topic={child} depth={depth + 1} />
          ))}
        </ol>
      )}
    </li>
  );
}
