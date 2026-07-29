import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';

export default function CartPage() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
          <ShoppingBag className="w-10 h-10 text-slate-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Votre panier est vide</h1>
        <p className="text-slate-400 mb-8">L'IA de ShopAI peut vous aider à trouver ce que vous cherchez.</p>
        <Link to="/products">
          <Button size="lg">Explorer le catalogue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Mon Panier</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-4">
          {items.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
        
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-surface rounded-2xl p-6 border border-white/5 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Résumé de la commande</h2>
            
            <div className="space-y-3 text-sm text-slate-300 mb-6">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="text-green-400">Gratuite</span>
              </div>
              <div className="border-t border-white/10 my-4 pt-4 flex justify-between font-bold text-lg text-white">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button size="lg" className="w-full group">
                Passer la commande <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="mt-4 text-xs text-center text-slate-500">
              Paiement 100% sécurisé. Retours gratuits sous 30 jours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
