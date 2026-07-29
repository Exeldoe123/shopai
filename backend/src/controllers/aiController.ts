import { Request, Response, NextFunction } from 'express';
import AIService from '../services/AIService';

export const getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const result = await AIService.getRecommendations(req.params.productId, userId);
    res.json(result);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /ai/generate-product:
 *   post:
 *     summary: Generate a product sheet from name + keywords (Admin)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               keywords: { type: string }
 *     responses:
 *       200: { description: Generated product content }
 */
export const generateProductContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, keywords } = req.body;
    const result = await AIService.generateProductContent(name, keywords);
    res.json(result);
  } catch (err) { next(err); }
};
