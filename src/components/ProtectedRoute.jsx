import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  console.log('ProtectedRoute - user:', user, 'loading:', loading); 

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}