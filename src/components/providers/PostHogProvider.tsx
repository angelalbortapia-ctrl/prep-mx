'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import {
  buildPageviewProperties,
  getPostHogHost,
  getPostHogKey,
  isPostHogEnabled,
} from '@/lib/analytics/posthog-config';

function initPostHogClient(): void {
  if (typeof window === 'undefined') return;
  if (!isPostHogEnabled()) return;
  if (posthog.__loaded) return;

  posthog.init(getPostHogKey()!, {
    api_host: getPostHogHost(),
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
  });
}

function PostHogPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const client = usePostHog();

  useEffect(() => {
    if (!pathname || !client) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    client.capture('$pageview', {
      $current_url: url,
      ...buildPageviewProperties(pathname),
    });
  }, [pathname, searchParams, client]);

  return null;
}

function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  );
}

function PostHogIdentify() {
  const { user, isLoaded } = useUser();
  const client = usePostHog();

  useEffect(() => {
    if (!isLoaded || !client) return;

    if (user) {
      client.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName ?? undefined,
      });
      return;
    }

    client.reset();
  }, [user, isLoaded, client]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHogClient();
  }, []);

  if (!isPostHogEnabled()) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      <PostHogIdentify />
      {children}
    </PHProvider>
  );
}
