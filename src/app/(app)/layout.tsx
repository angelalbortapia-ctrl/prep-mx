import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Inicio' },
  { href: '/dashboard/plan', label: 'Mi plan' },
  { href: '/dashboard/simulacros', label: 'Simulacros' },
  { href: '/dashboard/perfil', label: 'Perfil' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b md:w-56 md:border-b-0 md:border-r">
        <div className="p-4 font-bold">PrepMX</div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:px-3 md:pb-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
