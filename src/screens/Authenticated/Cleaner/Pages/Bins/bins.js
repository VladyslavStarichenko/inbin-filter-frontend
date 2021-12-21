// Modules
import { useCallback, useEffect, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

// Components
import CleanerBinSquare from '../../Components/CleanerBinSquare';
import ErrorMessage from '../../../Admin/Components/ErrorMessage';
import WarningMessage from '../../../Admin/Components/WarningMessage';

// Styles
import './styles.scss';

// Hooks
import useCleanerContext from '../../../../../hooks/useCleaner/useCleanerContext';

// Api
import api from '../../../../../api';

function GetAllBinsByFlat() {
  const { flatId } = useCleanerContext();

  const [hasData, setHasData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [binsByFlat, setBinsByFlat] = useState([]);

  const navigate = useNavigate();

  const onBackHandler = useCallback(() => {
    navigate('/cleaner');
  }, [navigate]);

  useEffect(() => {
    async function getAllBinsByFlatAsync() {
      const response = await api.bin.getAllBins(flatId);
      const bins = await response.data;

      setHasData(bins.length !== 0);
      setBinsByFlat(bins);
    }

    try {
      setIsLoading(true);
      getAllBinsByFlatAsync();
    } catch (error) {
      console.log(error.message);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [flatId]);

  if (isLoading) {
    return <div className="cleaner-bins-loading">
      <CircularProgress color="success" />
    </div>;
  }

  if (hasError) {
    return <div className="cleaner-bins-error">
      <Button
        onClick={onBackHandler}
        className="error-btn"
        variant="contained"
        color="primary"
      >
        ← Back
      </Button>
      <ErrorMessage />
    </div>;
  }

  if (!hasData) {
    return <div className="cleaner-bins-warning">
      <Button
          onClick={onBackHandler}
          className="warning-btn"
          variant="contained"
          color="primary"
        >
          ← Back
        </Button>
        <WarningMessage firstPart="There are no bins " secondPart="for this flat!"/>
      </div>;
  }

  return (
    <div className="get-all-cleaner-bins-container">
      <Button
        onClick={onBackHandler}
        className="back-btn"
        variant="contained"
        color="primary"
      >
        ← Back
      </Button>
      <div className="cleaner-bins-wrapper">
        <h2 className="cleaner-bins-header">All bins by chosen flat</h2>
        <div className="cleaner-container-for-bins">
          {binsByFlat.map((bin) => (
            <CleanerBinSquare
              id={bin.id}
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

export default GetAllBinsByFlat;
