import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import Card from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState<{ captchaId: string; question: string } | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const loadCaptcha = useCallback(async () => {
    try {
      setCaptcha(await authService.getCaptcha());
      setCaptchaAnswer('');
    } catch {
      toast.error('Backend injoignable (CAPTCHA)');
    }
  }, []);

  useEffect(() => { loadCaptcha(); }, [loadCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha) return;
    setLoading(true);
    try {
      const res = await authService.login({
        email, password,
        captchaId: captcha.captchaId,
        captchaAnswer,
      });
      login(res.user, res.token);
      toast.success('Connexion réussie');
      navigate(res.user.role === 'admin' ? '/admin' : '/');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Erreur de connexion');
      loadCaptcha(); // captcha is single-use → refresh
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bon retour !</h1>
          <p className="text-slate-400">Connectez-vous pour accéder à votre espace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Email" type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" />
          <Input label="Mot de passe" type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)} />

          {/* CAPTCHA */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Vérification anti-robot</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 h-10 select-none">
                <span className="text-white font-mono tracking-wider">{captcha?.question ?? '…'}</span>
                <button type="button" onClick={loadCaptcha} className="text-slate-400 hover:text-white" title="Nouveau défi">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <Input type="number" required value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)} placeholder="Réponse" className="flex-1" />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={loading} disabled={!captcha}>
            Se connecter
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover font-medium">S'inscrire</Link>
        </div>
      </Card>
    </div>
  );
}
