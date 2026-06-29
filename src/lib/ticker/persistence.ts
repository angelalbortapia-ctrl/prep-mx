import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import type { TickerItem } from '@/data/ticker/types';
import {
  DEFAULT_TICKER_CONFIG,
  mergeTickerConfig,
  sanitizeTickerConfig,
  type TickerConfig,
} from '@/data/ticker/ticker-config';
import { megaUniversityTickerData } from '@/data/ticker/mega-university-ticker-data';
import { TICKER_BADGE_LABELS } from '@/data/ticker/types';
import { enrichTickerItem, isPromoScheduledActive, resolveTickerHref } from '@/lib/ticker/feed';
import { sanitizeMarketingHref } from '@/lib/marketing-routes';

const DATA_DIR = path.join(process.cwd(), 'src/data/ticker');
const CUSTOM_FILE = path.join(DATA_DIR, 'custom-items.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

export interface TickerSettings {
  theme: TickerConfig;
}

export interface TickerCustomItemInput {
  category: TickerItem['category'];
  text: string;
  badge?: string;
  universidad?: 'unam' | 'ipn' | 'uam' | null;
  href?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
}

function normalizeHref(href?: string | null): string | undefined {
  if (!href?.trim()) return undefined;
  const trimmed = href.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed.replace(/^\//, '')}`;
  return sanitizeMarketingHref(withSlash);
}

export async function readCustomTickerItems(): Promise<TickerItem[]> {
  try {
    const raw = await readFile(CUSTOM_FILE, 'utf8');
    const parsed = JSON.parse(raw) as TickerItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeCustomTickerItems(items: TickerItem[]): Promise<void> {
  await writeFile(CUSTOM_FILE, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
}

export async function readTickerSettings(): Promise<TickerSettings> {
  try {
    const raw = await readFile(SETTINGS_FILE, 'utf8');
    const parsed = JSON.parse(raw) as { theme?: Partial<TickerConfig> };
    return {
      theme: mergeTickerConfig(sanitizeTickerConfig(parsed?.theme ?? {})),
    };
  } catch {
    return { theme: DEFAULT_TICKER_CONFIG };
  }
}

export async function writeTickerSettings(settings: TickerSettings): Promise<void> {
  await writeFile(SETTINGS_FILE, `${JSON.stringify(settings, null, 2)}\n`, 'utf8');
}

export async function patchTickerTheme(partial: Partial<TickerConfig>): Promise<TickerSettings> {
  const current = await readTickerSettings();
  const next: TickerSettings = {
    theme: mergeTickerConfig({ ...current.theme, ...sanitizeTickerConfig(partial) }),
  };
  await writeTickerSettings(next);
  return next;
}

export function prefixUniversidad(text: string, universidad?: 'unam' | 'ipn' | 'uam' | null): string {
  if (!universidad) return text;
  const prefix = universidad.toUpperCase();
  if (text.toUpperCase().startsWith(`${prefix} `)) return text;
  return `${prefix} ${text}`;
}

function isValidDateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00`));
}

export function buildCustomTickerItem(input: TickerCustomItemInput): TickerItem {
  const id = `custom-${crypto.randomUUID()}`;
  const item: TickerItem = {
    id,
    category: input.category,
    badge: input.badge?.trim() || `[${TICKER_BADGE_LABELS[input.category]}]`,
    text: prefixUniversidad(input.text.trim(), input.universidad),
    ...(input.universidad ? { uni: input.universidad } : {}),
    ...(input.startsAt?.trim() && isValidDateOnly(input.startsAt.trim())
      ? { startsAt: input.startsAt.trim() }
      : {}),
    ...(input.endsAt?.trim() && isValidDateOnly(input.endsAt.trim())
      ? { endsAt: input.endsAt.trim() }
      : {}),
  };
  const href = normalizeHref(input.href) ?? resolveTickerHref(item);
  if (href) item.href = href;
  return item;
}

function sortTickerFeed(custom: TickerItem[], staticItems: TickerItem[]): TickerItem[] {
  const activeCustom = custom.filter((i) => isPromoScheduledActive(i));
  return [...activeCustom, ...staticItems];
}

export async function getMergedTickerItems(): Promise<{
  items: TickerItem[];
  customCount: number;
  staticCount: number;
}> {
  const custom = await readCustomTickerItems();
  const staticCount = megaUniversityTickerData.length;
  const merged = sortTickerFeed(custom, megaUniversityTickerData).map(enrichTickerItem);
  return {
    items: merged,
    customCount: custom.length,
    staticCount,
  };
}

export async function addCustomTickerItem(input: TickerCustomItemInput): Promise<TickerItem> {
  const items = await readCustomTickerItems();
  const item = buildCustomTickerItem(input);
  items.unshift(item);
  await writeCustomTickerItems(items);
  return item;
}

export async function deleteCustomTickerItem(id: string): Promise<boolean> {
  const items = await readCustomTickerItems();
  const next = items.filter((i) => i.id !== id);
  if (next.length === items.length) return false;
  await writeCustomTickerItems(next);
  return true;
}
