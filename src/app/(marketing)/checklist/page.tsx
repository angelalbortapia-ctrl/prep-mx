import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const AspirantChecklistTool = dynamic(
  () =>
    import('@/components/marketing/AspirantChecklistTool').then((m) => m.AspirantChecklistTool),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10">
        <Skeleton className="mx-auto h-8 w-64" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    ),
  }
);

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://prepmx.com';

export const metadata = {
  title: 'Checklist del Aspirante — Temario oficial UNAM, IPN y UAM | PrepMX',
  description:
    'Selecciona tu carrera (Medicina UNAM, IPN, UAM…), marca el temario oficial subtema por subtema y descarga tu checklist en PDF. Diagnóstico gratis con tu correo.',
  keywords: [
    'temario UNAM',
    'temario IPN',
    'checklist examen admisión',
    'Medicina UNAM temario',
    'convocatoria 2026',
  ],
  alternates: { canonical: `${BASE}/checklist` },
  openGraph: {
    title: 'El Checklist del Aspirante — PrepMX',
    description: 'Temario oficial interactivo por carrera. Descarga PDF y mide tu nivel gratis.',
    url: `${BASE}/checklist`,
    type: 'website',
  },
};

export default function ChecklistPage() {
  return <AspirantChecklistTool variant="page" />;
}
