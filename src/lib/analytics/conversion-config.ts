/** Meta (Facebook) Pixel — Events Manager → Pixel ID numérico. */
export function getMetaPixelId(): string | undefined {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || undefined;
}

/** Google Analytics 4 — Measurement ID (G-XXXXXXXX). */
export function getGa4MeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || undefined;
}

export function isMetaPixelEnabled(): boolean {
  return Boolean(getMetaPixelId());
}

export function isGa4Enabled(): boolean {
  return Boolean(getGa4MeasurementId());
}

export function isConversionTrackingEnabled(): boolean {
  return isMetaPixelEnabled() || isGa4Enabled();
}
