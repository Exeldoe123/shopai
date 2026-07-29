import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export default function Header({ isAdmin = false }: { isAdmin?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItems = useCartStore(state => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-surface/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
               <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
               <Sparkles className="absolute top-1 right-1 w-3 h-3 text-accent animate-pulse" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Shop<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI</span></span>
          </Link>

          {!isAdmin && (
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-slate-300 hover:text-white transition-colors">Accueil</Link>
              <Link to="/products" className="text-slate-300 hover:text-white transition-colors">Catalogue</Link>
              <Link to="/account" className="text-slate-300 hover:text-white transition-colors">Mon Compte</Link>
            </nav>
          )}
          {isAdmin && (
            <nav className="hidden md:flex space-x-8">
              <Link to="/admin" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/admin/products" className="text-slate-300 hover:text-white transition-colors">Produits</Link>
              <Link to="/admin/orders" className="text-slate-300 hover:text-white transition-colors">Commandes</Link>
            </nav>
          )}

          <div className="flex items-center gap-4">
            {!isAdmin && (
              <div className="relative flex items-center">
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}>
                  <input type="text" placeholder="Rechercher..." className="w-full bg-slate-800/50 border border-slate-700 text-sm rounded-full py-1.5 pl-3 pr-8 focus:outline-none focus:border-primary text-white placeholder-slate-400" />
                </div>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition-colors z-10">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {!isAdmin && (
              <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition-colors group">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent rounded-full animate-pulse-glow">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-surface rounded-xl shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <Link to={isAdmin ? "/admin" : "/account"} className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800">Mon Compte</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800">Déconnexion</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-300 hover:text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-surface border-b border-white/10 p-4 absolute w-full">
          <nav className="flex flex-col space-y-4">
            {!isAdmin ? (
              <>
                <Link to="/" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                <Link to="/products" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Catalogue</Link>
                <Link to="/account" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Mon Compte</Link>
              </>
            ) : (
              <>
                <Link to="/admin" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link to="/admin/products" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Produits</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
