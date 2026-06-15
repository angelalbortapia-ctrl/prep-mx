export interface SecurityAlert {
  id: string;
  userId: string;
  email: string;
  locations: string[];
  ips: string[];
  minutesApart: number;
  detectedAt: string;
  suspended: boolean;
}

const STORAGE_KEY = 'prepmx-security-alerts';

export function getSecurityAlerts(): SecurityAlert[] {
  if (typeof window === 'undefined') return DEMO_ALERTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEMO_ALERTS;
    return JSON.parse(raw) as SecurityAlert[];
  } catch {
    return DEMO_ALERTS;
  }
}

export function suspendAlertUser(alertId: string): SecurityAlert[] {
  const alerts = getSecurityAlerts().map((a) =>
    a.id === alertId ? { ...a, suspended: true } : a
  );
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  }
  return alerts;
}

const DEMO_ALERTS: SecurityAlert[] = [
  {
    id: 'alert-1',
    userId: 'user_demo_1',
    email: 'aspirante.demo@prepmx.com',
    locations: ['CDMX, MX', 'Monterrey, MX'],
    ips: ['189.204.x.x', '201.144.x.x'],
    minutesApart: 23,
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
    suspended: false,
  },
  {
    id: 'alert-2',
    userId: 'user_demo_2',
    email: 'cuenta.compartida@ejemplo.com',
    locations: ['Guadalajara, MX', 'Tijuana, MX', 'CDMX, MX'],
    ips: ['187.190.x.x', '200.23.x.x', '189.204.x.x'],
    minutesApart: 41,
    detectedAt: new Date(Date.now() - 7200000).toISOString(),
    suspended: false,
  },
];
