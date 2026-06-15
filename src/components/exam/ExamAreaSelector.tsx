'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getAcademicAreasForUni, type AcademicArea } from '@/data/academic-areas';
import type { UniId } from '@/lib/uni-theme-config';
import { cn } from '@/lib/utils';

interface ExamAreaSelectorProps {
  universidad: UniId | 'general';
  onConfirm: (area: AcademicArea) => void;
  className?: string;
}

export function ExamAreaSelector({ universidad, onConfirm, className }: ExamAreaSelectorProps) {
  const areas = getAcademicAreasForUni(universidad);
  const [selectedId, setSelectedId] = useState(areas[0]?.id ?? '');

  const selected = areas.find((a) => a.id === selectedId) ?? areas[0];

  return (
    <div className={cn('exam-shell mx-auto max-w-xl space-y-6', className)}>
      <div>
        <h2 className="text-xl font-bold">Selecciona tu área académica</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          El simulador ensamblará reactivos según la ponderación oficial de tu guía.
        </p>
      </div>

      <RadioGroup value={selectedId} onValueChange={setSelectedId} className="space-y-3">
        {areas.map((area) => (
          <label
            key={area.id}
            htmlFor={area.id}
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all active:scale-[0.99]',
              selectedId === area.id
                ? 'border-uni-primary bg-uni-primary/5 shadow-sm'
                : 'border-border bg-card hover:border-primary/30'
            )}
          >
            <RadioGroupItem value={area.id} id={area.id} className="mt-0.5" />
            <div>
              <p className="font-semibold">{area.label}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{area.description}</p>
            </div>
          </label>
        ))}
      </RadioGroup>

      <Button
        type="button"
        className="h-12 w-full rounded-xl shadow-md shadow-primary/20 active:scale-95"
        disabled={!selected}
        onClick={() => selected && onConfirm(selected)}
      >
        Continuar al simulador
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
