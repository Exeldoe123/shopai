import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import ActivityLog from '../models/ActivityLog';
import Product from '../models/Product';
import sequelize from '../config/database';

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats
 */
export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalUsers = await User.count();
    const totalOrders = await Order.count();
    const totalRevenue = await Order.sum('totalAmount');
    
    // Simplification for top products
    const topProducts = await OrderItem.findAll({
      attributes: ['productId', [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold']],
      group: ['productId'],
      order: [[sequelize.literal('totalSold'), 'DESC']],
      limit: 5
    });
    
    const recentOrders = await Order.findAll({ limit: 5, order: [['createdAt', 'DESC']] });

    // Orders grouped by status (for a pie/summary in the dashboard)
    const ordersByStatusRaw = await Order.findAll({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status']
    });
    const ordersByStatus = ordersByStatusRaw.reduce((acc: Record<string, number>, row: any) => {
      acc[row.get('status')] = parseInt(row.get('count'));
      return acc;
    }, {});

    // Low-stock products (stock < 20) so the admin can restock
    const lowStockProducts = await Product.findAll({
      where: sequelize.where(sequelize.col('stock'), '<', 20),
      attributes: ['id', 'name', 'stock'],
      order: [['stock', 'ASC']],
      limit: 10
    });

    // Revenue per month (last 6 months) for the sales chart
    const monthlySales = await Order.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'revenue']
      ],
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m')],
      order: [[sequelize.literal('month'), 'ASC']],
      limit: 6
    });

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue || 0,
      topProducts,
      recentOrders,
      ordersByStatus,
      lowStockProducts,
      monthlySales
    });
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /admin/users/{id}/status:
 *   put:
 *     summary: Activate/Deactivate user
 *     tags: [Admin]
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
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User status updated
 */
export const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const updated = await user.update({ isActive: req.body.isActive });
    res.json({ id: updated.id, isActive: updated.isActive });
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Update a user's details or role (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User updated }
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { firstName, lastName, email, role } = req.body;
    const reqUser = (req as any).user;

    // Garde-fou : un admin ne peut pas se retirer à lui-même son rôle admin
    if (reqUser.id === user.id && role && role !== 'admin') {
      return res.status(400).json({ error: 'Vous ne pouvez pas retirer votre propre rôle admin' });
    }

    const updated = await user.update({
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
      email: email ?? user.email,
      role: role ?? user.role,
    });

    const { password, ...safe } = updated.toJSON() as any;
    res.json(safe);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: User deleted }
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const reqUser = (req as any).user;
    // Garde-fou : un admin ne peut pas se supprimer lui-même
    if (reqUser.id === user.id) {
      return res.status(400).json({ error: 'Vous ne pouvez pas supprimer votre propre compte' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /admin/logs:
 *   get:
 *     summary: Get activity logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of logs
 */
export const getLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const logs = await ActivityLog.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: logs.count,
      pages: Math.ceil(logs.count / limit),
      data: logs.rows
    });
  } catch (err) { next(err); }
};
