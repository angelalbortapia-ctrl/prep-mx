'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface AcceptanceGaugeChartProps {
  value: number;
  cutoffScore: number;
  uniLabel: string;
  averageScore: number;
}

export function AcceptanceGaugeChart({
  value,
  cutoffScore,
  uniLabel,
  averageScore,
}: AcceptanceGaugeChartProps) {
  const data = [{ value }, { value: 100 - value }];

  return (
    <div className="space-y-3">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="85%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
          >
            <Cell fill="hsl(var(--uni-primary))" />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="-mt-16 text-center">
        <p className="text-3xl font-extrabold text-uni-primary">{value}%</p>
        <p className="text-sm font-medium text-muted-foreground">Probabilidad de aceptación</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Promedio ~{averageScore} aciertos · Corte {uniLabel}: {cutoffScore}
        </p>
      </div>
    </div>
  );
}
