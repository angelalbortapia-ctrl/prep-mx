'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Loader2,
  Palette,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Type,
} from 'lucide-react';
import { TickerRenderer } from '@/components/marketing/ticker/TickerRenderer';
import { TickerDataManager } from '@/components/admin/TickerDataManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DEFAULT_TICKER_CONFIG,
  TICKER_COLOR_PRESETS,
  TICKER_SPEED_PRESETS,
  formatTickerCycleDuration,
  mergeTickerConfig,
  nearestSpeedPreset,
  sanitizeTickerConfig,
  tickerCycleSeconds,
  type TickerConfig,
} from '@/data/ticker/ticker-config';
import {
  TICKER_LAYOUTS,
  getTickerLayoutMeta,
  switchTickerLayout,
  type TickerLayoutId,
} from '@/data/ticker/layouts';
import { useTickerItems, useTickerSettings, useUpdateTickerTheme } from '@/hooks/useTickerData';
import { prepareTickerFeed } from '@/lib/ticker/feed';
import { TICKER_UNI_FILTERS } from '@/data/ticker';
import type { TickerUniFilter } from '@/data/ticker/utils';
import { cn } from '@/lib/utils';

type ConfigTab = 'design' | 'colors' | 'speed' | 'behavior' | 'typography';

const TABS: { id: ConfigTab; label: string; icon: typeof Sparkles }[] = [
  { id: 'design', label: 'Diseño', icon: Sparkles },
  { id: 'colors', label: 'Colores', icon: Palette },
  { id: 'speed', label: 'Velocidad', icon: Gauge },
  { id: 'behavior', label: 'Comportamiento', icon: SlidersHorizontal },
  { id: 'typography', label: 'Tipografía', icon: Type },
];

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isHex = /^#[0-9A-Fa-f]{6}$/.test(value);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <input
          type="color"
          value={isHex ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded border bg-background"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border bg-background px-3 py-2 font-mono text-sm"
          maxLength={32}
        />
      </div>
    </div>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-muted/20 p-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1"
      />
      <span>
        <span className="text-sm font-medium">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

function DesignPicker({
  draft,
  onSelect,
  applyLayoutColors,
  onApplyLayoutColorsChange,
}: {
  draft: TickerConfig;
  onSelect: (layoutId: TickerLayoutId, resetColors: boolean) => void;
  applyLayoutColors: boolean;
  onApplyLayoutColorsChange: (v: boolean) => void;
}) {
  const activeIndex = TICKER_LAYOUTS.findIndex((l) => l.id === draft.layoutId);
  const active = getTickerLayoutMeta(draft.layoutId);

  const go = (delta: number) => {
    const next = TICKER_LAYOUTS[(activeIndex + delta + TICKER_LAYOUTS.length) % TICKER_LAYOUTS.length];
    onSelect(next.id, applyLayoutColors);
  };

  return (
    <div className="space-y-4 rounded-lg border bg-muted/10 p-4">
      <div className="flex items-stretch gap-2">
        <Button type="button" variant="outline" size="icon" onClick={() => go(-1)} aria-label="Diseño anterior">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div
          className="flex min-h-[4.5rem] flex-1 flex-col justify-center rounded-xl border px-4 py-3"
          style={{ background: active.previewGradient }}
        >
          <p className="text-sm font-bold text-white drop-shadow-sm">{active.name}</p>
          <p className="text-xs text-white/90 drop-shadow-sm">{active.tagline}</p>
        </div>
        <Button type="button" variant="outline" size="icon" onClick={() => go(1)} aria-label="Siguiente diseño">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {activeIndex + 1} / {TICKER_LAYOUTS.length} diseños
      </p>

      <div className="max-h-56 overflow-y-auto rounded-lg border bg-background p-2">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TICKER_LAYOUTS.map((layout) => (
            <button
              key={layout.id}
              type="button"
              onClick={() => onSelect(layout.id, applyLayoutColors)}
              className={cn(
                'rounded-lg border p-2 text-left transition-all',
                draft.layoutId === layout.id
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'hover:border-primary/40 hover:bg-muted/40'
              )}
            >
              <div
                className="mb-2 h-8 rounded-md"
                style={{ background: layout.previewGradient }}
                aria-hidden
              />
              <span className="block text-xs font-semibold leading-tight">{layout.name}</span>
            </button>
          ))}
        </div>
      </div>

      <ToggleField
        label="Al cambiar diseño, aplicar colores del layout"
        description="Si está desactivado, solo cambia la estructura y conserva tu paleta actual."
        checked={applyLayoutColors}
        onChange={onApplyLayoutColorsChange}
      />
    </div>
  );
}

function SpeedPanel({
  draft,
  itemCount,
  onChange,
}: {
  draft: TickerConfig;
  itemCount: number;
  onChange: (multiplier: number) => void;
}) {
  const activePreset = nearestSpeedPreset(draft.speedMultiplier);
  const cycleLabel = formatTickerCycleDuration(
    tickerCycleSeconds(itemCount || 230, draft.speedMultiplier)
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Controla qué tan rápido pasa el marquee. {cycleLabel} con {itemCount || '…'} señales.
      </p>
      <div className="flex flex-wrap gap-2">
        {TICKER_SPEED_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.multiplier)}
            className={cn(
              'rounded-lg border px-3 py-2 text-left text-sm transition-colors',
              activePreset === preset.id
                ? 'border-primary bg-primary/10 font-semibold text-primary'
                : 'hover:border-primary/30 hover:bg-muted/50'
            )}
          >
            <span className="block">{preset.label}</span>
            <span className="text-[10px] text-muted-foreground">{preset.hint}</span>
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="ticker-speed-fine">Ajuste fino</label>
          <span className="font-mono tabular-nums text-muted-foreground">
            ×{draft.speedMultiplier.toFixed(2)}
          </span>
        </div>
        <input
          id="ticker-speed-fine"
          type="range"
          min={40}
          max={220}
          step={5}
          value={Math.round(draft.speedMultiplier * 100)}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Izquierda = más lento (más legible) · Derecha = más rápido
        </p>
      </div>
    </div>
  );
}

export function AdminTickerConfig() {
  const { data: settings, isLoading: settingsLoading } = useTickerSettings();
  const { data: itemsData } = useTickerItems();
  const updateTheme = useUpdateTickerTheme();
  const [draft, setDraft] = useState<TickerConfig>(DEFAULT_TICKER_CONFIG);
  const [savedFlash, setSavedFlash] = useState(false);
  const [tab, setTab] = useState<ConfigTab>('design');
  const [applyLayoutColors, setApplyLayoutColors] = useState(true);
  const [previewUni, setPreviewUni] = useState<TickerUniFilter>('all');

  const itemCount = useMemo(() => {
    if (!itemsData?.items.length) return 0;
    return prepareTickerFeed(itemsData.items, 'all').length;
  }, [itemsData?.items]);
  const activeLayout = getTickerLayoutMeta(draft.layoutId);
  const savedConfig = useMemo(
    () => (settings?.theme ? mergeTickerConfig(settings.theme) : DEFAULT_TICKER_CONFIG),
    [settings?.theme]
  );

  useEffect(() => {
    if (settings?.theme) setDraft(mergeTickerConfig(settings.theme));
  }, [settings?.theme]);

  const patch = (partial: Partial<TickerConfig>) =>
    setDraft((d) => mergeTickerConfig({ ...d, ...sanitizeTickerConfig(partial) }));

  const selectLayout = (layoutId: TickerLayoutId, resetColors: boolean) => {
    setDraft((d) => mergeTickerConfig(switchTickerLayout(d, layoutId, resetColors)));
  };

  const applyColorPreset = (presetId: string) => {
    const preset = TICKER_COLOR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    patch({
      accentPrimary: preset.primary,
      accentSecondary: preset.secondary,
      background: preset.bg,
    });
  };

  const handleSave = () => {
    updateTheme.mutate(draft, {
      onSuccess: () => {
        setSavedFlash(true);
        window.setTimeout(() => setSavedFlash(false), 2000);
      },
    });
  };

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(savedConfig),
    [draft, savedConfig]
  );

  if (settingsLoading && !settings) {
    return <p className="text-sm text-muted-foreground">Cargando configuración del ticker…</p>;
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1 rounded-lg border bg-muted/20 p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition-colors sm:text-sm',
                  tab === id ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base capitalize">
                {TABS.find((t) => t.id === tab)?.label}
              </CardTitle>
              {tab === 'design' ? (
                <CardDescription>
                  {activeLayout.name} · {TICKER_LAYOUTS.length} diseños disponibles
                </CardDescription>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-5">
              {tab === 'design' ? (
                <>
                  <DesignPicker
                    draft={draft}
                    onSelect={selectLayout}
                    applyLayoutColors={applyLayoutColors}
                    onApplyLayoutColorsChange={setApplyLayoutColors}
                  />
                  <div className="space-y-2">
                    <label htmlFor="brand-label" className="text-sm font-medium">
                      Marca
                    </label>
                    <input
                      id="brand-label"
                      value={draft.brandLabel}
                      onChange={(e) => patch({ brandLabel: e.target.value })}
                      maxLength={24}
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="live-label" className="text-sm font-medium">
                        Etiqueta LIVE
                      </label>
                      <input
                        id="live-label"
                        value={draft.liveLabel}
                        onChange={(e) => patch({ liveLabel: e.target.value })}
                        maxLength={16}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="simular-label" className="text-sm font-medium">
                        Etiqueta Simular
                      </label>
                      <input
                        id="simular-label"
                        value={draft.simularLabel}
                        onChange={(e) => patch({ simularLabel: e.target.value })}
                        maxLength={16}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="height" className="text-sm font-medium">
                      Altura de barra
                    </label>
                    <select
                      id="height"
                      value={draft.barHeight}
                      onChange={(e) => patch({ barHeight: e.target.value })}
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                      <option value="2.25rem">Compacta</option>
                      <option value="2.75rem">Normal</option>
                      <option value="3.25rem">Alta</option>
                      <option value="4rem">Dual lane</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="border-style" className="text-sm font-medium">
                      Estilo de borde
                    </label>
                    <select
                      id="border-style"
                      value={draft.borderStyle}
                      onChange={(e) =>
                        patch({ borderStyle: e.target.value as TickerConfig['borderStyle'] })
                      }
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                      <option value="glow">Glow</option>
                      <option value="solid">Sólido</option>
                      <option value="gradient">Gradiente</option>
                    </select>
                  </div>
                </>
              ) : null}

              {tab === 'colors' ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {TICKER_COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyColorPreset(preset.id)}
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:border-primary/40"
                      >
                        <span
                          className="h-4 w-4 rounded-full border"
                          style={{ background: preset.primary }}
                        />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ColorField
                      label="Acento primario"
                      value={draft.accentPrimary}
                      onChange={(v) => patch({ accentPrimary: v })}
                    />
                    <ColorField
                      label="Acento secundario"
                      value={draft.accentSecondary}
                      onChange={(v) => patch({ accentSecondary: v })}
                    />
                    <ColorField
                      label="Fondo"
                      value={draft.background}
                      onChange={(v) => patch({ background: v })}
                    />
                    <ColorField
                      label="Borde"
                      value={draft.borderColor}
                      onChange={(v) => patch({ borderColor: v })}
                    />
                    <ColorField
                      label="Badges"
                      value={draft.badgeTextColor}
                      onChange={(v) => patch({ badgeTextColor: v })}
                    />
                    <ColorField
                      label="Texto señales"
                      value={draft.itemTextColor}
                      onChange={(v) => patch({ itemTextColor: v })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="glow" className="text-sm font-medium">
                      Glow ({Math.round(draft.glowOpacity * 100)}%)
                    </label>
                    <input
                      id="glow"
                      type="range"
                      min={0}
                      max={100}
                      value={Math.round(draft.glowOpacity * 100)}
                      onChange={(e) => patch({ glowOpacity: Number(e.target.value) / 100 })}
                      className="w-full"
                    />
                  </div>
                </>
              ) : null}

              {tab === 'speed' ? (
                <SpeedPanel
                  draft={draft}
                  itemCount={itemCount}
                  onChange={(speedMultiplier) => patch({ speedMultiplier })}
                />
              ) : null}

              {tab === 'behavior' ? (
                <div className="grid gap-2">
                  <ToggleField
                    label="Indicador LIVE"
                    checked={draft.showLiveBadge}
                    onChange={(v) => patch({ showLiveBadge: v })}
                  />
                  <ToggleField
                    label="Filtros UNAM / IPN / UAM (solo mobile)"
                    description="En desktop la uni la controla el header. En mobile aparece una fila de tabs en el ticker."
                    checked={draft.showUniFilters}
                    onChange={(v) => patch({ showUniFilters: v })}
                  />
                  <ToggleField
                    label="Botón Simular"
                    checked={draft.showSimularLink}
                    onChange={(v) => patch({ showSimularLink: v })}
                  />
                  <ToggleField
                    label="Botón pausa"
                    checked={draft.showPauseButton}
                    onChange={(v) => patch({ showPauseButton: v })}
                  />
                  <ToggleField
                    label="Pausar al pasar el mouse"
                    checked={draft.pauseOnHover}
                    onChange={(v) => patch({ pauseOnHover: v })}
                  />
                  <ToggleField
                    label="Scanlines retro"
                    checked={draft.scanlines}
                    onChange={(v) => patch({ scanlines: v })}
                  />
                  <ToggleField
                    label="Fondo blur (glass)"
                    checked={draft.blurBackdrop}
                    onChange={(v) => patch({ blurBackdrop: v })}
                  />
                  <ToggleField
                    label="Mostrar badges en ítems"
                    checked={draft.showItemBadges}
                    onChange={(v) => patch({ showItemBadges: v })}
                  />
                  <ToggleField
                    label="Badges en mayúsculas"
                    checked={draft.uppercaseBadges}
                    onChange={(v) => patch({ uppercaseBadges: v })}
                  />
                </div>
              ) : null}

              {tab === 'typography' ? (
                <>
                  <div className="space-y-2">
                    <label htmlFor="font-size" className="text-sm font-medium">
                      Tamaño de texto
                    </label>
                    <select
                      id="font-size"
                      value={draft.fontSize}
                      onChange={(e) =>
                        patch({ fontSize: e.target.value as TickerConfig['fontSize'] })
                      }
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                      <option value="xs">Extra pequeño</option>
                      <option value="sm">Normal</option>
                      <option value="md">Grande</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="item-gap" className="text-sm font-medium">
                      Espacio entre ítems
                    </label>
                    <select
                      id="item-gap"
                      value={draft.itemGap}
                      onChange={(e) =>
                        patch({ itemGap: e.target.value as TickerConfig['itemGap'] })
                      }
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    >
                      <option value="tight">Compacto</option>
                      <option value="normal">Normal</option>
                      <option value="wide">Amplio</option>
                    </select>
                  </div>
                  <ToggleField
                    label="Track redondeado (cards)"
                    checked={draft.roundedTrack}
                    onChange={(v) => patch({ roundedTrack: v })}
                  />
                </>
              ) : null}

              <div className="flex flex-wrap gap-2 border-t pt-4">
                <Button onClick={handleSave} disabled={updateTheme.isPending || !isDirty} className="gap-2">
                  {updateTheme.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : savedFlash ? (
                    <Check className="h-4 w-4" />
                  ) : null}
                  {savedFlash ? 'Guardado' : 'Guardar ticker'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!isDirty}
                  onClick={() => setDraft(savedConfig)}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Deshacer
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDraft(DEFAULT_TICKER_CONFIG)}
                  className="gap-2"
                >
                  Fábrica
                </Button>
              </div>
              {updateTheme.isError ? (
                <p className="text-sm text-destructive">{updateTheme.error.message}</p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden xl:sticky xl:top-24 xl:self-start">
          <CardHeader>
            <CardTitle className="text-base">Vista previa</CardTitle>
            <CardDescription>
              {activeLayout.name} · {isDirty ? 'Cambios sin guardar' : 'Configuración publicada'}
            </CardDescription>
            <div className="flex flex-wrap gap-1 pt-2" role="tablist" aria-label="Preview por universidad">
              {TICKER_UNI_FILTERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={previewUni === t.id}
                  onClick={() => setPreviewUni(t.id)}
                  className={cn(
                    'rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors',
                    previewUni === t.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-transparent text-muted-foreground hover:bg-muted/50'
                  )}
                  style={previewUni === t.id && t.id !== 'all' ? { color: t.color } : undefined}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative min-h-[280px]" style={{ backgroundColor: draft.background }}>
              <div className="px-6 py-8">
                <p
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: draft.accentPrimary }}
                >
                  {draft.brandLabel}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white/90">Preview · {activeLayout.name}</h3>
              </div>
              <div className="absolute inset-x-0 bottom-0">
                <Suspense fallback={<div className="h-11 animate-pulse bg-black/20" aria-hidden />}>
                  <TickerRenderer previewMode previewUniFilter={previewUni} configOverride={draft} />
                </Suspense>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TickerDataManager />
    </section>
  );
}
