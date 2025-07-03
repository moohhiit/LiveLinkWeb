import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function ProtectedRoute({ children }) {
  const { userName } = useAuth()
 
  if (!userName ) {
      return <Navigate to="/login" replace />;
  }

  return children
}

export default ProtectedRoute;
