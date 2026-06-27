'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { TickerItem } from '@/data/ticker/types';
import type { TickerConfig } from '@/data/ticker/ticker-config';
import { DEFAULT_STALE_TIME } from '@/lib/query/query-client';

export const tickerQueryKeys = {
  items: ['ticker', 'items'] as const,
  settings: ['ticker', 'settings'] as const,
};

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { accept: 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `Request falló: ${res.status}`);
  }
  return (await res.json()) as T;
}

export function useTickerItems() {
  return useQuery({
    queryKey: tickerQueryKeys.items,
    queryFn: () =>
      fetchJSON<{ items: TickerItem[]; customCount: number; staticCount: number }>(
        '/api/ticker/items'
      ),
    staleTime: DEFAULT_STALE_TIME,
  });
}

export function useTickerSettings() {
  return useQuery({
    queryKey: tickerQueryKeys.settings,
    queryFn: () => fetchJSON<{ theme: TickerConfig }>('/api/ticker/settings'),
    staleTime: 60_000,
  });
}

export function useAddTickerItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      category: TickerItem['category'];
      text: string;
      badge?: string;
      universidad?: 'unam' | 'ipn' | 'uam' | null;
      href?: string | null;
      startsAt?: string | null;
      endsAt?: string | null;
    }) =>
      fetchJSON<{ item: TickerItem }>('/api/ticker/items', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: tickerQueryKeys.items });
    },
  });
}

export function useDeleteTickerItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetchJSON<{ ok: boolean }>(`/api/ticker/items?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: tickerQueryKeys.items });
    },
  });
}

export function useUpdateTickerTheme() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (theme: Partial<TickerConfig>) =>
      fetchJSON<{ theme: TickerConfig }>('/api/ticker/settings', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ theme }),
      }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: tickerQueryKeys.settings });
    },
  });
}
