import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge variant="info">Nouveau</Badge>}
            {product.originalPrice && <Badge variant="danger">Promo</Badge>}
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <Button variant="primary" className="rounded-full w-12 h-12 p-0" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="text-xs text-primary mb-2 font-medium">{product.category.name}</div>
          <h3 className="text-lg font-semibold text-white mb-1 truncate">{product.name}</h3>
          
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm text-slate-300">{product.rating}</span>
            <span className="text-xs text-slate-500">({product.numReviews})</span>
          </div>
          
          <div className="flex items-end justify-between mt-4">
            <div>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through mr-2">{product.originalPrice.toFixed(2)} €</span>
              )}
              <span className="text-xl font-bold text-white">{product.price.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
