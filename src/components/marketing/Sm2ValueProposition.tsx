import Link from 'next/link';
import { Brain, CalendarClock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildJourneyHref } from '@/lib/journey-links';
import { landingCtaLink, LANDING_SIMULATOR_CTA } from '@/lib/landing-cta';
import { trust } from '@/lib/design-system/colors';
import { cn } from '@/lib/utils';
import type { PlanScope, UniversidadFilter } from '@/lib/university-theme';

interface Sm2ValuePropositionProps {
  universidad: UniversidadFilter;
  plan: PlanScope;
}

const points = [
  {
    icon: Brain,
    title: 'No solo te dice qué fallaste',
    text: 'PrepMX calcula cuándo volver a repasar cada pregunta con el algoritmo SM-2 — el mismo de apps como Anki.',
  },
  {
    icon: CalendarClock,
    title: 'Repaso en el momento exacto',
    text: 'Si aciertas, el intervalo crece (6 días, 2 semanas…). Si fallas, repasas mañana. Así no se te olvida en el examen real.',
  },
  {
    icon: TrendingUp,
    title: 'Justifica el Plan Pro',
    text: 'El diagnóstico gratis te ubica. El Premium guarda tu historial y programa tus repasos automáticamente en Supabase.',
  },
];

export function Sm2ValueProposition({ universidad, plan }: Sm2ValuePropositionProps) {
  const simHref = buildJourneyHref('/simulador-gratis', {
    uni: universidad,
    plan,
    extra: { freemium: 'diagnostico' },
  });

  return (
    <section className={cn('rounded-3xl border p-8', trust.accentBorder, 'bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-950/40 dark:to-zinc-950')}>
      <p className={cn('text-xs font-bold uppercase tracking-wider', trust.accent)}>
        Diferenciador PrepMX
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">
        Repaso espaciado SM-2: estudia menos, recuerda más
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        La competencia te da un puntaje y ya. Nosotros guardamos cada error y te decimos{' '}
        <strong className="text-foreground">cuándo</strong> tienes que volver a una pregunta de UNAM,
        IPN o UAM para que no se te escape el día del examen.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {points.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className={cn('rounded-2xl border bg-white/80 p-4 dark:bg-zinc-900/50', trust.accentBorder)}
          >
            <Icon className={cn('h-5 w-5', trust.accent)} aria-hidden />
            <h3 className="mt-2 font-bold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="conversion" size="cta">
          <Link href={simHref}>{LANDING_SIMULATOR_CTA}</Link>
        </Button>
        <Button asChild variant="outline" size="cta">
          <Link href="#planes">Ver planes con SM-2</Link>
        </Button>
        <Button asChild variant="ghost" size="cta" className={landingCtaLink}>
          <Link href="/blog/memorizar-pdfs-unam-repeticion-espaciada-100-aciertos">
            Artículo: PDF vs repetición espaciada
          </Link>
        </Button>
      </div>
    </section>
  );
}
