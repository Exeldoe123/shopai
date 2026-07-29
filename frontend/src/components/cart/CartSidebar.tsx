import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import CartItem from './CartItem';
import Button from '../ui/Button';

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Panier</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-slate-400 py-12">Votre panier est vide</div>
          ) : (
            items.map(item => <CartItem key={item.product.id} item={item} />)
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-slate-900/50">
            <div className="flex justify-between mb-4 font-bold text-white">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <Link to="/cart" onClick={onClose}>
              <Button className="w-full">Voir le panier</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
