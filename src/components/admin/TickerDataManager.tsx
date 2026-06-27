'use client';

import { useState } from 'react';
import { Loader2, Plus, Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TICKER_BADGE_LABELS,
  TICKER_PROMO_CATEGORY,
  isTickerPromo,
  type TickerCategory,
} from '@/data/ticker/types';
import {
  useAddTickerItem,
  useDeleteTickerItem,
  useTickerItems,
} from '@/hooks/useTickerData';
import { isPromoScheduledActive } from '@/lib/ticker/feed';
import { cn } from '@/lib/utils';

const PROMO_TEMPLATES = [
  { text: '30% OFF plan Anual — solo esta semana', href: '/precios' },
  { text: 'Simulador gratis ilimitado — regístrate hoy', href: '/sign-up' },
  { text: '2×1 en tokens de simulacro — código PREPMX2X1', href: '/precios?plan=express' },
] as const;

const CATEGORIES: TickerCategory[] = [
  TICKER_PROMO_CATEGORY,
  'crono-vigente',
  'alerta-corte',
  'corte-standard',
  'criterio-oficial',
  'estadistica-rechazo',
  'trampas-examen',
  'carreras-futuro',
  'mercado-laboral',
  'reactivo',
];

export function TickerDataManager() {
  const { data, isLoading } = useTickerItems();
  const addItem = useAddTickerItem();
  const deleteItem = useDeleteTickerItem();

  const [category, setCategory] = useState<TickerCategory>(TICKER_PROMO_CATEGORY);
  const [text, setText] = useState('');
  const [href, setHref] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [customBadge, setCustomBadge] = useState('');
  const [universidad, setUniversidad] = useState<'unam' | 'ipn' | 'uam' | ''>('');

  const isPromo = category === TICKER_PROMO_CATEGORY;
  const customItems = (data?.items ?? []).filter((i) => i.id.startsWith('custom-'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addItem.mutate(
      {
        category,
        text: text.trim(),
        badge: customBadge.trim() || undefined,
        universidad: isPromo ? null : universidad || null,
        href: isPromo ? href.trim() || null : null,
        startsAt: isPromo ? startsAt.trim() || null : null,
        endsAt: isPromo ? endsAt.trim() || null : null,
      },
      {
        onSuccess: () => {
          setText('');
          setHref('');
          setStartsAt('');
          setEndsAt('');
          setCustomBadge('');
        },
      }
    );
  };

  const applyTemplate = (template: (typeof PROMO_TEMPLATES)[number]) => {
    setCategory(TICKER_PROMO_CATEGORY);
    setText(template.text);
    setHref(template.href);
    setCustomBadge('[OFERTA]');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-yellow-500" />
          Señales y promociones
        </CardTitle>
        <CardDescription>
          Publica cortes, cronos o{' '}
          <strong className="text-yellow-600">promociones en amarillo</strong> (siempre visibles,
          van al inicio del ticker). Guardado en{' '}
          <code className="rounded bg-muted px-1 text-xs">custom-items.json</code>.
          {data ? (
            <span className="mt-1 block">
              Total: {data.items.length.toLocaleString('es-MX')} señales ({data.customCount} custom ·{' '}
              {data.staticCount} estáticas)
            </span>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isPromo ? (
          <div className="rounded-lg border border-yellow-400/40 bg-yellow-400/10 p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
              Plantillas rápidas
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROMO_TEMPLATES.map((t) => (
                <button
                  key={t.text}
                  type="button"
                  onClick={() => applyTemplate(t)}
                  className="rounded-md border border-yellow-400/30 bg-yellow-400/15 px-2 py-1 text-left text-xs font-medium text-yellow-900 transition-colors hover:bg-yellow-400/25 dark:text-yellow-100"
                >
                  {t.text}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="ticker-text" className="text-sm font-medium">
              Texto
            </label>
            <textarea
              id="ticker-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              placeholder={
                isPromo
                  ? 'Ej. 40% de descuento en Plan Todo — válido hasta el 30 de junio'
                  : 'Ej. UNAM Medicina C.U. — corte estimado 116 aciertos'
              }
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ticker-category" className="text-sm font-medium">
              Tipo
            </label>
            <select
              id="ticker-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as TickerCategory)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === TICKER_PROMO_CATEGORY ? '⚠ ' : ''}
                  {TICKER_BADGE_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="ticker-badge" className="text-sm font-medium">
              Badge custom (opcional)
            </label>
            <input
              id="ticker-badge"
              value={customBadge}
              onChange={(e) => setCustomBadge(e.target.value)}
              placeholder={isPromo ? '[OFERTA]' : '[CRONO]'}
              className="w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm"
            />
          </div>

          {isPromo ? (
            <>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="ticker-href" className="text-sm font-medium">
                  Enlace al hacer clic (opcional)
                </label>
                <input
                  id="ticker-href"
                  value={href}
                  onChange={(e) => setHref(e.target.value)}
                  placeholder="/precios o https://..."
                  className="w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="ticker-starts" className="text-sm font-medium">
                  Visible desde (opcional)
                </label>
                <input
                  id="ticker-starts"
                  type="date"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="ticker-ends" className="text-sm font-medium">
                  Visible hasta (opcional)
                </label>
                <input
                  id="ticker-ends"
                  type="date"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label htmlFor="ticker-uni" className="text-sm font-medium">
                Universidad (opcional)
              </label>
              <select
                id="ticker-uni"
                value={universidad}
                onChange={(e) => setUniversidad(e.target.value as typeof universidad)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              >
                <option value="">Genérico</option>
                <option value="unam">UNAM</option>
                <option value="ipn">IPN</option>
                <option value="uam">UAM</option>
              </select>
            </div>
          )}

          <div className="sm:col-span-2">
            <Button type="submit" disabled={addItem.isPending || !text.trim()} className="gap-2">
              {addItem.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {isPromo ? 'Publicar promoción' : 'Publicar señal'}
            </Button>
            {addItem.isError ? (
              <p className="mt-2 text-sm text-destructive">{addItem.error.message}</p>
            ) : null}
          </div>
        </form>

        <div>
          <h3 className="text-sm font-semibold">Publicadas ({customItems.length})</h3>
          {isLoading ? (
            <p className="mt-2 text-sm text-muted-foreground">Cargando…</p>
          ) : customItems.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Aún no hay señales custom.</p>
          ) : (
            <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto">
              {customItems.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    'flex items-start gap-2 rounded-lg border px-3 py-2 text-sm',
                    isTickerPromo(item)
                      ? 'border-yellow-400/40 bg-yellow-400/10'
                      : 'bg-muted/30'
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'text-[10px] font-bold uppercase',
                        isTickerPromo(item) ? 'text-yellow-700 dark:text-yellow-400' : 'text-muted-foreground'
                      )}
                    >
                      {isTickerPromo(item) ? '⚠ ' : ''}
                      {item.badge}
                    </p>
                    <p className="mt-0.5 leading-snug">{item.text}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[10px] text-muted-foreground">
                      {item.uni ? <span>uni: {item.uni.toUpperCase()}</span> : null}
                      {item.startsAt ? <span>desde {item.startsAt}</span> : null}
                      {item.endsAt ? <span>hasta {item.endsAt}</span> : null}
                      {item.href ? <span>→ {item.href}</span> : null}
                      {isTickerPromo(item) && !isPromoScheduledActive(item) ? (
                        <span className="text-destructive">expirada / fuera de ventana</span>
                      ) : null}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-destructive hover:text-destructive"
                    disabled={deleteItem.isPending}
                    onClick={() => deleteItem.mutate(item.id)}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
