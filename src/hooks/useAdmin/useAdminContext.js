// Modules
import { useContext } from 'react';
import { AdminContext } from '../../providers/AdminProvider';

function useAdminContext() {
  return useContext(AdminContext) || {};
}

export default useAdminContext;
