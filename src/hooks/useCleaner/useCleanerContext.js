// Modules
import { useContext } from 'react';
import { CleanerContext } from '../../providers/CleanerProvider';

function useCleanerContext() {
  return useContext(CleanerContext) || {};
}

export default useCleanerContext;
