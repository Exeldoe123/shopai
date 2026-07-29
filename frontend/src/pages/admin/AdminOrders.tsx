import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import { adminService } from '../../services/adminService';

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'info' | 'danger' | 'default'> = {
  delivered: 'success', shipped: 'info', confirmed: 'info', pending: 'warning', cancelled: 'danger',
};

export default function AdminOrders() {
  const qc = useQueryClient();
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: adminService.getOrders,
  });

  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminService.updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success('Statut de commande mis à jour');
      qc.invalidateQueries({ queryKey: ['admin', 'orders'] });
      qc.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
    onError: () => toast.error('Échec de la mise à jour'),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size={40} /></div>;
  if (isError || !orders) return <p className="text-red-400">Impossible de charger les commandes.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Commandes ({orders.length})</h1>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700">
                <th className="px-6 py-4 text-sm font-medium text-slate-300">ID</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Client</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Date</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Total</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {orders.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Aucune commande.</td></tr>
              )}
              {orders.map((o: any) => (
                <tr key={o.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">#{String(o.id).slice(0, 8)}</td>
                  <td className="px-6 py-4 text-slate-400">{o.User?.email ?? '—'}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{Number(o.totalAmount ?? 0).toFixed(2)} €</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={STATUS_VARIANT[o.status] || 'default'}>{o.status}</Badge>
                      <select
                        value={o.status}
                        disabled={update.isPending}
                        onChange={(e) => update.mutate({ id: o.id, status: e.target.value })}
                        className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
