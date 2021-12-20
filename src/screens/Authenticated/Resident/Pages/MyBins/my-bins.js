// Modules
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { isEqual, size } from 'lodash';

// Components
import BinSquare from '../../../Admin/Components/BinSquare';
import ErrorMessage from '../../../Admin/Components/ErrorMessage';
import WarningMessage from '../../../Admin/Components/WarningMessage';

// Context
import useResidentContext from '../../../../../hooks/useResident/useResidentContext';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

function MyBins() {
  const { flatAddress } = useResidentContext();

  const [noData, setNoData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [binsByFlat, setBinsByFlat] = useState([]);
  const [residentFlatId, setResidentFlatId] = useState();

  useEffect(() => {
    async function getFlatByAddressAsync() {
      const response = await api.flat.getFlatByAddress(flatAddress);
      const data = await response.data;
      setResidentFlatId(data.flatId);
    }

    try {
      setIsLoading(true);
      getFlatByAddressAsync();
    } catch (error) {
      setHasError(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    async function getAllBinsByFlat() {
      const response = await api.bin.getAllBins(residentFlatId);
      const data = await response.data;

      setNoData(isEqual(size(data), 0));
      setBinsByFlat(data);
    }

    try {
      setIsLoading(true);
      getAllBinsByFlat();
    } catch (error) {
      setHasError(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [flatAddress, residentFlatId]);

  if (isLoading) {
    return <div className="resident-bins-loading">
      <CircularProgress color="success" />
    </div>;
  }

  if (hasError) {
    return <div className="resident-bins-error">
      <ErrorMessage />
    </div>;
  }

  if (noData) {
    return <div className="resident-bins-warning">
      <WarningMessage firstPart="There are no bins " secondPart="for you!" />
    </div>
  }

  return (
    <div className="get-all-my-bins-container">
      <div className="my-bins-wrapper">
        <h2 className="my-bins-header">All bins by chosen user</h2>
        <div className="container-for-my-bins">
          {binsByFlat.map((bin) => (
            <BinSquare
              key={bin.id}
              address={bin.address}
              capacity={bin.capacity}
              fill={bin.fill}
              full={bin.full}
              litterType={bin.litterType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBins;
