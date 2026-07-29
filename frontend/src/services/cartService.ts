import api from './api';
import { Cart } from '../types';

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart');
    return response.data.data;
  },
  addItem: async (productId: string, quantity: number) => {
    const response = await api.post('/cart/items', { productId, quantity });
    return response.data.data;
  },
  updateItem: async (productId: string, quantity: number) => {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response.data.data;
  },
  removeItem: async (productId: string) => {
    const response = await api.delete(`/cart/items/${productId}`);
    return response.data.data;
  },
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data.data;
  }
};
