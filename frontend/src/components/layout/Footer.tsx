import { Link } from 'react-router-dom';
import { ShoppingCart, Twitter, Facebook, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 mt-auto pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">ShopAI</span>
            </Link>
            <p className="text-slate-400 text-sm">
              L'expérience e-commerce réinventée grâce à l'intelligence artificielle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Boutique</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-slate-400 hover:text-primary transition-colors text-sm">Tous les produits</Link></li>
              <li><Link to="/products?category=nouveautes" className="text-slate-400 hover:text-primary transition-colors text-sm">Nouveautés</Link></li>
              <li><Link to="/products?category=promos" className="text-slate-400 hover:text-primary transition-colors text-sm">Promotions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-slate-400 hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">Contact</Link></li>
              <li><Link to="/shipping" className="text-slate-400 hover:text-primary transition-colors text-sm">Livraison</Link></li>
              <li><Link to="/returns" className="text-slate-400 hover:text-primary transition-colors text-sm">Retours</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">Inscrivez-vous pour recevoir nos offres exclusives.</p>
            <form className="flex">
              <input type="email" placeholder="Votre email" className="bg-slate-800 border border-slate-700 text-white text-sm rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-primary" />
              <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-r-lg text-sm transition-colors">Ok</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2026 ShopAI. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-slate-500 hover:text-white text-sm transition-colors">Confidentialité</Link>
            <Link to="/terms" className="text-slate-500 hover:text-white text-sm transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
