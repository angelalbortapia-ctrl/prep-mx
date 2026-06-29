import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createStripeCheckoutSession, parseCheckoutPlanBody } from '@/lib/stripe/checkout';
import { getAppBaseUrl, isStripeConfigured } from '@/lib/stripe/config';
import {
  getSupabaseUserByClerkId,
  requireAuthenticatedSupabaseUser,
  syncClerkUserToSupabase,
} from '@/lib/supabase/users';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Crea sesión de Stripe Checkout con clerk_id en metadata.
 * El webhook /api/webhooks/stripe lee ese metadato y pone is_premium = true.
 */
export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: 'Stripe no configurado' }, { status: 503 });
  }

  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) {
    return authResult.error;
  }

  const { clerkId, user } = authResult;
  const body = await req.json().catch(() => null);
  const parsed = parseCheckoutPlanBody(body);
  if (!parsed) {
    return NextResponse.json(
      { error: 'planId (pro|todos) y premiumScope (unam|ipn|uam|todos) requeridos' },
      { status: 400 }
    );
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(clerkId);
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? user.email;
  if (!email) {
    return NextResponse.json({ error: 'El usuario no tiene email en Clerk' }, { status: 400 });
  }

  let dbUser = user;
  if (!dbUser.clerk_id) {
    dbUser = (await syncClerkUserToSupabase(clerkId)) ?? dbUser;
  } else {
    const fresh = await getSupabaseUserByClerkId(clerkId);
    if (fresh) dbUser = fresh;
  }

  const base = getAppBaseUrl();
  const scopeQuery = parsed.premiumScope === 'todos' ? 'todas' : parsed.premiumScope;
  const planQuery = parsed.planId === 'todos' ? 'todo' : 'universidad';

  try {
    const session = await createStripeCheckoutSession({
      clerkId,
      email,
      premiumScope: parsed.premiumScope,
      planId: parsed.planId,
      stripeCustomerId: dbUser.stripe_customer_id,
      successUrl: `${base}/dashboard?checkout=success&scope=${parsed.premiumScope}&plan=${parsed.planId}&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${base}/precios?uni=${scopeQuery}&plan=${planQuery}&checkout=cancel`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe no devolvió URL de checkout' }, { status: 502 });
    }

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      clerkId,
      premiumScope: parsed.premiumScope,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error creando checkout';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** Estado rápido para saber si el checkout está disponible (UI /precios). */
export async function GET() {
  const { userId } = await auth();
  return NextResponse.json({
    configured: isStripeConfigured(),
    signedIn: Boolean(userId),
  });
}
