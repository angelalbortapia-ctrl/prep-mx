import { SimulacrosList } from '@/components/paywall/SimulacrosList';
import { PageHeader } from '@/components/layout/PageHeader';

export default function SimulacrosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Simulacros"
        description="Exámenes completos cronometrados o práctica con feedback inmediato."
      />

      <SimulacrosList />
    </div>
  );
}
