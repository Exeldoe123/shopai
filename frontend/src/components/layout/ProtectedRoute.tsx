import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * Client-side guard. The backend already enforces auth + isAdmin on every
 * admin route, so this is a UX layer (hide the admin UI from non-admins),
 * not the security boundary.
 */
export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
