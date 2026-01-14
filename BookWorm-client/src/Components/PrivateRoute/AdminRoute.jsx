import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../Loading/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { role, isLoading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) {
    return <Loading />;
  }

  if (user && role === 'admin') {
    return children;
  }

  return <Navigate to="/forbidden" />;
};

export default AdminRoute;
