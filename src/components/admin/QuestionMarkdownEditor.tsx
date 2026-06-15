'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const PreviewMarkdown = dynamic(
  () => import('@/components/study/GuiaMarkdown').then((m) => m.default),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">Cargando preview…</p> }
);

const DRAFT_KEY = 'prepmx-admin-question-draft';

/**
 * CRUD demo de reactivos en Markdown con live preview KaTeX (split screen).
 * Persiste borrador en localStorage hasta conectar Supabase admin API.
 */
export function QuestionMarkdownEditor({ className }: { className?: string }) {
  const [titulo, setTitulo] = useState('');
  const [markdown, setMarkdown] = useState(() => {
    if (typeof window === 'undefined') return sampleDraft;
    return localStorage.getItem(DRAFT_KEY) ?? sampleDraft;
  });

  function saveDraft() {
    localStorage.setItem(DRAFT_KEY, markdown);
  }

  return (
    <div className={cn('grid gap-4 lg:grid-cols-2', className)}>
      <div className="space-y-3 rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Editor de reactivo</h3>
          <Button type="button" size="sm" variant="outline" onClick={saveDraft}>
            <Save className="mr-1 h-4 w-4" />
            Guardar borrador
          </Button>
        </div>
        <Input
          placeholder="Título del reactivo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="min-h-[320px] w-full rounded-xl border bg-background p-3 font-mono text-sm"
          spellCheck={false}
        />
      </div>
      <div className="space-y-3 rounded-2xl border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Eye className="h-4 w-4" />
          Live Preview
        </div>
        {titulo && <p className="font-bold">{titulo}</p>}
        <PreviewMarkdown content={markdown} />
      </div>
    </div>
  );
}

const sampleDraft = `## Pregunta de ejemplo

Resuelve $x^2 - 5x + 6 = 0$ usando la fórmula general.

> Muchos eligen $x = 2$ y $x = 4$ por confundir el signo de $b$.

\`\`\`
Tip: primero verifica si factoriza (2)(3)=6
\`\`\`
`;
