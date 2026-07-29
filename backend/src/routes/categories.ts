import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';

const router = Router();

router.get('/', categoryController.getCategories);
router.post('/', authenticate, isAdmin, categoryController.createCategory);
router.get('/:id', categoryController.getCategory);
router.put('/:id', authenticate, isAdmin, categoryController.updateCategory);
router.delete('/:id', authenticate, isAdmin, categoryController.deleteCategory);

export default router;
