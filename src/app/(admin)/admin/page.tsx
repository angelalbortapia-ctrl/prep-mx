import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <h1 className="text-2xl font-bold">Admin PrepMX</h1>
      <p className="mt-1 text-muted-foreground">Panel de control — se activa en Paso 3 con auth admin.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { title: 'MRR', value: '$0 MXN' },
          { title: 'DAU', value: '0' },
          { title: 'Conversión free→premium', value: '0%' },
        ].map((m) => (
          <Card key={m.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
