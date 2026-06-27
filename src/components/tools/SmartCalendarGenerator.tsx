'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CyberCard } from '@/components/ui/cyber-card';
import { Badge } from '@/components/ui/badge';
import {
  DAY_LABELS,
  calendarToCsv,
  generateStudyCalendar,
} from '@/data/study-tools/calendar-generator';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

const UNIS: Universidad[] = ['unam', 'ipn', 'uam'];

const INTENSITY_VARIANT: Record<string, 'default' | 'secondary' | 'warning'> = {
  pesada: 'warning',
  media: 'default',
  ligera: 'secondary',
};

export function SmartCalendarGenerator() {
  const [universidades, setUniversidades] = useState<Universidad[]>(['unam', 'ipn']);
  const [freeDays, setFreeDays] = useState([true, true, true, true, true, true, false]);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [weeks, setWeeks] = useState(4);
  const [generated, setGenerated] = useState(false);

  const plan = useMemo(
    () =>
      generateStudyCalendar({
        universidades,
        freeDays,
        hoursPerDay,
        weeks,
      }),
    [universidades, freeDays, hoursPerDay, weeks]
  );

  function toggleUni(uni: Universidad) {
    setUniversidades((prev) =>
      prev.includes(uni) ? prev.filter((u) => u !== uni) : [...prev, uni]
    );
    setGenerated(false);
  }

  function toggleDay(index: number) {
    setFreeDays((prev) => prev.map((d, i) => (i === index ? !d : d)));
    setGenerated(false);
  }

  function downloadCsv() {
    const csv = calendarToCsv(plan);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prepmx-calendario-estudio.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <CyberCard className="space-y-5 p-5 md:p-6">
        <div>
          <p className="mb-2 text-sm font-semibold">Universidades objetivo</p>
          <div className="flex flex-wrap gap-2">
            {UNIS.map((uni) => (
              <button
                key={uni}
                type="button"
                onClick={() => toggleUni(uni)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-semibold',
                  universidades.includes(uni)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {universidadLabels[uni]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Días disponibles para estudiar</p>
          <div className="flex flex-wrap gap-2">
            {DAY_LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => toggleDay(i)}
                className={cn(
                  'h-10 w-12 rounded-lg border text-xs font-bold',
                  freeDays[i]
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'text-muted-foreground line-through opacity-50'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hours-day" className="mb-2 block text-sm font-semibold">
              Horas por día de estudio
            </label>
            <Input
              id="hours-day"
              type="number"
              min={0.5}
              max={8}
              step={0.5}
              value={hoursPerDay}
              onChange={(e) => {
                setHoursPerDay(Number(e.target.value));
                setGenerated(false);
              }}
            />
          </div>
          <div>
            <label htmlFor="weeks" className="mb-2 block text-sm font-semibold">
              Semanas a planificar
            </label>
            <Input
              id="weeks"
              type="number"
              min={1}
              max={12}
              value={weeks}
              onChange={(e) => {
                setWeeks(Number(e.target.value));
                setGenerated(false);
              }}
            />
          </div>
        </div>

        <Button
          type="button"
          className="h-11 rounded-xl"
          onClick={() => setGenerated(true)}
          disabled={universidades.length === 0 || !freeDays.some(Boolean)}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          Generar calendario
        </Button>
      </CyberCard>

      {generated && plan.length > 0 ? (
        <CyberCard className="space-y-4 p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold">Tu plan ({plan.length} sesiones)</h3>
            <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={downloadCsv}>
              <Download className="mr-2 h-4 w-4" />
              Descargar CSV
            </Button>
          </div>

          <ul className="max-h-[480px] space-y-2 overflow-y-auto pr-1">
            {plan.map((day, index) => (
              <li
                key={`${day.date}-${day.subject}-${index}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 font-bold text-muted-foreground">{day.dayLabel}</span>
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                  <span className="font-medium">{day.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={INTENSITY_VARIANT[day.intensity]}>{day.intensity}</Badge>
                  <span className="text-xs text-muted-foreground">{day.hours}h</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground">
            Alternamos materias pesadas (Cálculo IPN, Física) con ligeras (Geografía, Literatura) según
            tus universidades.
          </p>
        </CyberCard>
      ) : null}
    </div>
  );
}
