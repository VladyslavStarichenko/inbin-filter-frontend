// Modules
import { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { isEqual, size } from 'lodash';

// Components
import Drawer from '../../Components/Drawer';
import ErrorMessage from '../../Components/ErrorMessage';
import WarningMessage from '../../Components/WarningMessage';

// Context
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

function StaisticsPage() {
  const {
    setFlatId,
    setFlatAddress,
    houseComplex,
    hasUserFlats,
    setHouseComplex,
    setHasUserFlats,
    setHasUserComplex,
  } = useAdminContext();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getHouseComplexAsync() {
      const response = await api.houseComplex.getHouseComplex();
      const houseComplex = await response.data;
      const hasAnyFlats = !isEqual(size(houseComplex.flats), 0);
      setHouseComplex(houseComplex);
      setHasUserFlats(hasAnyFlats);
    }

    try {
      setIsLoading(true);
      getHouseComplexAsync();
    } catch (error) {
      setHasError(true);
      setHasUserComplex(false);
    } finally {
      setIsLoading(false);
    }

  }, [setHasUserComplex, setHasUserFlats, setHouseComplex]);

  const onFlatClick = useCallback((id, address) => {
    setFlatId(id);
    setFlatAddress(address);
  }, [setFlatId, setFlatAddress]);

  if (isLoading) {
    return <CircularProgress color="success" />;
  }

  if (hasError) {
    return <ErrorMessage />;
  }

  if (!hasUserFlats) {
    return <WarningMessage />;
  }

  return (
    <div className="statistics-page-container">
      <Drawer />
      <div className="house-complex-addresses">
        <h2 className="h-c-header">Addresses of flats in house-complex</h2>
        <div className="addresse-container">
          {houseComplex.flats.map((flat) => {
            const { flatId: id, address } = flat;
            return <div key={id} className="flat-block" onClick={() => onFlatClick(id, address)}>
              <div className="flat-address">Address: {address}</div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default StaisticsPage;
