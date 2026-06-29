'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import type { OpcionId } from '@/types/question';
import type { BurstPracticeQuestion } from '@/lib/practice-burst';

export interface BurstAnswerResponse {
  isCorrect: boolean;
  correctOption: OpcionId;
  explanation: string | null;
  explanationImagenUrl: string | null;
  explanationVideoUrl: string | null;
  explanationLocked: boolean;
  sm2: { xpEarned: number; savedCount: number } | null;
}

async function submitBurstAnswer(body: {
  questionId: string;
  opcionElegida: OpcionId | null;
  timeSpentSeconds?: number;
}): Promise<BurstAnswerResponse> {
  const res = await fetch('/api/practice/burst', {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `Error ${res.status}`);
  }
  return (await res.json()) as BurstAnswerResponse;
}

export function useBurstPracticeAnswer() {
  return useMutation({
    mutationFn: submitBurstAnswer,
  });
}

async function fetchBurstQuestions(uni: string, limit: number): Promise<BurstPracticeQuestion[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (uni && uni !== 'todas') params.set('uni', uni);
  const res = await fetch(`/api/practice/burst?${params}`, {
    credentials: 'include',
    headers: { accept: 'application/json' },
  });
  if (!res.ok) throw new Error('No se pudieron cargar preguntas de ráfaga');
  const data = (await res.json()) as { questions: BurstPracticeQuestion[] };
  return data.questions;
}

export function useBurstPracticeQuestions(uni: string, limit = 30) {
  return useQuery({
    queryKey: ['practice', 'burst', uni, limit],
    queryFn: () => fetchBurstQuestions(uni, limit),
    staleTime: 60_000,
  });
}
