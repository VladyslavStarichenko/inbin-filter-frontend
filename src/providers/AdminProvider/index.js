// Modules
import { createContext, useState } from 'react';

export const AdminContext = createContext();

function AdminContextProdiver(props) {
  const { children } = props;

  const [flatId, setFlatId] = useState();
  const [residentId, setResidentId] = useState();
  const [houseComplex, setHouseComplex]= useState({});
  const [addNewFlat, setAddNewFlat] = useState(false);
  const [hasUserFlats, setHasUserFlats] = useState(false);
  const [hasUserComplex, setHasUserComplex] = useState(true);

  const contextValue = {
    addNewFlat,
    setAddNewFlat,
    flatId,
    setFlatId,
    residentId,
    setResidentId,
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
