'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface ChartPoint {
  label: string;
  puntaje: number;
  meta: number;
}

interface ResultadoFeedbackChartProps {
  data: ChartPoint[];
  cutoffScore: number;
  aboveCutoff: boolean;
  primaryHex: string;
  accentHex: string;
}

export function ResultadoFeedbackChart({
  data,
  cutoffScore,
  aboveCutoff,
  primaryHex,
  accentHex,
}: ResultadoFeedbackChartProps) {
  const gradientId = aboveCutoff ? 'colorProgreso' : 'colorProgresoBajo';
  const fillStart = aboveCutoff ? primaryHex : '#9CA3AF';
  const fillEnd = aboveCutoff ? accentHex : '#EF4444';

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="colorProgreso" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primaryHex} stopOpacity={0.45} />
            <stop offset="95%" stopColor={accentHex} stopOpacity={0.08} />
          </linearGradient>
          <linearGradient id="colorProgresoBajo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 120]}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid hsl(var(--border))',
            fontSize: 12,
          }}
          formatter={(value) => [`${Number(value ?? 0)} pts`, 'Puntaje']}
        />
        <ReferenceLine
          y={cutoffScore}
          stroke={aboveCutoff ? accentHex : '#EF4444'}
          strokeDasharray="6 4"
          label={{
            value: `Corte ${cutoffScore}`,
            position: 'insideTopRight',
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 11,
          }}
        />
        <Area
          type="monotone"
          dataKey="puntaje"
          stroke={aboveCutoff ? primaryHex : '#6B7280'}
          strokeWidth={2.5}
          fill={`url(#${gradientId})`}
          fillOpacity={1}
          dot={{ r: 4, fill: aboveCutoff ? accentHex : '#EF4444' }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
