import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { orderService } from '../services/orderService';
import toast from 'react-hot-toast';

const STEPS = ['Livraison', 'Paiement', 'Confirmation'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [addr, setAddr] = useState({ firstName: '', lastName: '', street: '', postalCode: '', city: '', country: 'Maroc' });

  const set = (k: string) => (e: any) => setAddr((a) => ({ ...a, [k]: e.target.value }));
  const total = getTotal();

  if (items.length === 0 && !orderId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Votre panier est vide</h1>
        <Link to="/products"><Button>Explorer le catalogue</Button></Link>
      </div>
    );
  }

  const goToPayment = () => {
    if (!isAuthenticated) {
      toast.error('Connectez-vous pour finaliser la commande');
      navigate('/login');
      return;
    }
    if (!addr.street || !addr.city || !addr.postalCode) {
      toast.error('Merci de compléter l\'adresse');
      return;
    }
    setCurrentStep(1);
  };

  const placeOrder = async () => {
    setSubmitting(true);
    try {
      const order = await orderService.checkout({
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        shippingAddress: {
          street: addr.street, city: addr.city,
          postalCode: addr.postalCode, country: addr.country,
        },
      });
      setOrderId(order.id);
      clearCart();
      setCurrentStep(2);
      toast.success('Commande passée !');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Échec de la commande');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Finaliser la commande</h1>

      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 z-0"></div>
        {STEPS.map((step, idx) => (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${idx < currentStep ? 'bg-primary text-white' : idx === currentStep ? 'bg-primary text-white ring-4 ring-primary/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
              {idx < currentStep ? <Check className="w-5 h-5" /> : idx + 1}
            </div>
            <span className={`mt-2 text-sm font-medium ${idx <= currentStep ? 'text-white' : 'text-slate-500'}`}>{step}</span>
          </div>
        ))}
      </div>

      <Card className="p-6 md:p-8">
        {currentStep === 0 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4">Adresse de livraison</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Prénom" placeholder="Jean" value={addr.firstName} onChange={set('firstName')} />
              <Input label="Nom" placeholder="Dupont" value={addr.lastName} onChange={set('lastName')} />
            </div>
            <Input label="Adresse complète" placeholder="123 rue Hassan II" value={addr.street} onChange={set('street')} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Code postal" placeholder="20000" value={addr.postalCode} onChange={set('postalCode')} />
              <Input label="Ville" placeholder="Casablanca" value={addr.city} onChange={set('city')} />
            </div>
            <Input label="Pays" value={addr.country} onChange={set('country')} />
            <div className="pt-4 flex justify-between items-center">
              <span className="text-slate-400">Total : <span className="text-white font-bold">{total.toFixed(2)} €</span></span>
              <Button onClick={goToPayment}>Continuer vers le paiement</Button>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4">Mode de paiement</h2>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg mb-6 flex gap-4">
              <input type="radio" name="payment" id="cod" defaultChecked className="mt-1 accent-primary" />
              <div>
                <label htmlFor="cod" className="font-medium text-white cursor-pointer">Paiement à la livraison (COD)</label>
                <p className="text-sm text-slate-400">Réglez en espèces à la réception de votre commande.</p>
              </div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300">
              <div className="flex justify-between mb-2"><span>Articles ({items.length})</span><span>{total.toFixed(2)} €</span></div>
              <div className="flex justify-between mb-2"><span>Livraison</span><span className="text-green-400">Gratuite</span></div>
              <div className="flex justify-between font-bold text-white border-t border-white/10 pt-2 mt-2"><span>Total</span><span>{total.toFixed(2)} €</span></div>
            </div>
            <div className="pt-4 flex justify-between">
              <Button variant="ghost" onClick={() => setCurrentStep(0)}>Retour</Button>
              <Button onClick={placeOrder} isLoading={submitting}>Confirmer la commande</Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Commande confirmée !</h2>
            <p className="text-slate-400 mb-8">Merci pour votre achat. Vous pouvez suivre votre commande dans votre espace.</p>
            <div className="flex justify-center gap-4">
              {orderId && (
                <Link to={`/account/orders/${orderId}`}><Button variant="secondary">Voir ma commande</Button></Link>
              )}
              <Link to="/products"><Button>Continuer mes achats</Button></Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
