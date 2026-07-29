import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, ScrollText } from 'lucide-react';
import { clsx } from 'clsx';

const links = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Produits', icon: Package },
  { to: '/admin/orders', label: 'Commandes', icon: ShoppingBag },
  { to: '/admin/users', label: 'Utilisateurs', icon: Users },
  { to: '/admin/logs', label: 'Journal', icon: ScrollText },
];

export default function AdminNav() {
  return (
    <nav className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            clsx(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            )
          }
        >
          <Icon className="w-4 h-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
