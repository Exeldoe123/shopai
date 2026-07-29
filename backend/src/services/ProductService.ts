import { Op } from 'sequelize';
import Product from '../models/Product';
import Category from '../models/Category';

export class ProductService {
  async getAll(page: number = 1, limit: number = 10, search?: string) {
    const offset = (page - 1) * limit;
    const whereClause = search ? { name: { [Op.like]: `%${search}%` } } : {};
    return Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      include: [Category]
    });
  }

  async getById(id: string) {
    return Product.findByPk(id, { include: [Category] });
  }

  async create(data: any) {
    return Product.create(data);
  }

  async update(id: string, data: any) {
    const prod = await Product.findByPk(id);
    if (!prod) throw { status: 404, message: 'Product not found' };
    return prod.update(data);
  }

  async delete(id: string) {
    const prod = await Product.findByPk(id);
    if (!prod) throw { status: 404, message: 'Product not found' };
    return prod.destroy();
  }
}

export default new ProductService();
