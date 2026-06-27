'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { BookMarked, ChevronDown, Layers, Lock } from 'lucide-react';
import {
  countTemarioTopics,
  getTemarioForUni,
  type TemarioMateria,
  type TemarioTopic,
  type TemarioUniId,
} from '@/data/temario-registry';
import { studyGuideSlugs } from '@/data/study-guides';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { uniThemedHeaderBadge } from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 280, damping: 26 };
const availableGuides = new Set(studyGuideSlugs);

interface TemarioMateriasSectionProps {
  uni: TemarioUniId;
  className?: string;
}

/** Vista de temario expandible para cualquier universidad con datos cargados. */
export function TemarioMateriasSection({ uni, className }: TemarioMateriasSectionProps) {
  const [expandedMateria, setExpandedMateria] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { isDark } = useStudyAppearance();
  const { meta, materias } = useMemo(() => getTemarioForUni(uni), [uni]);
  const stats = useMemo(() => countTemarioTopics(materias), [materias]);
  const materiasSinTemario = useMemo(
    () => materias.filter((m) => m.topics.length === 0).length,
    [materias]
  );

  useEffect(() => {
    setExpandedMateria(null);
  }, [uni]);

  return (
    <section
      id={`temario-${uni}`}
      className={cn('scroll-mt-24 font-sans', className)}
      aria-label={`Temario oficial ${meta.nombre}`}
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
            {meta.totalReactivos} reactivos · {meta.horasExamen} h · {materias.length} materias ·{' '}
            {stats.publicados} subtemas cargados.
          </p>
        </div>
        <div className="flex gap-3 text-center text-xs">
          <StatPill label="Materias" value={String(materias.length)} />
          <StatPill label="Temas listos" value={String(stats.publicados)} accent />
          <StatPill
            label="Por cargar"
            value={String(stats.pendientes + materiasSinTemario)}
            muted
          />
        </div>
      </header>

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
            showGuides={uni === 'unam'}
          />
        ))}
      </div>

      {stats.total === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground">
          <Layers className="mx-auto mb-2 h-4 w-4 opacity-60" aria-hidden />
          Sin subtemas cargados aún para {meta.nombre}.
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
  index: number;
  expanded: boolean;
  onToggle: () => void;
  prefersReducedMotion: boolean;
  isDark: boolean;
  showGuides: boolean;
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
  index,
  expanded,
  onToggle,
  prefersReducedMotion,
  isDark,
  showGuides,
}: MateriaTemarioRowProps) {
  const hasGuide = showGuides && availableGuides.has(materia.id);
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
            className={cn(
              'shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-colors',
              isDark
                ? 'border-[hsl(var(--uni-accent)/0.25)] bg-[hsl(var(--uni-primary)/0.2)] text-[hsl(var(--uni-accent))]'
                : 'border-[hsl(var(--uni-primary)/0.2)] bg-[hsl(var(--uni-primary)/0.05)] text-[hsl(var(--uni-primary))]'
            )}
          >
            Guía
          </Link>
        ) : topicCount === 0 ? (
          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-muted-foreground">
            <Lock className="h-3 w-3" aria-hidden />
            Próximo
          </span>
        ) : null}
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
                <TopicTree key={topic.id} topic={topic} depth={0} showGuides={showGuides} />
              ))}
            </ol>
          )}
        </div>
      )}
    </motion.div>
  );
}

interface TopicTreeProps {
  topic: TemarioTopic;
  depth: number;
  showGuides: boolean;
}

function TopicTree({ topic, depth, showGuides }: TopicTreeProps) {
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
          depth === 0 && 'text-sm',
          depth === 1 && 'text-sm',
          depth >= 2 && 'text-xs'
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
        {topic.guideSlug && showGuides && availableGuides.has(topic.guideSlug) ? (
          <Link
            href={`/dashboard/estudio/guia/${topic.guideSlug}`}
            className="shrink-0 text-xs font-bold text-[hsl(var(--uni-primary))]"
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
            <TopicTree key={child.id} topic={child} depth={depth + 1} showGuides={showGuides} />
          ))}
        </ol>
      )}
    </li>
  );
}
