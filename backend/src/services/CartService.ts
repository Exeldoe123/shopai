import Cart from '../models/Cart';
import CartItem from '../models/CartItem';

export class CartService {
  async getCart(userId: string) {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) cart = await Cart.create({ userId });
    return CartItem.findAll({ where: { cartId: cart.id }, include: ['Product'] });
  }

  async addItem(userId: string, productId: string, quantity: number) {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) cart = await Cart.create({ userId });

    const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (item) {
      return item.update({ quantity: item.quantity + quantity });
    }
    return CartItem.create({ cartId: cart.id, productId, quantity });
  }
}

export default new CartService();
