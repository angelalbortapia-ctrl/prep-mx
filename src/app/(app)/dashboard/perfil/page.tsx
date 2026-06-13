'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { areaLabels, universidadLabels } from '@/types/user-profile';

export default function PerfilPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Mi perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Meta de examen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Universidad</span>
            <Badge>{universidadLabels.unam}</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Área</span>
            <span className="font-medium">{areaLabels.area2}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fecha de examen</span>
            <span className="font-medium">15 ago 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estado</span>
            <Badge variant="secondary">Free tier</Badge>
          </div>
          <Button asChild variant="outline" className="mt-2 h-11 w-full rounded-xl">
            <Link href="/onboarding">Editar configuración</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gamificación</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">120</p>
            <p className="text-xs text-muted-foreground">XP total</p>
          </div>
          <div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">Racha (días)</p>
          </div>
          <div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground">Insignias</p>
          </div>
          <div>
            <p className="text-2xl font-bold">#14</p>
            <p className="text-xs text-muted-foreground">Ranking semanal</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
