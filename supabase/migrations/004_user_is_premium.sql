-- PrepMX — flag premium en users (activado por webhook Stripe)

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_premium BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN users.is_premium IS 'true tras pago Stripe exitoso (checkout.session.completed)';
