import { Product } from '../../types';
import ProductCard from './ProductCard';
import { clsx } from 'clsx';
import Spinner from '../ui/Spinner';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function ProductGrid({ products, loading, columns = 3, className }: ProductGridProps) {
  if (loading) {
    return <div className="flex justify-center py-12"><Spinner size={40} /></div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-12 text-slate-400">Aucun produit trouvé.</div>;
  }

  const colsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={clsx("grid gap-6", colsClass[columns], className)}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
