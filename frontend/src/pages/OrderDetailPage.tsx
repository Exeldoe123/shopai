import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { orderService } from '../services/orderService';

const FLOW = ['pending', 'confirmed', 'shipped', 'delivered'];
const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente', confirmed: 'Confirmée', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée',
};
const STEP_ICONS = [Clock, Package, Truck, CheckCircle];

export default function OrderDetailPage() {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center"><Spinner size={48} /></div>;
  if (isError || !order) return <div className="text-center py-20 text-red-400">Commande introuvable ou accès refusé.</div>;

  const activeIdx = FLOW.indexOf(order.status);
  const cancelled = order.status === 'cancelled';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/account/orders" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux commandes
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Commande #{order.id.slice(0, 8)}</h1>
        <Badge variant={cancelled ? 'danger' : order.status === 'delivered' ? 'success' : 'info'} className="px-3 py-1 text-sm">
          {STATUS_LABEL[order.status] || order.status}
        </Badge>
      </div>

      {!cancelled && (
        <Card className="p-8 mb-8">
          <h2 className="text-lg font-bold text-white mb-8">Suivi de livraison</h2>
          <div className="relative flex justify-between">
            <div className="absolute top-5 left-0 w-full h-1 bg-slate-800 z-0"></div>
            <div className="absolute top-5 left-0 h-1 bg-primary z-0 transition-all"
              style={{ width: `${(Math.max(0, activeIdx) / (FLOW.length - 1)) * 100}%` }}></div>
            {FLOW.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const done = i <= activeIdx;
              return (
                <div key={step} className="relative z-10 flex flex-col items-center bg-surface px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${done ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-medium ${done ? 'text-white' : 'text-slate-500'}`}>{STATUS_LABEL[step]}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-4">Articles</h2>
          <div className="divide-y divide-slate-800">
            {order.items?.map((it, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                    {it.product?.images?.[0] && <img src={it.product.images[0]} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{it.product?.name ?? 'Produit'}</p>
                    <p className="text-sm text-slate-400">Qté : {it.quantity}</p>
                  </div>
                </div>
                <span className="text-white font-medium">{(it.price * it.quantity).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-white/10 mt-4 pt-4 font-bold text-white">
            <span>Total</span><span>{order.totalPrice.toFixed(2)} €</span>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Livraison</h2>
          {order.shippingAddress ? (
            <address className="not-italic text-slate-300 text-sm leading-relaxed">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.postalCode} {order.shippingAddress.city}<br />
              {order.shippingAddress.country}
            </address>
          ) : (
            <p className="text-slate-500 text-sm">Adresse non disponible.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
