import api from './api';
import { Order } from '../types';
import { mapOrder } from './mappers';

interface CheckoutPayload {
  items: { productId: string; quantity: number }[];
  shippingAddress: { street: string; city: string; postalCode: string; country: string };
}

export const orderService = {
  checkout: async (payload: CheckoutPayload): Promise<Order> => {
    const { data } = await api.post('/orders/checkout', payload);
    return mapOrder(data);
  },
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await api.get('/orders/me');
    return (Array.isArray(data) ? data : []).map(mapOrder);
  },
  getOrder: async (id: string): Promise<Order> => {
    const { data } = await api.get(`/orders/${id}`);
    return mapOrder(data);
  },
};
