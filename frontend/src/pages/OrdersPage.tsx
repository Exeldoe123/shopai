import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import { Package, ArrowRight } from 'lucide-react';
import { orderService } from '../services/orderService';

const STATUS_LABEL: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'danger' | 'default' }> = {
  pending: { label: 'En attente', variant: 'warning' },
  confirmed: { label: 'Confirmée', variant: 'info' },
  shipped: { label: 'Expédiée', variant: 'info' },
  delivered: { label: 'Livrée', variant: 'success' },
  cancelled: { label: 'Annulée', variant: 'danger' },
};

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderService.getMyOrders,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Mes Commandes</h1>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size={40} /></div>
      ) : isError ? (
        <p className="text-red-400">Connectez-vous pour voir vos commandes.</p>
      ) : !orders || orders.length === 0 ? (
        <Card className="p-12 text-center text-slate-400">
          Aucune commande pour l'instant. <Link to="/products" className="text-primary">Explorer le catalogue</Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const st = STATUS_LABEL[order.status] || { label: order.status, variant: 'default' as const };
            const itemCount = order.items?.reduce((n, i) => n + i.quantity, 0) ?? 0;
            return (
              <Card key={order.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Commande #{order.id.slice(0, 8)}</h3>
                    <p className="text-sm text-slate-400">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR') : ''} • {itemCount} article(s)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold text-white">{order.totalPrice.toFixed(2)} €</div>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                  <Link to={`/account/orders/${order.id}`} className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
