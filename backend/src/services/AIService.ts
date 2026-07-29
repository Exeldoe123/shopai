import OpenAI from 'openai';
import Product from '../models/Product';
import OrderItem from '../models/OrderItem';
import Order from '../models/Order';

// Lazy init: resolve the client at call time so the API key (and test mocks)
// are read when the method actually runs, not once at module import.
function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export class AIService {
  /**
   * Get AI-driven product recommendations.
   * Falls back to basic category-based filtering if OpenAI fails or isn't configured.
   */
  async getRecommendations(productId: string, userId?: string, limit = 4) {
    const product = await Product.findByPk(productId, { include: ['Category', 'Tags'] });
    if (!product) throw { status: 404, message: 'Product not found' };

    let history = '';
    if (userId) {
      const orders = await Order.findAll({ where: { userId }, include: [{ model: OrderItem, include: ['Product'] }] });
      history = orders.map(o => o.get('OrderItems')).flat().map((item: any) => item.Product.name).join(', ');
    }

    const openai = getClient();
    if (openai) {
      try {
        const prompt = `Recommend ${limit} products similar to "${product.name}" in category "${(product as any).Category?.name}". User purchase history: [${history}]. Return ONLY a JSON array of exact product names.`;
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }]
        });
        const names = JSON.parse(response.choices[0].message.content || '[]');
        return Product.findAll({ where: { name: names }, limit });
      } catch (err) {
        console.error('OpenAI Error', err);
      }
    }

    // Fallback logic
    return Product.findAll({ where: { categoryId: product.categoryId }, limit });
  }

  /**
   * Generate a full product sheet from a name + a few keywords (admin back-office).
   * Returns { title, description, features[], seoTags[] }.
   * Falls back to a template-based generator if OpenAI isn't configured or fails.
   */
  async generateProductContent(name: string, keywords: string = '') {
    if (!name || !name.trim()) throw { status: 400, message: 'Product name is required' };

    const openai = getClient();
    if (openai) {
      try {
        const prompt = `Tu es un rédacteur e-commerce. À partir du nom de produit "${name}" et des mots-clés "${keywords}", génère une fiche produit en français.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, au format:
{"title": "titre accrocheur", "description": "description marketing de 2-3 phrases", "features": ["carac 1","carac 2","carac 3"], "seoTags": ["tag1","tag2","tag3"]}`;
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        });
        const parsed = JSON.parse(response.choices[0].message.content || '{}');
        return {
          title: parsed.title || name,
          description: parsed.description || '',
          features: Array.isArray(parsed.features) ? parsed.features : [],
          seoTags: Array.isArray(parsed.seoTags) ? parsed.seoTags : [],
          source: 'openai'
        };
      } catch (err) {
        console.error('OpenAI Error (generateProductContent)', err);
      }
    }

    // Deterministic fallback so the feature is demoable without an API key.
    const kw = keywords.split(',').map(k => k.trim()).filter(Boolean);
    return {
      title: `${name} — Édition Premium`,
      description: `Découvrez ${name}, conçu pour allier performance et style${kw.length ? ` : ${kw.join(', ')}` : ''}. Un choix idéal pour les utilisateurs exigeants.`,
      features: kw.length ? kw.map(k => `Optimisé pour ${k}`) : ['Qualité premium', 'Design moderne', 'Garantie incluse'],
      seoTags: [name.toLowerCase().replace(/\s+/g, '-'), ...kw.map(k => k.toLowerCase())].slice(0, 6),
      source: 'fallback'
    };
  }
}

export default new AIService();
