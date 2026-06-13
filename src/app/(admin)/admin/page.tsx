import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { AdminRoadmap } from '@/components/admin/admin-roadmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
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
            href="/proyecto"
            className="hidden rounded-lg border bg-white px-3 py-1.5 text-sm text-muted-foreground hover:text-primary sm:block"
          >
            Roadmap público
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <AdminRoadmap />

        <section className="mt-16 border-t pt-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Métricas de negocio
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Se activan en el Paso 3, cuando haya pagos y usuarios reales.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { title: 'MRR', desc: 'Ingresos mensuales', value: '$0 MXN' },
              { title: 'DAU', desc: 'Usuarios activos al día', value: '0' },
              { title: 'Conversión', desc: 'Gratis → premium', value: '0%' },
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
        </section>
      </main>
    </div>
  );
}
