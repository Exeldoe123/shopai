import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';

const router = Router();

router.use(authenticate);

router.post('/', orderController.createOrder);
router.post('/checkout', orderController.checkout);
router.get('/me', orderController.getMyOrders);
router.get('/:id', orderController.getOrder);

// Admin routes
router.get('/', isAdmin, orderController.getAllOrders);
router.put('/:id/status', isAdmin, orderController.updateOrderStatus);

export default router;
