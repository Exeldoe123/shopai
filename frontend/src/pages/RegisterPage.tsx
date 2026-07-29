import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    try {
      const res = await authService.register({
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, password: form.password,
      });
      login(res.user, res.token);
      toast.success('Compte créé !');
      navigate('/');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Inscription impossible (mot de passe trop faible ?)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Créer un compte</h1>
          <p className="text-slate-400">Rejoignez l'expérience e-commerce IA.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Prénom" required placeholder="John" value={form.firstName} onChange={set('firstName')} />
            <Input label="Nom" required placeholder="Doe" value={form.lastName} onChange={set('lastName')} />
          </div>
          <Input label="Email" type="email" required placeholder="vous@exemple.com" value={form.email} onChange={set('email')} />
          <Input label="Mot de passe" type="password" required value={form.password} onChange={set('password')} />
          <p className="text-xs text-slate-500 -mt-4">Min. 8 caractères, avec majuscule, chiffre et caractère spécial.</p>
          <Input label="Confirmer le mot de passe" type="password" required value={form.confirm} onChange={set('confirm')} />

          <Button type="submit" className="w-full" size="lg" isLoading={loading}>Créer mon compte</Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium">Se connecter</Link>
        </div>
      </Card>
    </div>
  );
}
