import { Link } from 'react-router-dom';
import { Zap, Shield, Truck, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import AIRecommendations from '../components/products/AIRecommendations';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-background pt-16 pb-32 flex items-center min-h-[90vh]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-slate-300">Le futur du e-commerce est là</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white">
              Le commerce <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift bg-[length:200%_auto]">
                réinventé par l'IA
              </span>
            </h1>
            
            <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto mb-10">
              Découvrez des produits sélectionnés spécialement pour vous grâce à nos algorithmes prédictifs. Une expérience d'achat personnalisée, rapide et sécurisée.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto text-lg group">
                  Explorer le catalogue
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors border border-primary/20">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Recommandations IA</h3>
              <p className="text-slate-400">Notre intelligence artificielle analyse vos goûts pour vous proposer les produits parfaits.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors border border-secondary/20">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Paiement Sécurisé</h3>
              <p className="text-slate-400">Transactions chiffrées de bout en bout pour une sécurité maximale de vos données.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors border border-accent/20">
                <Truck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Livraison Express</h3>
              <p className="text-slate-400">Livraison suivie en 24/48h avec prédiction d'arrivée en temps réel.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Catégories Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['High-Tech', 'Mode & Accessoires', 'Maison Connectée', 'Sport & Santé'].map((cat, i) => (
            <Link key={i} to={`/products?category=${cat.toLowerCase()}`} className="relative group overflow-hidden rounded-2xl aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
              <div className={`absolute inset-0 bg-slate-800`} />
              <img src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400&sig=${i}`} alt={cat} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <h3 className="text-xl font-bold text-white mb-2">{cat}</h3>
                <span className="text-sm text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  Voir les produits <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <AIRecommendations />
        </div>
      </section>
    </div>
  );
}
