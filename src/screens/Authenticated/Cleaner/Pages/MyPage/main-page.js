// Modules
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

// Components
import CleanerFlatSquare from '../../Components/CleanerFlatSquare';
import ErrorMessage from '../../../Admin/Components/ErrorMessage';

// Context
import useCleanerContext from '../../../../../hooks/useCleaner/useCleanerContext';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

function MainPage() {
  const {
    cleanerFlats,
    setCleanerFlats,
  } = useCleanerContext();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getFlatsAsync() {
      const response = await api.cleaner.getFlats();
      const flats = await response.data;
      setCleanerFlats(flats);
      console.log(flats);
    }

    try {
      setIsLoading(true);
      getFlatsAsync();
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [setCleanerFlats]);

  if (isLoading) {
    return <div className="cleaner-flats-loading">
      <CircularProgress color="success" />
    </div>
  }

  if (hasError) {
    return <div className="cleaner-flats-error">
      <ErrorMessage />
    </div>
  }

  return (
    <div className="cleaner-flat-container">
      <div>
        <h2 className="cleaner-flat-header">Your house-complex</h2>
        <div className="cleaner-flat-wrapper">
          {cleanerFlats.map((flat) => {
            const { flatId: id, address } = flat;
            return (
              <CleanerFlatSquare
                key={id}
                id={id}
                address={address}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
