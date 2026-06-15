'use client';

import { useState } from 'react';
import { AlertTriangle, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSecurityAlerts, suspendAlertUser, type SecurityAlert } from '@/lib/admin-security-alerts';

export function SecurityAlertsPanel() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(() => getSecurityAlerts());

  function suspend(id: string) {
    setAlerts(suspendAlertUser(id));
  }

  if (!alerts.length) {
    return <p className="text-sm text-muted-foreground">Sin alertas de seguridad recientes.</p>;
  }

  return (
    <ul className="space-y-3">
      {alerts.map((alert) => (
        <li
          key={alert.id}
          className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold">{alert.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sesiones simultáneas en {alert.locations.join(' · ')} ({alert.minutesApart} min)
                </p>
                <p className="text-xs text-muted-foreground">IPs: {alert.ips.join(', ')}</p>
              </div>
            </div>
            {alert.suspended ? (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Suspendida
              </span>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 active:scale-95"
                onClick={() => suspend(alert.id)}
              >
                <Ban className="mr-1 h-4 w-4" />
                Suspender
              </Button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
