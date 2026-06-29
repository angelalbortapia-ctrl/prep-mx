/** Activa pantalla de mantenimiento y bloquea app + APIs de escritura. */
export function isMaintenanceMode(): boolean {
  return (
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' ||
    process.env.MAINTENANCE_MODE === 'true'
  );
}

export function getMaintenanceMessage(): string {
  const custom = process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE?.trim();
  if (custom) return custom;
  return 'Estamos puliendo los últimos reactivos para la convocatoria. Gracias por tu paciencia.';
}

export function getMaintenanceEta(): string | null {
  const eta = process.env.NEXT_PUBLIC_MAINTENANCE_ETA?.trim();
  return eta || null;
}
