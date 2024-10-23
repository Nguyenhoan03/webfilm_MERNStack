import { useState, useEffect, useCallback } from 'react';
import { Getalluser, Update_user_roles, Update_user_permission } from '../../services/Users';

interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  roles: string;
  permissions: string[];
}

interface UsePageUserReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  handleRoleChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => Promise<void>;
  handlePermissionChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, permissionType: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

export const usePageUser = (): UsePageUserReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await Getalluser();
      if (data && data.data) {
        setUsers(data.data);
      } else {
        throw new Error('No data received from server');
      }
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    try {
      const editedRoles = e.target.value;
      const idUserUpdate = users[index].id;
      const data = await Update_user_roles(idUserUpdate, editedRoles);
      if (data && data.success) {
        setUsers(prevUsers => {
          const newUsers = [...prevUsers];
          newUsers[index].roles = editedRoles;
          return newUsers;
        });
        alert(`Updated role for user ${users[index].username} successfully`);
      } else {
        throw new Error('Failed to update user role');
      }
    } catch (error) {
      setError('Failed to update user role');
      console.error(error);
    }
  };

  const handlePermissionChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number, permissionType: string) => {
    try {
      const idUserUpdate = users[index].id;
      const isChecked = e.target.checked;

      const editedPermissions = isChecked
        ? [...users[index].permissions, permissionType]
        : users[index].permissions.filter(permission => permission !== permissionType);

      const data = await Update_user_permission(idUserUpdate, editedPermissions);
      if (data && data.success) {
        setUsers(prevUsers => {
          const newUsers = [...prevUsers];
          newUsers[index].permissions = editedPermissions;
          return newUsers;
        });
        alert(`Updated permissions for user ${users[index].username} successfully`);
      } else {
        throw new Error('Failed to update user permissions');
      }
    } catch (error) {
      setError('Failed to update user permissions');
      console.error(error);
    }
  };

  return {
    users,
    loading,
    error,
    handleRoleChange,
    handlePermissionChange,
    refreshUsers: fetchAllUsers
  };
};