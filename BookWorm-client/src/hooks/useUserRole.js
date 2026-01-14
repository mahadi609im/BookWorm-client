import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUserRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: ['user-data', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const role = userData?.role || 'user';
  const status = userData?.status || 'active';
  const isLoading = authLoading || isRoleLoading;

  return { role, status, isLoading, userData, refetch };
};
export default useUserRole;
