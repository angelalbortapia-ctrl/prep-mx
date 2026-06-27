#!/usr/bin/env bash
# Reinicio limpio del servidor de desarrollo (caché local + ~/.cache/prep-mx-next-dev).
set -euo pipefail

export PATH="${HOME}/.local/node/bin:${PATH}"

if command -v lsof >/dev/null 2>&1; then
  PIDS=$(lsof -ti:3000 2>/dev/null || true)
  if [ -n "${PIDS}" ]; then
    echo "→ Liberando puerto 3000 (PIDs: ${PIDS})"
    kill -9 ${PIDS} 2>/dev/null || true
  fi
fi

echo "→ Borrando cachés de Next (.next, .next-dev.nosync, prep-mx-next-dev)"
rm -rf .next .next-dev.nosync "${HOME}/.cache/prep-mx-next-dev"

echo "→ Arrancando next dev…"
exec env WATCHPACK_POLLING=true npx next dev
