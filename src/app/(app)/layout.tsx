import { redirect } from 'next/navigation';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { AppDashboardShell } from '@/components/layout/AppDashboardShell';
import { AppLayoutChrome } from '@/components/layout/AppLayoutChrome';
import { isDemoMode } from '@/lib/demo-mode';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const demo = isDemoMode();
  const { userId } = await auth();

  if (!demo) {
    if (!userId) {
      redirect('/sign-in');
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    if (!user.publicMetadata?.onboardingComplete) {
      redirect('/onboarding');
    }
  }

  return (
    <AppDashboardShell>
      <AppLayoutChrome>{children}</AppLayoutChrome>
    </AppDashboardShell>
  );
}
