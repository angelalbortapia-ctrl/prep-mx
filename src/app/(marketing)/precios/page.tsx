import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { pricingPlans } from '@/data/pricing';

export default function PreciosPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Planes PrepMX</h1>
        <p className="mt-3 text-muted-foreground">
          Empieza gratis. Paga cuando quieras desbloquear tu plan completo con OXXO, SPEI o tarjeta.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={plan.highlighted ? 'border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20' : ''}
          >
            <CardHeader>
              {plan.highlighted && <Badge className="w-fit">Más popular</Badge>}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {plan.price === 0 ? 'Gratis' : `$${plan.price}`}
                {plan.price > 0 && (
                  <span className="text-sm font-normal text-muted-foreground"> {plan.period}</span>
                )}
              </p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="h-11 w-full rounded-xl" variant={plan.highlighted ? 'default' : 'outline'}>
                <Link href={plan.price === 0 ? '/simulador-gratis' : '/sign-up'}>
                  {plan.price === 0 ? 'Probar ahora' : 'Elegir plan'}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
