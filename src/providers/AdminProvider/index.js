// Modules
import { createContext, useState } from 'react';

export const AdminContext = createContext();

function AdminContextProdiver(props) {
  const { children } = props;

  const [flatId, setFlatId] = useState();
  const [houseComplex, setHouseComplex]= useState({});
  const [hasUserFlats, setHasUserFlats] = useState(false);
  const [hasUserComplex, setHasUserComplex] = useState(true);

  const contextValue = {
    flatId,
    setFlatId,
    houseComplex,
    setHouseComplex,
    hasUserFlats,
    setHasUserFlats,
    hasUserComplex,
    setHasUserComplex,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContextProdiver;
