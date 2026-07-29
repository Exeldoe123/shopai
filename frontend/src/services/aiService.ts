import api from './api';
import { Product } from '../types';
import { mapProduct } from './mappers';
import { productService } from './productService';

export const aiService = {
  getRecommendations: async (productId?: string): Promise<Product[]> => {
    // Without a product context (e.g. homepage), just show a few catalog items.
    if (!productId) {
      const res = await productService.getProducts();
      return res.data.slice(0, 3);
    }
    try {
      const { data } = await api.get(`/ai/recommendations/${productId}`);
      return (Array.isArray(data) ? data : []).map(mapProduct);
    } catch {
      // Recommendations require auth; fall back gracefully for guests.
      const res = await productService.getProducts();
      return res.data.filter((p) => p.id !== productId).slice(0, 3);
    }
  },
};
