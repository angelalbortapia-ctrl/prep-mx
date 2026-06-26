'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { BookMarked, ChevronDown, Layers, Lock } from 'lucide-react';
import {
  UNAM_TEMARIO_AREAS,
  UNAM_TEMARIO_MATERIAS,
  UNAM_TEMARIO_META,
  countTemarioTopics,
  filterMateriasByArea,
  type UnamAreaId,
  type UnamTemarioMateria,
  type UnamTemarioTopic,
} from '@/data/unam-temario';
import { studyGuideSlugs } from '@/data/study-guides';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import {
  unamAccent,
  unamAccentLink,
  unamAccentMuted,
  unamGuidePill,
  unamHeaderBadge,
} from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 280, damping: 26 };

type AreaFilter = UnamAreaId | 'todas';

const AREA_FILTERS: { id: AreaFilter; label: string }[] = [
  { id: 'todas', label: 'Todo el examen' },
  ...UNAM_TEMARIO_AREAS.map((a) => ({ id: a.id, label: a.nombre.replace(/^Área \d+ — /, '') })),
];

const availableGuides = new Set(studyGuideSlugs);

interface UnamTemarioSectionProps {
  className?: string;
}

export function UnamTemarioSection({ className }: UnamTemarioSectionProps) {
  const [areaFilter, setAreaFilter] = useState<AreaFilter>('todas');
  const [expandedMateria, setExpandedMateria] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { isDark } = useStudyAppearance();

  const materias = useMemo(() => filterMateriasByArea(areaFilter), [areaFilter]);
  const stats = useMemo(() => countTemarioTopics(materias), [materias]);

  return (
    <section
      id="temario-unam"
      className={cn('scroll-mt-24 font-sans', className)}
      aria-label="Temario oficial UNAM"
    >
      <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className={unamHeaderBadge(isDark)}>
            <BookMarked className="h-3.5 w-3.5" aria-hidden />
            Temario UNAM · Convocatoria {UNAM_TEMARIO_META.convocatoria}
          </span>
          <h2 className="mt-3 text-xl font-black tracking-tight text-foreground md:text-2xl">
            Mapa del examen de ingreso
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {UNAM_TEMARIO_META.totalReactivos} reactivos · {UNAM_TEMARIO_META.horasExamen} h ·{' '}
            {UNAM_TEMARIO_MATERIAS.length} materias oficiales · {stats.publicados} subtemas cargados.
          </p>
        </div>
        <div className="flex gap-3 text-center text-xs">
          <StatPill label="Materias" value={String(materias.length)} isDark={isDark} />
          <StatPill label="Temas listos" value={String(stats.publicados)} accent isDark={isDark} />
          <StatPill label="Por cargar" value={String(stats.pendientes)} muted isDark={isDark} />
        </div>
      </header>

      <div
        className="mb-4 flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/40 p-1 scrollbar-none"
        role="tablist"
        aria-label="Filtrar por área de carrera"
      >
        {AREA_FILTERS.map(({ id, label }) => {
          const active = areaFilter === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setAreaFilter(id)}
              className={cn(
                'shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition-all',
                active
                  ? 'bg-[#002B49] text-[#D4AF37] shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {materias.map((materia, index) => (
          <MateriaTemarioRow
            key={materia.id}
            materia={materia}
            index={index}
            expanded={expandedMateria === materia.id}
            onToggle={() =>
              setExpandedMateria((prev) => (prev === materia.id ? null : materia.id))
            }
            prefersReducedMotion={prefersReducedMotion}
            isDark={isDark}
          />
        ))}
      </div>

      {stats.total === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground">
          <Layers className="mx-auto mb-2 h-4 w-4 opacity-60" aria-hidden />
          Escenario listo. Cuando tengas la lista de temas por materia, se cargarán en esta sección.
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
  isDark,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
  isDark: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <p
        className={cn(
          'text-lg font-black tabular-nums',
          accent && unamAccent(isDark),
          muted && 'text-muted-foreground'
        )}
      >
        {value}
      </p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

interface MateriaTemarioRowProps {
  materia: UnamTemarioMateria;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  prefersReducedMotion: boolean;
  isDark: boolean;
}

function countMateriaLeaves(topics: UnamTemarioTopic[]): { total: number; publicados: number } {
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
  index,
  expanded,
  onToggle,
  prefersReducedMotion,
  isDark,
}: MateriaTemarioRowProps) {
  const hasGuide = availableGuides.has(materia.id);
  const leafCounts = countMateriaLeaves(materia.topics);
  const topicCount = leafCounts.total;
  const publishedCount = leafCounts.publicados;

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
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-muted-foreground">
              {materia.reactivosOficiales} reactivos
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {topicCount === 0
              ? 'Temario por definir'
              : `${publishedCount}/${topicCount} temas publicados`}
          </p>
        </div>
        {hasGuide ? (
          <Link
            href={`/dashboard/estudio/guia/${materia.id}`}
            onClick={(e) => e.stopPropagation()}
            className={unamGuidePill(isDark)}
          >
            Guía
          </Link>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-muted-foreground">
            <Lock className="h-3 w-3" aria-hidden />
            Próximo
          </span>
        )}
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
            <p className="text-sm text-muted-foreground">
              Sin temas cargados aún. Esta materia aparecerá aquí con su lista oficial en cuanto la
              compartas.
            </p>
          ) : (
            <ol className="space-y-1">
              {materia.topics.map((topic) => (
                <TopicTree
                  key={topic.id}
                  topic={topic}
                  depth={0}
                  isDark={isDark}
                  materiaId={materia.id}
                />
              ))}
            </ol>
          )}
        </div>
      )}
    </motion.div>
  );
}

interface TopicTreeProps {
  topic: UnamTemarioTopic;
  depth: number;
  isDark: boolean;
  materiaId: string;
}

function TopicTree({ topic, depth, isDark, materiaId }: TopicTreeProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(topic.children?.length);
  const isLeaf = !hasChildren;
  const longDescription = (topic.descripcion?.length ?? 0) > 160;
  const showExpand = isLeaf && longDescription;

  return (
    <li
      className={cn(
        'rounded-lg border border-border/60 bg-background',
        depth > 0 && 'ml-3 border-l-2 border-l-[#002B49]/15'
      )}
    >
      <div
        className={cn(
          'flex items-start justify-between gap-2 px-3 py-2',
          depth === 0 && 'text-sm',
          depth === 1 && 'text-sm',
          depth >= 2 && 'text-xs'
        )}
        style={{ paddingLeft: depth > 0 ? `${12 + depth * 8}px` : undefined }}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {topic.codigo ? (
              <span className={cn('shrink-0 font-mono text-[10px] font-bold tabular-nums', unamAccentMuted(isDark))}>
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
              className={cn('mt-1 text-[10px]', unamAccentLink(isDark))}
            >
              {expanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
        {topic.guideSlug && availableGuides.has(topic.guideSlug) ? (
          <Link
            href={`/dashboard/estudio/guia/${topic.guideSlug}`}
            className={cn('shrink-0 text-xs font-bold', unamAccent(isDark))}
          >
            Estudiar
          </Link>
        ) : isLeaf ? (
          <span className="shrink-0 text-[10px] font-semibold uppercase text-muted-foreground">
            {topic.status === 'publicado' ? 'Listo' : 'Pendiente'}
          </span>
        ) : null}
      </div>
      {hasChildren && (
        <ol className="space-y-1 pb-2">
          {topic.children!.map((child) => (
            <TopicTree key={child.id} topic={child} depth={depth + 1} isDark={isDark} materiaId={materiaId} />
          ))}
        </ol>
      )}
    </li>
  );
}
