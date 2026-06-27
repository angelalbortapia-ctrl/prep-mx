import { Wrench } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ToolsHubGrid, ToolsHubIntro } from '@/components/tools/ToolsHubGrid';

export default function HerramientasPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Wrench className="h-4 w-4" aria-hidden />
            Kit de estudio
          </span>
        }
        title="Herramientas PrepMX"
        description="Calculadoras, juegos y referencias para UNAM, IPN y UAM."
      />
      <ToolsHubIntro />
      <ToolsHubGrid />
    </div>
  );
}
