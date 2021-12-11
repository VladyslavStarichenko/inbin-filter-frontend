// Modules
import { useCallback, useEffect, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { isEqual, size } from 'lodash';

// Components
import BinSquare from '../../Components/BinSquare';
import ErrorMessage from '../../Components/ErrorMessage';
import WarningMessage from '../../Components/WarningMessage';

// Styles
import './styles.scss';

// Hooks
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Api
import api from '../../../../../api';

function GetAllBinsByFlat() {
  const { flatId } = useAdminContext();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [binsByFlat, setBinsByFlat] = useState([]);

  const navigate = useNavigate();

  const onBackHandler = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  useEffect(() => {
    async function getAllBinsByFlat() {
      const response = await api.bin.getAllBins(flatId);
      const bins = await response.data;
      setBinsByFlat(bins);
    }

    try {
      setIsLoading(true);
      getAllBinsByFlat();
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [flatId]);

  let contentOfPage;

  if (isLoading) {
    contentOfPage = (
      <CircularProgress color="success" />
    );
  }

  if (!isEqual(error, {})) {
    contentOfPage = <ErrorMessage />;
  }

  if (isEqual(size(binsByFlat), 0)) {
    contentOfPage = <WarningMessage firstPart="There are no bins " secondPart="for this flat!"/>;
  } else {
    contentOfPage = (
      <div className="bins-wrapper">
        <h2 className="bins-header">All bins by chosen flat</h2>
        <div className="container-for-bins">
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
    );
  }

  return (
    <div className="get-all-bins-container">
      <Button
        onClick={onBackHandler}
        className="back-btn"
        variant="contained"
        color="primary"
      >
        ← Back
      </Button>
      {contentOfPage}
    </div>
  );
}

export default GetAllBinsByFlat;
