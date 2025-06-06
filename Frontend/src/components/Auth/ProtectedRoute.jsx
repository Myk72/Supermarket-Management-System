import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/auth.store';

const ProtectedRoute = ({ allowedRoles }) => {
  const { role } = useAuthStore();
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;