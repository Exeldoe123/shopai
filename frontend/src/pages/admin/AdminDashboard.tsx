import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Users, ShoppingBag, Euro, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import { adminService } from '../../services/adminService';

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'info' | 'danger' | 'default'> = {
  delivered: 'success',
  shipped: 'info',
  confirmed: 'info',
  pending: 'warning',
  cancelled: 'danger',
};

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: adminService.getDashboard,
  });

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size={40} /></div>;
  if (isError || !data)
    return <p className="text-red-400">Impossible de charger le tableau de bord (backend démarré ?).</p>;

  const maxRevenue = Math.max(...data.monthlySales.map((m) => Number(m.revenue)), 1);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Chiffre d'affaires" value={`${Number(data.totalRevenue).toFixed(2)} €`} icon={Euro} color="bg-green-500/10 text-green-500" />
        <StatCard label="Commandes" value={data.totalOrders} icon={ShoppingBag} color="bg-primary/10 text-primary" />
        <StatCard label="Clients" value={data.totalUsers} icon={Users} color="bg-secondary/10 text-secondary" />
        <StatCard label="Produits en rupture" value={data.lowStockProducts.length} icon={AlertTriangle} color="bg-accent/10 text-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales chart */}
        <Card className="p-6 lg:col-span-2 h-80 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Évolution des ventes (6 derniers mois)</h3>
          {data.monthlySales.length === 0 ? (
            <p className="text-slate-500 m-auto">Aucune vente enregistrée.</p>
          ) : (
            <div className="flex-grow flex items-end gap-3 bg-slate-800/20 rounded-lg border border-slate-700/50 p-4">
              {data.monthlySales.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                  <div className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-sm relative" style={{ height: `${(Number(m.revenue) / maxRevenue) * 100}%` }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 whitespace-nowrap">
                      {Number(m.revenue).toFixed(0)} €
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{m.month.slice(5)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Orders by status */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Commandes par statut</h3>
          <div className="space-y-3">
            {Object.keys(data.ordersByStatus).length === 0 && <p className="text-slate-500 text-sm">Aucune commande.</p>}
            {Object.entries(data.ordersByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <Badge variant={STATUS_VARIANT[status] || 'default'}>{status}</Badge>
                <span className="text-white font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Low stock */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-accent" /> Stock faible (&lt; 20)
        </h3>
        {data.lowStockProducts.length === 0 ? (
          <p className="text-slate-500 text-sm">Tous les stocks sont sains 👍</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.lowStockProducts.map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-slate-800/40 rounded-lg px-4 py-3">
                <span className="text-white text-sm truncate">{p.name}</span>
                <Badge variant={p.stock < 5 ? 'danger' : 'warning'}>{p.stock}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
