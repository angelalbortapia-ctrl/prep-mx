-- PrepMX — Stripe: estado de suscripción por usuario (webhook)

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS premium_scope TEXT;

CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;

COMMENT ON COLUMN users.subscription_status IS 'free | active | canceled | past_due';
COMMENT ON COLUMN users.premium_scope IS 'unam | ipn | uam | todos — universidad(es) desbloqueadas por pago';
