import { Router } from 'express';
import * as aiController from '../controllers/aiController';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';

const router = Router();

router.get('/recommendations/:productId', authenticate, aiController.getRecommendations);
router.post('/generate-product', authenticate, isAdmin, aiController.generateProductContent);

export default router;
