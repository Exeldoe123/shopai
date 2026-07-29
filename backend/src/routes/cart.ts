import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/items', cartController.addToCart);
router.put('/items/:id', cartController.updateCartItem);
router.delete('/items/:id', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

export default router;
