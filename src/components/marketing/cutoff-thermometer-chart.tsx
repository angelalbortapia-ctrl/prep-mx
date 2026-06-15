'use client';

import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { UNI_CHART_COLORS } from '@/lib/user-career';
import type { Universidad } from '@/types/user-profile';

interface CutoffThermometerChartProps {
  cutoff: number;
  label: string;
  /** Aciertos del alumno (pre-cargado desde Clerk/Supabase). */
  userScore?: number;
  universidad?: Universidad;
}

export function CutoffThermometerChart({
  cutoff,
  label,
  userScore,
  universidad = 'unam',
}: CutoffThermometerChartProps) {
  const colors = UNI_CHART_COLORS[universidad];
  const data = [{ name: label, cutoff, user: userScore ?? 0 }];

  return (
    <ResponsiveContainer width="100%" height={userScore != null ? 200 : 160}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
        <XAxis type="number" domain={[0, 120]} tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
        <ReferenceLine x={cutoff} stroke={colors.accent} strokeDasharray="4 4" label="Meta" />
        {userScore != null && (
          <Bar dataKey="user" radius={[0, 6, 6, 0]} barSize={18} name="Tus aciertos">
            <Cell fill={colors.primary} fillOpacity={0.85} />
          </Bar>
        )}
        <Bar dataKey="cutoff" radius={[0, 8, 8, 0]} barSize={28} name="Corte histórico">
          <Cell fill={colors.primary} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
