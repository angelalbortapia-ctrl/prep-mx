import { SimulacrosList } from '@/components/paywall/SimulacrosList';
import { PageHeader } from '@/components/layout/PageHeader';
import { appContentWide } from '@/lib/design-system/layout';
import { cn } from '@/lib/utils';

export default function SimulacrosPage() {
  return (
    <div className={cn(appContentWide, 'space-y-6')}>
      <PageHeader
        title="Simulacros"
        description="Exámenes completos cronometrados o práctica con feedback inmediato."
      />

      <SimulacrosList />
    </div>
  );
}
