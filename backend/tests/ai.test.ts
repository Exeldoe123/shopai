import AIService from '../src/services/AIService';
import Product from '../src/models/Product';
import Order from '../src/models/Order';
import OpenAI from 'openai';

jest.mock('../src/models/Product');
jest.mock('../src/models/Order');

// Mock OpenAI — a single shared instance so the service's `new OpenAI()`
// and the test's `new OpenAI()` point at the SAME `create` spy.
const sharedOpenAIInstance = {
  chat: { completions: { create: jest.fn() } }
};
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => sharedOpenAIInstance);
});

describe('AIService', () => {
  let openaiInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.OPENAI_API_KEY = 'test_key';
    
    // Access the mocked client methods
    const mockedOpenAI = require('openai');
    openaiInstance = new mockedOpenAI();
  });

  describe('getRecommendations', () => {
    it('should use OpenAI to generate recommendations successfully', async () => {
      const mockProduct = { id: '1', name: 'Shoes', categoryId: 'cat1', Category: { name: 'Apparel' } };
      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);
      (Order.findAll as jest.Mock).mockResolvedValue([]);
      
      openaiInstance.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: '["Red Shoes", "Blue Shoes"]' } }]
      });

      const mockResults = [{ name: 'Red Shoes' }, { name: 'Blue Shoes' }];
      (Product.findAll as jest.Mock).mockResolvedValue(mockResults);

      // Force AIService to use the mocked instance
      (AIService as any).openai = openaiInstance;

      const result = await AIService.getRecommendations('1', 'user1');

      expect(result).toEqual(mockResults);
      expect(openaiInstance.chat.completions.create).toHaveBeenCalled();
    });

    it('should fallback to category if OpenAI fails', async () => {
      const mockProduct = { id: '1', name: 'Shoes', categoryId: 'cat1', Category: { name: 'Apparel' } };
      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);
      (Order.findAll as jest.Mock).mockResolvedValue([]);

      openaiInstance.chat.completions.create.mockRejectedValue(new Error('API Down'));

      const fallbackResults = [{ name: 'Category Match 1' }];
      (Product.findAll as jest.Mock).mockResolvedValue(fallbackResults);
      
      (AIService as any).openai = openaiInstance;

      const result = await AIService.getRecommendations('1', 'user1');

      expect(result).toEqual(fallbackResults);
      expect(Product.findAll).toHaveBeenCalledWith({ where: { categoryId: 'cat1' }, limit: 4 });
    });

    it('should throw if product is not found', async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(AIService.getRecommendations('1'))
        .rejects.toEqual({ status: 404, message: 'Product not found' });
    });
  });
});
