import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { AppCommandPalette } from '@/components/search/AppCommandPalette';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { UniThemeVisualRoot } from '@/components/theme/UniThemeVisualRoot';
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
    <UniThemeVisualRoot dark className="flex min-h-screen flex-col bg-mesh">
      <Suspense fallback={<div className="glass-header h-16" aria-hidden />}>
        <SiteNav variant="app" />
      </Suspense>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      <Suspense fallback={null}>
        <SiteFooter variant="app" />
      </Suspense>
      <AppCommandPalette />
    </UniThemeVisualRoot>
  );
}
