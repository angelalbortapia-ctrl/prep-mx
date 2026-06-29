import { Suspense } from 'react';
import { SimuladorGratisView } from '@/components/exam/SimuladorGratisView';
import { PageShell } from '@/components/layout/PageShell';

/** Pública — sin Supabase ni Clerk. Preguntas en cliente desde src/data. */
export default function SimuladorGratisPage() {
  return (
    <PageShell size="narrow">
      <Suspense fallback={<div className="h-32 animate-pulse rounded-3xl bg-muted" />}>
        <SimuladorGratisView />
      </Suspense>
    </PageShell>
  );
}
