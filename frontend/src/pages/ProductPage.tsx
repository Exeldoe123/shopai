import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/productService';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import AIRecommendations from '../components/products/AIRecommendations';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await productService.getProduct(id);
          setProduct(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size={48} /></div>;
  if (!product) return <div className="text-center py-20 text-white">Produit introuvable</div>;

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${qty}x ${product.name} ajouté au panier`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        <div className="w-full lg:w-1/2">
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface border border-white/5 mb-4">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4">
            {[product.images[0], product.images[0], product.images[0]].map((img, i) => (
              <div key={i} className="w-24 h-24 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-colors">
                 <img src={img} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="text-primary font-medium">{product.category.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-slate-600'}`} />
              ))}
            </div>
            <span className="text-slate-400">{product.rating} ({product.numReviews} avis)</span>
          </div>
          
          <div className="text-4xl font-bold text-white mb-6">
            {product.price.toFixed(2)} €
            {product.originalPrice && (
              <span className="text-xl text-slate-500 line-through ml-4">{product.originalPrice.toFixed(2)} €</span>
            )}
          </div>
          
          <p className="text-slate-300 mb-8 leading-relaxed">
            {product.description}
          </p>
          
          <div className="bg-surface border border-white/5 p-6 rounded-2xl mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-slate-300">Quantité</div>
              <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-slate-400 hover:text-white">-</button>
                <span className="w-12 text-center text-white font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 text-slate-400 hover:text-white">+</button>
              </div>
              <span className="text-sm text-slate-500">{product.stock} en stock</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="w-5 h-5 mr-2" /> Ajouter au panier
              </Button>
              <Button size="lg" variant="secondary" className="flex-1">
                Acheter maintenant
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-8">
             <div className="flex flex-col items-center text-center p-4">
               <Truck className="w-6 h-6 text-primary mb-2" />
               <span className="text-sm text-slate-300">Livraison gratuite 48h</span>
             </div>
             <div className="flex flex-col items-center text-center p-4">
               <ShieldCheck className="w-6 h-6 text-primary mb-2" />
               <span className="text-sm text-slate-300">Garantie 2 ans</span>
             </div>
             <div className="flex flex-col items-center text-center p-4">
               <RotateCcw className="w-6 h-6 text-primary mb-2" />
               <span className="text-sm text-slate-300">Retours sous 30 jours</span>
             </div>
          </div>
        </div>
      </div>
      
      <AIRecommendations productId={product.id} />
    </div>
  );
}
