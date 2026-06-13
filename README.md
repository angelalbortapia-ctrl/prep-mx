# PrepMX

Plataforma inteligente de preparación para exámenes de admisión (UNAM, IPN, UAM).

## Stack

- **Frontend:** Next.js 14+ (App Router), Tailwind CSS, Shadcn/ui
- **Backend:** Next.js API Routes, Supabase (PostgreSQL)
- **Auth:** Clerk
- **Pagos:** Stripe (tarjeta, OXXO, SPEI)
- **Video:** Bunny.net
- **Deploy:** Vercel + Cloudflare

## Desarrollo local

Requiere Node.js 20+. Si no lo tienes instalado globalmente:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/app/
├── (marketing)/     Landing, precios, simulador gratis
├── (auth)/          Sign-in / sign-up (Clerk pendiente)
└── (app)/dashboard/ Área del alumno
```

Ver `docs/SRS_PrepMX_v1.md` para la especificación completa.

## GitHub

https://github.com/angelalbortapia-ctrl/prep-mx
