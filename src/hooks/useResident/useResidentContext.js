// Modules
import { useContext } from 'react';
import { ResidentContext } from '../../providers/ResidentProvider';

function useResidentContext() {
  return useContext(ResidentContext) || {};
}

export default useResidentContext;
