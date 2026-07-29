import api from './api';

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  topProducts: { productId: string; totalSold: number }[];
  recentOrders: any[];
  ordersByStatus: Record<string, number>;
  lowStockProducts: { id: string; name: string; stock: number }[];
  monthlySales: { month: string; revenue: number }[];
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'admin';
  isActive: boolean;
  createdAt: string;
}

export interface GeneratedProduct {
  title: string;
  description: string;
  features: string[];
  seoTags: string[];
  source: 'openai' | 'fallback';
}

export const adminService = {
  // Dashboard
  getDashboard: async (): Promise<DashboardStats> => {
    const { data } = await api.get('/admin/dashboard');
    return data;
  },

  // Users
  getUsers: async (): Promise<AdminUser[]> => {
    const { data } = await api.get('/admin/users');
    return data;
  },
  updateUserStatus: async (id: string, isActive: boolean) => {
    const { data } = await api.put(`/admin/users/${id}/status`, { isActive });
    return data;
  },
  updateUser: async (id: string, payload: Partial<AdminUser>) => {
    const { data } = await api.put(`/admin/users/${id}`, payload);
    return data;
  },
  deleteUser: async (id: string) => {
    await api.delete(`/admin/users/${id}`);
  },

  // Activity logs
  getLogs: async (page = 1, limit = 20) => {
    const { data } = await api.get('/admin/logs', { params: { page, limit } });
    return data as { total: number; pages: number; data: any[] };
  },

  // Orders (admin)
  getOrders: async (): Promise<any[]> => {
    const { data } = await api.get('/orders');
    return data;
  },
  updateOrderStatus: async (id: string, status: string) => {
    const { data } = await api.put(`/orders/${id}/status`, { status });
    return data;
  },

  // Products (admin CRUD)
  getProducts: async () => {
    const { data } = await api.get('/products', { params: { limit: 100 } });
    // backend returns { count, rows } from findAndCountAll
    return (data.rows ?? data) as any[];
  },
  createProduct: async (payload: any) => {
    const { data } = await api.post('/products', payload);
    return data;
  },
  updateProduct: async (id: string, payload: any) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
  },
  deleteProduct: async (id: string) => {
    await api.delete(`/products/${id}`);
  },

  // AI product-sheet generation (Option B)
  generateProductContent: async (name: string, keywords: string): Promise<GeneratedProduct> => {
    const { data } = await api.post('/ai/generate-product', { name, keywords });
    return data;
  },

  // Categories (for the product form dropdown)
  getCategories: async (): Promise<{ id: string; name: string }[]> => {
    const { data } = await api.get('/categories');
    return data.rows ?? data;
  },
};
