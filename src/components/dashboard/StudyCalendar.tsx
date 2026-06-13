'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const weekPlan = [
  { day: 'Lun', tema: 'Álgebra', tipo: 'teoría', done: true },
  { day: 'Mar', tema: 'Estequiometría', tipo: 'práctica', done: true },
  { day: 'Mié', tema: 'Física I', tipo: 'práctica', done: false },
  { day: 'Jue', tema: 'Historia México', tipo: 'teoría', done: false },
  { day: 'Vie', tema: 'Simulacro parcial', tipo: 'simulacro', done: false },
  { day: 'Sáb', tema: 'Repaso SM-2', tipo: 'práctica', done: false },
  { day: 'Dom', tema: 'Descanso activo', tipo: 'teoría', done: false },
];

export function StudyCalendar() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Plan esta semana</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {weekPlan.map((item) => (
          <div
            key={item.day}
            className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm ${
              item.done ? 'bg-green-50/50 border-green-100' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 font-semibold text-muted-foreground">{item.day}</span>
              <span className={item.done ? 'line-through text-muted-foreground' : ''}>
                {item.tema}
              </span>
            </div>
            <Badge variant={item.done ? 'success' : 'secondary'}>{item.tipo}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
