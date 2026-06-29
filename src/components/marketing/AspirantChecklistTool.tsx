'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckSquare,
  ClipboardCheck,
  Download,
  GraduationCap,
  Mail,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  buildAspirantChecklist,
  careerDiagnosticUni,
  formatCareerLabel,
  getChecklistCareerOptions,
  getEmphasisMateriaIds,
  type AspirantChecklistData,
} from '@/lib/temario/aspirant-checklist';
import { downloadChecklistDocument } from '@/lib/temario/checklist-pdf';
import { buildJourneyHref } from '@/lib/journey-links';
import { landingCtaLink } from '@/lib/landing-cta';
import {
  landingSection,
  landingSectionHeader,
  landingSectionInner,
  landingSectionLead,
  landingSectionTitle,
} from '@/lib/landing-typography';
import { cn } from '@/lib/utils';
import type { Universidad } from '@/types/user-profile';

const FEATURED_CAREER_IDS = [
  'unam-med-cu',
  'ipn-med-esm',
  'uam-med-xoch',
  'unam-cc',
  'ipn-sistemas',
  'unam-derecho-cu',
] as const;

const PENDING_DOWNLOAD_KEY = 'prepmx-checklist-pending-download';
const CHECKLIST_STORAGE_PREFIX = 'prepmx-checklist-checked-';

const UNI_TABS: { id: Universidad | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'unam', label: 'UNAM' },
  { id: 'ipn', label: 'IPN' },
  { id: 'uam', label: 'UAM' },
];

function loadChecked(careerId: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(`${CHECKLIST_STORAGE_PREFIX}${careerId}`);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set();
  }
}

function saveChecked(careerId: string, ids: Set<string>) {
  try {
    localStorage.setItem(
      `${CHECKLIST_STORAGE_PREFIX}${careerId}`,
      JSON.stringify(Array.from(ids))
    );
  } catch {
    /* best-effort */
  }
}

interface AspirantChecklistToolProps {
  variant?: 'page' | 'landing';
  initialCareerId?: string;
}

export function AspirantChecklistTool({
  variant = 'landing',
  initialCareerId = 'unam-med-cu',
}: AspirantChecklistToolProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  const careers = useMemo(() => getChecklistCareerOptions(), []);
  const [uniFilter, setUniFilter] = useState<Universidad | 'todas'>('todas');
  const [careerId, setCareerId] = useState(initialCareerId);
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const [showLeadPanel, setShowLeadPanel] = useState(false);

  const checklist = useMemo(() => buildAspirantChecklist(careerId), [careerId]);
  const emphasisIds = useMemo(
    () => (checklist ? getEmphasisMateriaIds(checklist.career) : new Set<string>()),
    [checklist]
  );

  const filteredCareers = useMemo(() => {
    if (uniFilter === 'todas') return careers;
    return careers.filter((c) => c.universidad === uniFilter);
  }, [careers, uniFilter]);

  useEffect(() => {
    setChecked(loadChecked(careerId));
  }, [careerId]);

  const leafIds = useMemo(() => {
    if (!checklist) return [];
    return checklist.materias.flatMap((m) => m.topics.filter((t) => t.isLeaf).map((t) => t.id));
  }, [checklist]);

  const progressPct =
    leafIds.length > 0
      ? Math.round(
          (Array.from(checked).filter((id) => leafIds.includes(id)).length / leafIds.length) * 100
        )
      : 0;

  const toggleTopic = useCallback(
    (topicId: string) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(topicId)) next.delete(topicId);
        else next.add(topicId);
        saveChecked(careerId, next);
        return next;
      });
    },
    [careerId]
  );

  const runDownload = useCallback(() => {
    if (!checklist) return;
    downloadChecklistDocument(checklist, checked);
    const uni = careerDiagnosticUni(checklist.career);
    router.push(
      buildJourneyHref('/simulador-gratis', {
        uni,
        plan: 'universidad',
        extra: { freemium: 'diagnostico', from: 'checklist' },
      })
    );
  }, [checklist, checked, router]);

  const handleDownloadClick = useCallback(() => {
    if (!checklist) return;
    if (!isLoaded) return;

    if (!isSignedIn) {
      sessionStorage.setItem(PENDING_DOWNLOAD_KEY, careerId);
      setShowLeadPanel(true);
      return;
    }
    runDownload();
  }, [checklist, isLoaded, isSignedIn, careerId, runDownload]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const pending = sessionStorage.getItem(PENDING_DOWNLOAD_KEY);
    if (pending && pending === careerId && checklist) {
      sessionStorage.removeItem(PENDING_DOWNLOAD_KEY);
      setShowLeadPanel(false);
      runDownload();
    }
  }, [isLoaded, isSignedIn, careerId, checklist, runDownload]);

  const shellClass =
    variant === 'page'
      ? 'mx-auto max-w-3xl px-4 py-10'
      : cn(landingSection, landingSectionInner);

  return (
    <section id="checklist" className={shellClass}>
      <div className={variant === 'landing' ? landingSectionHeader : 'mb-8 text-center'}>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Lead magnet · Gratis</p>
        <h2 className={variant === 'landing' ? landingSectionTitle : 'text-3xl font-black tracking-tight'}>
          El Checklist del Aspirante
        </h2>
        <p className={variant === 'landing' ? landingSectionLead : 'mt-2 text-muted-foreground'}>
          Elige tu carrera y marca subtemas del temario oficial. Sin registro para explorar — descarga el PDF con tu
          correo y mide tu nivel en 10 preguntas.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8">
        <div className="flex flex-wrap gap-2">
          {UNI_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setUniFilter(tab.id)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors',
                uniFilter === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FEATURED_CAREER_IDS.map((id) => {
            const c = careers.find((x) => x.id === id);
            if (!c) return null;
            if (uniFilter !== 'todas' && c.universidad !== uniFilter) return null;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCareerId(id)}
                className={cn(
                  'rounded-xl border px-3 py-1.5 text-left text-xs transition-colors',
                  careerId === id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border hover:border-primary/40'
                )}
              >
                {c.name} · {c.universidad.toUpperCase()}
              </button>
            );
          })}
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium text-foreground">Carrera objetivo</span>
          <select
            value={careerId}
            onChange={(e) => setCareerId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
          >
            {filteredCareers.map((c) => (
              <option key={c.id} value={c.id}>
                {formatCareerLabel(c)}
              </option>
            ))}
          </select>
        </label>

        {checklist ? (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" aria-hidden />
              <Badge variant="secondary">{checklist.universidad.toUpperCase()}</Badge>
              <span>Convocatoria {checklist.convocatoria}</span>
              <span aria-hidden>·</span>
              <span>{checklist.stats.totalTopics} subtemas</span>
              {checklist.areaLabel ? (
                <>
                  <span aria-hidden>·</span>
                  <span>Énfasis: {checklist.areaLabel}</span>
                </>
              ) : null}
            </div>

            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Tu progreso</span>
                <span className="text-foreground">{progressPct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  initial={false}
                  animate={{ width: `${progressPct}%` }}
                  transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            <div className="mt-6 max-h-[min(52vh,28rem)] space-y-6 overflow-y-auto pr-1">
              {checklist.materias.map((materia) => (
                <div key={materia.id}>
                  <div className="sticky top-0 z-[1] flex items-center gap-2 border-b border-border bg-card/95 py-2 backdrop-blur-sm">
                    <span className="text-lg" aria-hidden>
                      {materia.icon}
                    </span>
                    <h3 className="font-bold text-foreground">{materia.nombre}</h3>
                    {emphasisIds.has(materia.id) ? (
                      <Badge className="bg-amber-500/15 text-amber-800 hover:bg-amber-500/15 dark:text-amber-200">
                        Clave para tu carrera
                      </Badge>
                    ) : null}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {materia.reactivosOficiales} reactivos
                    </span>
                  </div>

                  <ul className="mt-2 space-y-1">
                    {materia.topics.map((topic) => {
                      if (!topic.isLeaf) {
                        return (
                          <li
                            key={topic.id}
                            className="pt-2 text-sm font-semibold text-foreground"
                            style={{ paddingLeft: `${topic.depth * 0.75}rem` }}
                          >
                            {topic.codigo ? (
                              <span className="mr-2 font-mono text-xs text-muted-foreground">{topic.codigo}</span>
                            ) : null}
                            {topic.titulo}
                          </li>
                        );
                      }

                      const isChecked = checked.has(topic.id);
                      return (
                        <li key={topic.id} style={{ paddingLeft: `${topic.depth * 0.75 + 0.25}rem` }}>
                          <button
                            type="button"
                            onClick={() => toggleTopic(topic.id)}
                            className={cn(
                              'flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted/60',
                              isChecked && 'bg-primary/5'
                            )}
                          >
                            {isChecked ? (
                              <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            ) : (
                              <Square className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <span className="min-w-0 flex-1">
                              {topic.codigo ? (
                                <span className="mr-2 font-mono text-xs text-muted-foreground">{topic.codigo}</span>
                              ) : null}
                              <span className={cn(isChecked && 'text-muted-foreground line-through')}>
                                {topic.titulo}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t border-border pt-6">
              {showLeadPanel && !isSignedIn ? (
                <div className="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 text-center dark:border-violet-900/50 dark:bg-violet-950/30">
                  <Mail className="mx-auto h-8 w-8 text-violet-600 dark:text-violet-400" aria-hidden />
                  <p className="mt-2 font-bold text-foreground">Deja tu correo para descargar</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Registro gratis con Clerk. Te abrimos el PDF imprimible y el diagnóstico de 10 preguntas.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <SignUpButton mode="modal">
                      <Button type="button" variant="conversion" size="default">
                        Crear cuenta y descargar
                      </Button>
                    </SignUpButton>
                    <SignInButton mode="modal" forceRedirectUrl="/checklist">
                      <Button type="button" variant="outline" size="default">
                        Ya tengo cuenta
                      </Button>
                    </SignInButton>
                  </div>
                </div>
              ) : null}

              <Button
                type="button"
                variant="conversion"
                size="cta"
                className="w-full sm:w-auto"
                onClick={handleDownloadClick}
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar temario en PDF y medir mi nivel gratis
              </Button>

              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <ClipboardCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                {checklist.fuente}
              </p>
            </div>
          </>
        ) : null}
      </div>

      {variant === 'page' ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className={cn('font-semibold underline-offset-4 hover:underline', landingCtaLink)}>
            Volver a PrepMX
          </Link>
        </p>
      ) : null}
    </section>
  );
}
