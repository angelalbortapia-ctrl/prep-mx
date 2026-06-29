#!/usr/bin/env bash
# Reinicio limpio del servidor de desarrollo (caché local + ~/.cache/prep-mx-next-dev).
set -euo pipefail

export PATH="${HOME}/.local/node/bin:${PATH}"

if command -v lsof >/dev/null 2>&1; then
  for PORT in 3000 3001 3002 3003 3004; do
    PIDS=$(lsof -ti:"${PORT}" 2>/dev/null || true)
    if [ -n "${PIDS}" ]; then
      echo "→ Liberando puerto ${PORT} (PIDs: ${PIDS})"
      kill -9 ${PIDS} 2>/dev/null || true
    fi
  done
fi

echo "→ Borrando cachés de Next (.next, .next-dev.nosync, prep-mx-next-dev, Users/)"
rm -rf .next .next-dev.nosync "${HOME}/.cache/prep-mx-next-dev" Users

echo "→ Arrancando next dev…"
exec env WATCHPACK_POLLING=true npx next dev
