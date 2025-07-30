import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';


const ProtectedRoute = () => {
  const auth = isAuthenticated();

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;