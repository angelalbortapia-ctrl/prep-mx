import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Bienvenido a PrepMX. Aquí verás tu progreso, plan y racha de estudio.
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-sm font-medium">Próximo paso</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Configura tu universidad, área y fecha de examen para generar tu plan.
        </p>
        <Button asChild className="mt-4 h-12">
          <Link href="/dashboard/simulacros">Ir a simulacros</Link>
        </Button>
      </div>
    </div>
  );
}
