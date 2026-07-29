import { Product, Order } from '../types';

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=800';

/**
 * Backend product (Sequelize) → frontend Product.
 * Sequelize returns DECIMAL as string, so price is coerced to a number.
 */
export function mapProduct(raw: any): Product {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug ?? '',
    description: raw.description ?? '',
    price: Number(raw.price ?? 0),
    stock: raw.stock ?? 0,
    images: raw.imageUrl ? [raw.imageUrl] : [PLACEHOLDER_IMG],
    category: raw.Category
      ? { id: raw.Category.id, name: raw.Category.name, slug: raw.Category.slug ?? '' }
      : { id: raw.categoryId ?? '', name: 'Divers', slug: 'divers' },
    tags: (raw.Tags ?? []).map((t: any) => ({ id: t.id, name: t.name })),
    rating: raw.rating ?? 0,
    numReviews: raw.numReviews ?? 0,
    isNew: false,
  };
}

export function mapOrder(raw: any): Order {
  const items = (raw.OrderItems ?? []).map((oi: any) => ({
    product: oi.Product ? mapProduct(oi.Product) : ({ name: 'Produit', price: Number(oi.price) } as any),
    quantity: oi.quantity,
    price: Number(oi.price),
  }));
  return {
    id: raw.id,
    user: raw.User,
    items,
    shippingAddress: raw.Address,
    payment: raw.payment ?? { id: '', method: 'COD', status: 'pending' },
    totalPrice: Number(raw.totalAmount ?? 0),
    status: raw.status,
    createdAt: raw.createdAt,
  } as Order;
}
