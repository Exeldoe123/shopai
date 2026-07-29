import api from './api';
import { Product, PaginatedResponse } from '../types';
import { mapProduct } from './mappers';

export const productService = {
  getProducts: async (filters?: any, page: number = 1): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get('/products', {
      params: { page, limit: 12, search: filters?.search },
    });
    // backend returns { count, rows } (findAndCountAll)
    const rows = data.rows ?? data;
    const total = data.count ?? rows.length;
    return {
      success: true,
      data: rows.map(mapProduct),
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / 12)),
    };
  },

  getProduct: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return mapProduct(data);
  },

  createProduct: async (data: Partial<Product>) => {
    const response = await api.post('/products', data);
    return response.data;
  },
  updateProduct: async (id: string, data: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};
