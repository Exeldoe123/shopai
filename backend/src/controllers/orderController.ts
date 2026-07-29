import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/OrderService';
import Order from '../models/Order';

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order from active cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addressId
 *             properties:
 *               addressId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 */
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { addressId } = req.body;
    const order = await OrderService.createFromCart(userId, addressId);
    res.status(201).json(order);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Create an order directly from a client cart + shipping address
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId: { type: string }
 *                     quantity: { type: integer }
 *               shippingAddress:
 *                 type: object
 *     responses:
 *       201: { description: Order created }
 */
export const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { items, shippingAddress } = req.body;
    const order = await OrderService.createDirect(userId, items, shippingAddress);
    res.status(201).json(order);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /orders/me:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders list
 */
export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const orders = await OrderService.getByUser(userId);
    res.json(orders);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 */
export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await OrderService.getById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const reqUser = (req as any).user;
    // A client can only read their own order; admins can read any.
    if (order.userId !== reqUser.id && reqUser.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(order);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders list
 */
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll({
      include: [
        'OrderItems',
        { association: 'User', attributes: ['id', 'email', 'firstName', 'lastName'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin)
 *     tags: [Orders]
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated
 */
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await OrderService.updateStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) { next(err); }
};
