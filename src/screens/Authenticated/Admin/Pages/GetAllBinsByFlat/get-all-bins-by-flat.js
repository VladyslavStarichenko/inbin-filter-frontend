// Modules
import React, { useEffect, useState } from 'react';
import { isEqual, size } from 'lodash';
import { CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@mui/material';

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
      <div className="loading-container">
        <CircularProgress color="success" />
      </div>
    );
  }

  if (!isEqual(error, {})) {
    contentOfPage = (
      <div className="error-block">
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      </div>
    );
  }

  if (isEqual(size(binsByFlat), 0)) {
    contentOfPage = (
      <div className="no-bins-container">
        There are no bins in chosen flat.
      </div>
    );
  } else {
    contentOfPage = (
      <React.Fragment>
        <h2>All bins</h2>
        <div className="container-for-bins">
          {binsByFlat.map((bin) => {
            return <div key={bin.id}>JSON.stringify(bin)</div>;
          })}
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="get-all-bins-container">
      {contentOfPage}
    </div>
  );
}

export default GetAllBinsByFlat;
