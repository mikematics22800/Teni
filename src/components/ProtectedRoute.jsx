import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../firebase/auth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (location.pathname === '/') {
    return <Navigate to={`/${user.uid}`} replace />;
  }

  return children;
} 