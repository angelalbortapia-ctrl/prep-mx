import { PageShell } from '@/components/layout/PageShell';
import { PreciosPageView } from '@/components/marketing/PreciosPageView';
import { parsePageUniversidad, parsePlanScope } from '@/lib/university-theme';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { uni?: string; plan?: string };
}

export default function PreciosPage({ searchParams }: PageProps) {
  const universidad = parsePageUniversidad(searchParams.uni);
  const plan = parsePlanScope(searchParams.plan);

  return (
    <PageShell>
      <PreciosPageView universidad={universidad} plan={plan} />
    </PageShell>
  );
}
