import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary opacity-50 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-6">Page introuvable</h2>
      <p className="text-slate-400 max-w-md mb-8">L'URL que vous cherchez n'existe pas ou a été déplacée. Notre IA n'a pas pu la localiser.</p>
      <Link to="/">
        <Button size="lg">Retour à l'accueil</Button>
      </Link>
    </div>
  );
}
