import Link from 'next/link';
import { ExternalLink, Radio } from 'lucide-react';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminTickerConfig } from '@/components/admin/AdminTickerConfig';
import { Button } from '@/components/ui/button';

export default function AdminTickerPage() {
  return (
    <AdminShell
      title="Configuración del ticker"
      subtitle="18 diseños · colores · velocidad · señales y promociones"
      badge="Radar en vivo"
      backHref="/admin"
      backLabel="Volver al panel admin"
      icon={Radio}
      headerExtra={
        <Button type="button" variant="outline" size="sm" asChild className="hidden sm:inline-flex">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="gap-2">
            Ver en home
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      }
    >
      <AdminTickerConfig />
    </AdminShell>
  );
}
