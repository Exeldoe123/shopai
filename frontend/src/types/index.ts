export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  category: Category;
  tags: Tag[];
  rating: number;
  numReviews: number;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Payment {
  id: string;
  method: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  shippingAddress: Address;
  payment: Payment;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AIRecommendation {
  id: string;
  productId: string;
  reason: string;
  score: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
