'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const weaknesses = [
  { materia: 'Estequiometría', pct: 72 },
  { materia: 'Geometría analítica', pct: 58 },
  { materia: 'Historia de México', pct: 45 },
  { materia: 'Física — Cinemática', pct: 38 },
];

export function WeaknessRadar() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Debilidades detectadas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {weaknesses.map((w) => (
          <div key={w.materia}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{w.materia}</span>
              <span className="text-muted-foreground">{w.pct}% fallo</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-red-400"
                style={{ width: `${w.pct}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
