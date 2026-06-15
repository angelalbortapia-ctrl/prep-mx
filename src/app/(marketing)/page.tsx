import { LandingPageView } from '@/components/marketing/LandingPageView';
import { parsePageUniversidad, parsePlanScope } from '@/lib/university-theme';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { uni?: string; plan?: string };
}

export default function LandingPage({ searchParams }: PageProps) {
  const universidad = parsePageUniversidad(searchParams.uni);
  const plan = parsePlanScope(searchParams.plan);

  return <LandingPageView universidad={universidad} plan={plan} />;
}
