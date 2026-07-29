import { useState, useEffect } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { productService } from '../services/productService';
import { Product } from '../types';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Catalogue</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Trier par :</span>
              <select className="bg-surface border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-primary">
                <option>Recommandé</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
              </select>
            </div>
          </div>
          
          <ProductGrid products={products} loading={loading} />
          
          {!loading && products.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button className="px-6 py-2 border border-slate-700 text-slate-300 rounded-full hover:bg-slate-800 transition-colors">
                Charger plus
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
