'use client';

import { usePostHog } from 'posthog-js/react';
import { useCallback } from 'react';
import type { ProductEventName } from '@/lib/analytics/events';
import { isPostHogEnabled } from '@/lib/analytics/posthog-config';

export function useProductAnalytics() {
  const posthog = usePostHog();

  const track = useCallback(
    (event: ProductEventName | string, properties?: Record<string, unknown>) => {
      if (!isPostHogEnabled() || !posthog) return;
      posthog.capture(event, properties);
    },
    [posthog]
  );

  return { track, enabled: isPostHogEnabled() };
}
