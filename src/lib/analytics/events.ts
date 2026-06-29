/** Nombres de eventos de producto — usar con captureProductEvent o useProductAnalytics. */
export const ProductEvents = {
  EXAM_STARTED: 'exam_started',
  EXAM_SUBMITTED: 'exam_submitted',
  CHECKOUT_STARTED: 'checkout_started',
  CHECKOUT_COMPLETED: 'checkout_completed',
  FREEMIUM_DIAGNOSTIC_DONE: 'freemium_diagnostic_done',
} as const;

export type ProductEventName = (typeof ProductEvents)[keyof typeof ProductEvents];
