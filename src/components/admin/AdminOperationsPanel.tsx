'use client';

import { QuestionMarkdownEditor } from '@/components/admin/QuestionMarkdownEditor';
import { SecurityAlertsPanel } from '@/components/admin/SecurityAlertsPanel';
import { SubscriptionMetricsChart } from '@/components/admin/SubscriptionMetricsChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/** Panel operativo premium (CRUD, métricas SaaS, alertas) — complementa AdminRoadmap. */
export function AdminOperationsPanel() {
  return (
    <div className="mt-16 space-y-10 border-t pt-10">
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
