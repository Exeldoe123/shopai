import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import CartItem from '../models/CartItem';
import Product from '../models/Product';
import Address from '../models/Address';
import sequelize from '../config/database';

interface CheckoutItem { productId: string; quantity: number; }
interface ShippingAddress { street: string; city: string; postalCode: string; country: string; }

export class OrderService {
  /**
   * Create an order directly from a list of items (client-side cart) + a shipping address.
   * Prices are ALWAYS recomputed from the database — the client price is never trusted.
   */
  async createDirect(userId: string, items: CheckoutItem[], shipping: ShippingAddress) {
    if (!items || items.length === 0) throw { status: 400, message: 'Cart is empty' };

    return sequelize.transaction(async (t) => {
      const address = await Address.create({ userId, ...shipping }, { transaction: t });

      let totalAmount = 0;
      const lines: { productId: string; quantity: number; price: number }[] = [];

      for (const it of items) {
        const product = await Product.findByPk(it.productId, { transaction: t });
        if (!product) throw { status: 404, message: `Product ${it.productId} not found` };
        if (product.stock < it.quantity) throw { status: 400, message: `Stock insuffisant pour ${product.name}` };
        const price = Number(product.price);
        totalAmount += price * it.quantity;
        lines.push({ productId: product.id, quantity: it.quantity, price });
        // Decrement stock
        await product.update({ stock: product.stock - it.quantity }, { transaction: t });
      }

      const order = await Order.create(
        { userId, addressId: address.id, totalAmount, status: 'pending' },
        { transaction: t }
      );

      for (const line of lines) {
        await OrderItem.create({ orderId: order.id, ...line }, { transaction: t });
      }

      return this.getById(order.id, t);
    });
  }

  /** Legacy: build an order from the server-side cart. */
  async createFromCart(userId: string, addressId: string) {
    const items = await CartItem.findAll({ where: { '$Cart.userId$': userId }, include: ['Cart', 'Product'] });
    if (!items.length) throw { status: 400, message: 'Cart is empty' };

    let totalAmount = 0;
    for (const item of items) {
      const product: any = item.get('Product');
      totalAmount += item.quantity * Number(product.price);
    }

    const order = await Order.create({ userId, addressId, totalAmount, status: 'pending' });
    for (const item of items) {
      const product: any = item.get('Product');
      await OrderItem.create({ orderId: order.id, productId: product.id, quantity: item.quantity, price: Number(product.price) });
    }
    return order;
  }

  async getById(id: string, transaction?: any) {
    return Order.findByPk(id, {
      include: [
        { model: OrderItem, include: [Product] },
        Address,
      ],
      transaction,
    });
  }

  async getByUser(userId: string) {
    return Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, include: [Product] }],
      order: [['createdAt', 'DESC']],
    });
  }

  async updateStatus(id: string, status: string) {
    const order = await Order.findByPk(id);
    if (!order) throw { status: 404, message: 'Order not found' };
    return order.update({ status });
  }
}

export default new OrderService();
