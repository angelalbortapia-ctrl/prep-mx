'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { CyberCard } from '@/components/ui/cyber-card';
import { Badge } from '@/components/ui/badge';
import { AcceptanceGauge } from '@/components/profile/AcceptanceGauge';
import { BanquilloPanel } from '@/components/bookmarks/BanquilloPanel';
import { ConsistencyHeatmap } from '@/components/profile/ConsistencyHeatmap';
import { StudentGarageHeader } from '@/components/profile/StudentGarageHeader';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { areaLabels } from '@/types/user-profile';

export default function PerfilPage() {
  const { label: planLabel } = useSubscription();
  const { entry } = useUniTheme();
  const { data: profile } = useUserProfile();
  const averageScore = profile?.averageScore ?? 82;

  return (
    <div className="space-y-6 font-sans pb-24 md:pb-8">
      <PageHeader title="Mi perfil" description="Telemetría adaptativa de tu postulación." />

      <StudentGarageHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <CyberCard className="p-6">
          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-zinc-400">
            Probabilidad de aceptación
          </h3>
          <AcceptanceGauge averageScore={averageScore} />
        </CyberCard>

        <CyberCard className="p-6">
          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-zinc-400">
            Consistencia de estudio
          </h3>
          <ConsistencyHeatmap />
        </CyberCard>
      </div>

      <BanquilloPanel />

      <CyberCard className="p-6">
        <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-zinc-400">Meta de examen</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Universidad activa</span>
            <Badge className="border-zinc-700 bg-zinc-900 text-zinc-200">{entry.shortLabel}</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Área</span>
            <span className="font-bold text-zinc-200">{areaLabels.area2}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Línea de corte meta</span>
            <span className="font-bold text-zinc-200">{entry.cutoffScore} aciertos</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Plan activo</span>
            <Badge variant="secondary" className="border-zinc-700 bg-zinc-900 text-zinc-300">
              {planLabel}
            </Badge>
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-2 h-11 w-full rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-[hsl(var(--uni-primary))] hover:bg-zinc-950"
          >
            <Link href={profile?.authenticated ? '/onboarding' : '/sign-up?redirect_url=%2Fonboarding'}>
              {profile?.authenticated ? 'Editar configuración' : 'Iniciar sesión para editar'}
            </Link>
          </Button>
        </div>
      </CyberCard>
    </div>
  );
}
