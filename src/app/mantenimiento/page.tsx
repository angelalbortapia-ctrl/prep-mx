import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { getMaintenanceEta, getMaintenanceMessage } from '@/lib/maintenance-mode';

export const metadata = {
  title: 'Mantenimiento — PrepMX',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function MantenimientoPage() {
  const message = getMaintenanceMessage();
  const eta = getMaintenanceEta();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mesh px-4 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Wrench className="h-8 w-8" aria-hidden />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">Mantenimiento programado</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
      <p className="mt-4 text-sm font-medium text-foreground">
        {eta ? `Volvemos en ${eta}.` : 'Volvemos en unos minutos.'}
      </p>
      <p className="mt-6 max-w-sm text-xs text-muted-foreground">
        Los simulacros y el guardado de progreso están pausados para evitar errores durante la
        actualización. Tus datos están seguros.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
