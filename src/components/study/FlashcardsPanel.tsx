'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import type { QuizQuestion } from '@/data/study-guides';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FlashcardsPanelProps {
  slug: string;
  questions: readonly QuizQuestion[];
}

export function FlashcardsPanel({ slug, questions }: FlashcardsPanelProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = questions[index];
  if (!card) {
    return <p className="text-muted-foreground">Sin flashcards para esta guía.</p>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <p className="text-sm text-muted-foreground">
        Tarjeta {index + 1} de {questions.length} · {slug}
      </p>
      <motion.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          'relative min-h-48 w-full rounded-2xl border-2 border-uni-primary/20 bg-gradient-to-br from-uni-primary/5 to-uni-accent/10 p-6 text-left shadow-lg',
          'active:scale-[0.98] transition-transform'
        )}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <p className="text-lg font-semibold leading-snug">
          {flipped ? card.explicacion : card.pregunta}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {flipped ? 'Respuesta / explicación' : 'Toca para voltear'}
        </p>
      </motion.button>
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={index === 0}
          onClick={() => {
            setIndex((i) => i - 1);
            setFlipped(false);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setFlipped(false)}>
          <RotateCcw className="mr-1 h-4 w-4" />
          Reiniciar
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={index >= questions.length - 1}
          onClick={() => {
            setIndex((i) => i + 1);
            setFlipped(false);
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
