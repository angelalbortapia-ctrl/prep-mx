import { LandingPageView } from '@/components/marketing/LandingPageView';
import { parseLandingUniversidad } from '@/lib/university-theme';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { uni?: string };
}

export default function LandingPage({ searchParams }: PageProps) {
  const universidad = parseLandingUniversidad(searchParams.uni);

  return <LandingPageView universidad={universidad} />;
}
