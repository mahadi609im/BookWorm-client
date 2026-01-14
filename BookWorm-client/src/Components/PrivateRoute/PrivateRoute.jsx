import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../context/AuthContext';
import useUserRole from '../../hooks/useUserRole';

const PrivateRoute = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { status, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <Loading />;
  }

  if (user && status === 'active') {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
