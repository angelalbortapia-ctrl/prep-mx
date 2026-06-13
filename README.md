# PrepMX

Plataforma inteligente de preparación para exámenes de admisión (UNAM, IPN, UAM).

## Stack

- **Frontend:** Next.js 14+ (App Router), Tailwind CSS, Shadcn/ui
- **Backend:** Next.js API Routes, Supabase (PostgreSQL)
- **Auth:** Clerk
- **Pagos:** Stripe (tarjeta, OXXO, SPEI)
- **Video:** Bunny.net
- **Deploy:** Vercel + Cloudflare

## Ramas

| Rama | Uso |
|------|-----|
| `main` | Producción (protegida, solo vía PR) |
| `develop` | Desarrollo activo |

## Roadmap MVP

1. **Fundación** — Auth, BD, banco de preguntas, componentes base
2. **Simulador y AI** — Simulacros, diagnóstico IA, tutor, SM-2
3. **Monetización** — Landing, Stripe, LFPD, admin
4. **Escala** — App móvil (Capacitor), gamificación, B2B

Ver `docs/SRS_PrepMX_v1.md` para la especificación completa.

## Desarrollo local

```bash
npm install
npm run dev
```

> El proyecto Next.js se inicializará en el Paso 1 del roadmap.
