import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', authenticate, isAdmin, productController.createProduct);
router.put('/:id', authenticate, isAdmin, productController.updateProduct);
router.delete('/:id', authenticate, isAdmin, productController.deleteProduct);

export default router;
