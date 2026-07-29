import ProductService from '../src/services/ProductService';
import Product from '../src/models/Product';
import Category from '../src/models/Category';

jest.mock('../src/models/Product');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return paginated products', async () => {
      const mockData = { rows: [{ id: '1', name: 'Test' }], count: 1 };
      (Product.findAndCountAll as jest.Mock).mockResolvedValue(mockData);

      const result = await ProductService.getAll(1, 10);

      expect(Product.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        limit: 10,
        offset: 0,
        include: [Category]
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('getById', () => {
    it('should return a product by ID', async () => {
      const mockProduct = { id: '1', name: 'Test' };
      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      const result = await ProductService.getById('1');

      expect(result).toEqual(mockProduct);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const mockProduct = { id: '1', name: 'Test' };
      (Product.create as jest.Mock).mockResolvedValue(mockProduct);

      const result = await ProductService.create({ name: 'Test' });

      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const mockProduct = { id: '1', update: jest.fn().mockResolvedValue(true) };
      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await ProductService.update('1', { name: 'Updated' });

      expect(mockProduct.update).toHaveBeenCalledWith({ name: 'Updated' });
    });

    it('should throw if product not found on update', async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(ProductService.update('1', { name: 'Updated' }))
        .rejects.toEqual({ status: 404, message: 'Product not found' });
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const mockProduct = { id: '1', destroy: jest.fn().mockResolvedValue(true) };
      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await ProductService.delete('1');

      expect(mockProduct.destroy).toHaveBeenCalled();
    });
  });
});
