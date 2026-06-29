'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

/** Métricas demo de suscripciones por universidad (hasta conectar Stripe). */
const DEMO_DATA = [
  { uni: 'UNAM', activas: 142, color: '#002B49' },
  { uni: 'IPN', activas: 98, color: '#6A1B29' },
  { uni: 'UAM', activas: 76, color: '#111111' },
  { uni: 'TODOS', activas: 54, color: '#1D4ED8' },
];

export function SubscriptionMetricsChart() {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
        <BarChart data={DEMO_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="uni" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="activas" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
