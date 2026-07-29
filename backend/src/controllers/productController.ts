import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/ProductService';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const result = await ProductService.getAll(page, limit, search);
    res.json(result);
  } catch (err) { next(err); }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductService.getById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json(result);
  } catch (err) { next(err); }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductService.create(req.body);
    res.status(201).json(result);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Product updated }
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) { next(err); }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Product deleted }
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductService.delete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
