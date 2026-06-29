'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { LandingTemarioBlock } from '@/lib/temario/landing-display';
import type { UniId } from '@/lib/uni-theme-config';
import { LandingContainer } from '@/components/marketing/LandingContainer';
import {
  landingSection,
  landingSectionHeader,
  landingSectionLead,
  landingSectionTitle,
} from '@/lib/landing-typography';
import { cn } from '@/lib/utils';

const springTransition = { type: 'spring' as const, stiffness: 280, damping: 26 };

interface OfficialQuestionBankSectionProps {
  catalog: LandingTemarioBlock[];
  effectiveUniId: UniId;
}

function TemarioUniBlock({ block }: { block: LandingTemarioBlock }) {
  const defaultOpen = block.materias.slice(0, 1).map((m) => `${block.uniId}-${m.id}`);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary" className="font-semibold">
          {block.nombre}
        </Badge>
        <span>{block.convocatoria}</span>
        <span aria-hidden>·</span>
        <span>{block.totalReactivos} reactivos oficiales</span>
      </div>
      <p className="text-xs text-muted-foreground">{block.fuente}</p>

      <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
        {block.materias.map((materia) => (
          <AccordionItem key={materia.id} value={`${block.uniId}-${materia.id}`}>
            <AccordionTrigger className="text-left text-sm text-foreground hover:no-underline sm:text-base">
              <span className="flex min-w-0 flex-1 items-center gap-2 pr-2 sm:gap-3">
                <span className="shrink-0 text-lg sm:text-xl" aria-hidden>
                  {materia.icon}
                </span>
                <span className="flex min-w-0 flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-2">
                  <span className="break-words">{materia.nombre}</span>
                  <Badge variant="outline" className="shrink-0 text-[10px] font-normal text-muted-foreground sm:text-xs">
                    {materia.reactivosOficiales} reactivos
                  </Badge>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {materia.hasTopics ? (
                <ul className="space-y-4 pl-1">
                  {materia.topicGroups.map((group) => (
                    <li key={`${materia.id}-${group.codigo ?? group.titulo}`}>
                      <p className="font-medium text-foreground">
                        {group.codigo ? (
                          <span className="mr-2 font-mono text-xs text-muted-foreground">
                            {group.codigo}
                          </span>
                        ) : null}
                        {group.titulo}
                      </p>
                      {group.subtemas.length > 0 ? (
                        <ul className="mt-2 space-y-1 border-l border-border pl-4">
                          {group.subtemas.map((sub) => (
                            <li
                              key={`${group.titulo}-${sub.codigo ?? sub.titulo}`}
                              className="text-sm text-muted-foreground"
                            >
                              {sub.codigo ? (
                                <span className="mr-1.5 font-mono text-[11px] text-muted-foreground/80">
                                  {sub.codigo}
                                </span>
                              ) : null}
                              {sub.titulo}
                            </li>
                          ))}
                          {group.moreSubtemas ? (
                            <li className="text-xs italic text-muted-foreground">
                              +{group.moreSubtemas} subtemas más en el banco
                            </li>
                          ) : null}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Temario detallado en preparación; las preguntas siguen alineadas al examen
                  oficial de {block.nombre}.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function OfficialQuestionBankSection({
  catalog,
  effectiveUniId,
}: OfficialQuestionBankSectionProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const blocks = useMemo(() => {
    if (effectiveUniId === 'todos') return catalog;
    return catalog.filter((block) => block.uniId === effectiveUniId);
  }, [catalog, effectiveUniId]);

  return (
    <section id="temario-oficial" className={cn(landingSection)}>
      <LandingContainer className="max-w-3xl">
        <motion.div
          className={landingSectionHeader}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springTransition}
        >
          <h2 className={landingSectionTitle}>¿Qué incluye nuestro banco de preguntas?</h2>
          <p className={landingSectionLead}>
            Temario oficial desglosado por materia. No son preguntas genéricas: cada reactivo
            sigue la estructura de la convocatoria.
          </p>
        </motion.div>

        <div className={cn(blocks.length > 1 && 'space-y-14 md:space-y-16')}>
          {blocks.map((block) => (
            <TemarioUniBlock key={block.uniId} block={block} />
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
