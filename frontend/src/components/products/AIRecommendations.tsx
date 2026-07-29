import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { aiService } from '../../services/aiService';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

export default function AIRecommendations({ productId }: { productId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const recs = await aiService.getRecommendations(productId);
        setProducts(recs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, [productId]);

  if (loading) return <div className="py-8 flex justify-center"><Spinner /></div>;
  if (products.length === 0) return null;

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white">Vous pourriez aussi aimer</h2>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Propulsé par l'IA</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
