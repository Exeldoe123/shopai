import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export function useProducts(filters?: any, page = 1) {
  return useQuery({
    queryKey: ['products', filters, page],
    queryFn: () => productService.getProducts(filters, page),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });
}
