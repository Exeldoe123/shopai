import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 p-4 bg-surface rounded-xl border border-white/5">
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-white line-clamp-1">{item.product.name}</h4>
            <p className="text-sm text-slate-400 mt-1">{item.product.price.toFixed(2)} €</p>
          </div>
          <button 
            onClick={() => removeItem(item.product.id)}
            className="text-slate-500 hover:text-red-500 p-1 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button 
              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-white w-4 text-center">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-bold text-white">{(item.product.price * item.quantity).toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}
