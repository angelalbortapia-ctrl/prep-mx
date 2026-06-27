'use client';

import Link from 'next/link';
import { STUDY_TOOLS } from '@/data/study-tools/tools-meta';
import { CyberCard } from '@/components/ui/cyber-card';
import { cn } from '@/lib/utils';

export function ToolsHubGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STUDY_TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <Link key={tool.id} href={tool.href} className="group block h-full">
            <CyberCard className="flex h-full flex-col p-5 transition-transform group-hover:-translate-y-0.5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                {tool.tag ? (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {tool.tag}
                  </span>
                ) : null}
              </div>
              <h2 className="text-base font-bold">{tool.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{tool.description}</p>
              <span className="mt-4 text-xs font-semibold text-primary group-hover:underline">
                Abrir herramienta →
              </span>
            </CyberCard>
          </Link>
        );
      })}
    </div>
  );
}

export function ToolsHubIntro() {
  return (
    <p className={cn('max-w-2xl text-sm text-muted-foreground')}>
      Calculadoras, juegos y referencias rápidas para preparar el examen en el metro, en casa o entre
      simulacros. Cada herramienta usa datos del temario PrepMX.
    </p>
  );
}
