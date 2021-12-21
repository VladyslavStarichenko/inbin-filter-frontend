// Modules
import { createContext, useState } from 'react';

export const CleanerContext = createContext();

function CleanerContextProdiver(props) {
  const { children } = props;

  const [flatId, setFlatId] = useState();
  const [cleanerFlats, setCleanerFlats] = useState([]);

  const contextValue = {
    cleanerFlats,
    setCleanerFlats,
    flatId,
    setFlatId,
  };

  return (
    <CleanerContext.Provider value={contextValue}>
      {children}
    </CleanerContext.Provider>
  );
}

export default CleanerContextProdiver;
