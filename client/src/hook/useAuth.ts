import { useContext } from 'react';
import { HomeContext } from '../store/HomeContext';

interface UserRole {
  roles: string[] ;
  permissions: string[];
}

const useAuth = () => {
  const context = useContext(HomeContext);
  const { roles, permissions }: UserRole = context as UserRole;
  const hasRole = (role: string) => {
    return roles.includes(role);
  };

  const hasPermissions = (permission: string) => {
    return permissions.includes(permission);
  };

  return { hasRole, hasPermissions };
};

export default useAuth;
