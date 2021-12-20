// Modules
import { createContext, useState } from 'react';

export const ResidentContext = createContext();

function ResidentContextProdiver(props) {
  const { children } = props;

  const [residentId, setResidentId] = useState();
  const [flatAddress, setFlatAddress] = useState();

  const contextValue = {
    residentId,
    setResidentId,
    flatAddress,
    setFlatAddress,
  };

  return (
    <ResidentContext.Provider value={contextValue}>
      {children}
    </ResidentContext.Provider>
  );
}

export default ResidentContextProdiver;
