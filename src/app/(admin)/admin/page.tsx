import Link from 'next/link';
import { ArrowLeft, GraduationCap, Radio } from 'lucide-react';
import { AdminRoadmap } from '@/components/admin/admin-roadmap';
import { AdminOperationsPanel } from '@/components/admin/AdminOperationsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAdminMetrics } from '@/lib/admin-metrics';

export default async function AdminPage() {
  const metrics = await getAdminMetrics();
  const formatShortDateTime = (iso: string | null) =>
    iso
      ? new Intl.DateTimeFormat('es-MX', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(iso))
      : 'Sin actividad';
  const supabaseDataLabel = metrics.supabase.configured
    ? `${metrics.supabase.totalRows.toLocaleString('es-MX')} registros`
    : 'Supabase no configurado';
  const githubSizeLabel =
    metrics.github.sizeKb !== null
      ? `${(metrics.github.sizeKb / 1024).toFixed(1)} MB`
      : 'Sin dato';
  const githubCommitsLabel =
    metrics.github.commitCount !== null ? metrics.github.commitCount.toLocaleString('es-MX') : 'Sin dato';
  const vercelLabel = metrics.vercel.deployed
    ? `Deploy (${metrics.vercel.env})`
    : 'Entorno local';

  return (
    <div className="min-h-screen bg-mesh">
      <header className="glass-header sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 md:px-8">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-muted-foreground hover:bg-muted"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex flex-1 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                PrepMX Academy
              </p>
              <h1 className="text-lg font-bold leading-tight">Curso de implementación</h1>
            </div>
          </div>
          <Link
            href="/admin/ticker"
            className="hidden rounded-lg border bg-white px-3 py-1.5 text-sm text-muted-foreground hover:text-primary sm:flex sm:items-center sm:gap-1.5"
          >
            <Radio className="h-3.5 w-3.5" />
            Ticker
          </Link>
          <Link
            href="/proyecto"
            className="hidden rounded-lg border bg-white px-3 py-1.5 text-sm text-muted-foreground hover:text-primary sm:block"
          >
            Roadmap público
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <AdminRoadmap />

        <AdminOperationsPanel />

        <section className="mt-16 border-t pt-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Métricas de operación
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Estado real de usuarios, datos y despliegues.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Usuarios',
                desc: 'Tabla users en Supabase',
                value: metrics.supabase.counts.users.toLocaleString('es-MX'),
              },
              {
                title: 'Supabase',
                desc: 'Registros totales almacenados',
                value: supabaseDataLabel,
              },
              {
                title: 'Vercel',
                desc:
                  metrics.vercel.url ??
                  ([metrics.vercel.branch, metrics.vercel.region].filter(Boolean).join(' · ') ||
                    'Sin URL pública'),
                value: vercelLabel,
              },
              {
                title: 'GitHub',
                desc: `${metrics.github.repo} · ~${githubSizeLabel}`,
                value: `${githubCommitsLabel} commits`,
              },
            ].map((m) => (
              <Card key={m.title} className="exam-shell">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {m.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{m.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                title: 'Preguntas',
                value: metrics.supabase.counts.questions.toLocaleString('es-MX'),
              },
              {
                title: 'Progreso',
                value: metrics.supabase.counts.user_progress.toLocaleString('es-MX'),
              },
              {
                title: 'Planes de estudio',
                value: metrics.supabase.counts.study_plans.toLocaleString('es-MX'),
              },
              {
                title: 'Materias únicas',
                value: metrics.supabase.uniqueMaterias.toLocaleString('es-MX'),
              },
              {
                title: 'Universidades',
                value: metrics.supabase.uniqueUniversidades.toLocaleString('es-MX'),
              },
              {
                title: 'Intentos hoy',
                value: metrics.supabase.attemptsToday.toLocaleString('es-MX'),
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-white/70 px-4 py-3 text-sm">
                <p className="text-muted-foreground">{item.title}</p>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Última actividad',
                value: formatShortDateTime(metrics.supabase.lastActivityAt),
                desc: 'user_progress.answered_at',
              },
              {
                title: 'GitHub stars',
                value:
                  metrics.github.stars !== null
                    ? metrics.github.stars.toLocaleString('es-MX')
                    : 'Sin dato',
                desc: 'Popularidad del repositorio',
              },
              {
                title: 'GitHub issues',
                value:
                  metrics.github.openIssues !== null
                    ? metrics.github.openIssues.toLocaleString('es-MX')
                    : 'Sin dato',
                desc: 'Issues/PR abiertos (API)',
              },
              {
                title: 'Watchers',
                value:
                  metrics.github.watchers !== null
                    ? metrics.github.watchers.toLocaleString('es-MX')
                    : 'Sin dato',
                desc:
                  metrics.vercel.commitSha !== null
                    ? `Deploy ${metrics.vercel.commitSha}`
                    : 'Sin SHA de deploy',
              },
            ].map((kpi) => (
              <div key={kpi.title} className="rounded-xl border bg-white/70 px-4 py-3 text-sm">
                <p className="text-muted-foreground">{kpi.title}</p>
                <p className="text-lg font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
