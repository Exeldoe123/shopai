import { useAuthStore } from '../store/authStore';
import Card from '../components/ui/Card';
import { User, Package, Settings, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function AccountPage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Mon Compte</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          <Link to="/account" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium">
            <User className="w-5 h-5" /> Informations perso
          </Link>
          <Link to="/account/orders" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface rounded-lg transition-colors">
            <Package className="w-5 h-5" /> Mes commandes
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface rounded-lg transition-colors">
            <CreditCard className="w-5 h-5" /> Paiement
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface rounded-lg transition-colors">
            <Settings className="w-5 h-5" /> Paramètres
          </Link>
        </div>
        
        <div className="md:col-span-3 space-y-8">
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Profil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input label="Prénom" defaultValue={user?.firstName || 'John'} />
              <Input label="Nom" defaultValue={user?.lastName || 'Doe'} />
              <Input label="Email" defaultValue={user?.email || 'john.doe@example.com'} type="email" />
            </div>
            <Button>Sauvegarder les modifications</Button>
          </Card>
          
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Mot de passe</h2>
            <div className="space-y-4 mb-6 max-w-md">
              <Input label="Mot de passe actuel" type="password" />
              <Input label="Nouveau mot de passe" type="password" />
              <Input label="Confirmer le mot de passe" type="password" />
            </div>
            <Button variant="secondary">Mettre à jour le mot de passe</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
