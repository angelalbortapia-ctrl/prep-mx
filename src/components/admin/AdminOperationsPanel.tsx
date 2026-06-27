'use client';

import Link from 'next/link';
import { ArrowRight, Radio } from 'lucide-react';
import { QuestionMarkdownEditor } from '@/components/admin/QuestionMarkdownEditor';
import { SecurityAlertsPanel } from '@/components/admin/SecurityAlertsPanel';
import { SubscriptionMetricsChart } from '@/components/admin/SubscriptionMetricsChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/** Panel operativo premium (CRUD, métricas SaaS, alertas) — complementa AdminRoadmap. */
export function AdminOperationsPanel() {
  return (
    <div className="mt-16 space-y-10 border-t pt-10">
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Herramientas
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configuración separada por módulo.
        </p>
        <Card className="mt-4 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Radio className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-base">Ticker de admisión</CardTitle>
                <CardDescription>18 diseños, promociones, velocidad y señales en vivo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="gap-2">
              <Link href="/admin/ticker">
                Abrir configuración del ticker
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Gestor de reactivos
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Redacta preguntas en Markdown con preview KaTeX antes de publicar.
        </p>
        <div className="mt-4">
          <QuestionMarkdownEditor />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Suscripciones activas</CardTitle>
            <CardDescription>Desglose por universidad (demo hasta Stripe)</CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionMetricsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas de seguridad</CardTitle>
            <CardDescription>
              Detección de cuentas compartidas por IP/ubicación simultánea
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SecurityAlertsPanel />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
