'use client';

import posthog from 'posthog-js';
import { isPostHogEnabled } from '@/lib/analytics/posthog-config';
import type { ProductEventName } from '@/lib/analytics/events';

/** Captura evento custom (solo cliente, con PostHog configurado). */
export function captureProductEvent(
  event: ProductEventName | string,
  properties?: Record<string, unknown>
): void {
  if (!isPostHogEnabled()) return;
  posthog.capture(event, properties);
}
