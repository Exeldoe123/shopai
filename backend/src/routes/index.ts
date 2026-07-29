import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import aiRoutes from './ai';
import categoryRoutes from './categories';
import cartRoutes from './cart';
import orderRoutes from './orders';
import adminRoutes from './admin';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/ai', aiRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

export default router;
