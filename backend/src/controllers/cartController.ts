import { Request, Response, NextFunction } from 'express';
import CartService from '../services/CartService';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved
 */
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const cart = await CartService.getCart(userId);
    res.json(cart);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Add an item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added
 */
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { productId, quantity } = req.body;
    const item = await CartService.addItem(userId, productId, quantity);
    res.status(201).json(item);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /cart/items/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item updated
 */
export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    const updated = await item.update({ quantity });
    res.json(updated);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /cart/items/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item removed
 */
export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear the entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Cart cleared
 */
export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const cart = await Cart.findOne({ where: { userId } });
    if (cart) {
      await CartItem.destroy({ where: { cartId: cart.id } });
    }
    res.status(204).send();
  } catch (err) { next(err); }
};
