// Modules
import { useCallback, useEffect, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { isEqual, size } from 'lodash';
import React from 'react';
import cx from 'classnames';

// Components
import ErrorMessage from '../../Components/ErrorMessage';
import ResidentSquare from '../../Components/ResidentSquare';
import WarningMessage from '../../Components/WarningMessage';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

function GetAllResidentsByFlat() {
  const { flatId } = useAdminContext();
  const [error, setError] = useState(null);
  const [numPage, setNumPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [residentsByFlat, setResidentsByFlat] = useState([]);

  const navigate = useNavigate();

  const onIncrement = useCallback(() => {
    setNumPage((prev) => prev + 1);
  }, []);

  const onDecrement = useCallback(() => {
    setNumPage((prev) => prev - 1);
  }, []);

  const onBackHandler = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  useEffect(() => {
    async function getAllResidentsByFlat() {
      const request = { id: flatId, pageNumber: numPage, pageSize: 3};
      const response = await api.resident.getAllFlatResidents(request);
      const residents = await response.data;

      if (!isEqual(numPage, 0) && isEqual(size(residents.residentGetDtoList), 0)) {
        setNumPage((prev) => prev - 1);
      } else {
        setResidentsByFlat(residents);
        setTotalPages(residents.totalPages - 1);
      }
    }

    try {
      setIsLoading(true);
      getAllResidentsByFlat();
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [flatId, numPage]);

  let contentOfPage;

  if (isLoading) {
    contentOfPage = (
      <CircularProgress color="success" />
    );
  }

  if (!isEqual(error, null)) {
    contentOfPage = <ErrorMessage />;
  }

  if (isEqual(size(residentsByFlat.residentGetDtoList), 0)) {
    contentOfPage = <WarningMessage firstPart="There are no residents " secondPart="in this flat!"/>;
  } else {
    contentOfPage = (
      <div className="residents-wrapper">
        <h2 className="resident-header">All residents by chosen flat</h2>
        <div className="container-for-residents">
          {residentsByFlat.residentGetDtoList.map((resident) => {
            return (
              <ResidentSquare
                address={resident.address}
                key={resident.id}
                name={resident.name}
                id={resident.id}
              />
            );
          })}
        </div>
        <div className="controls-container">
          {isEqual(numPage, 0) ? (
            <Button
              onClick={onIncrement}
              className={cx('next-btn', { nonext: (isEqual(totalPages, numPage)) })}
              variant="contained"
              color="primary"
            >
              Next Page
            </Button>
          ) : (
            <>
              <Button
                onClick={onIncrement}
                className={cx('next-btn', { nonext: (isEqual(totalPages, numPage)) })}
                variant="contained"
                color="primary"
              >
                Next Page
              </Button>
              <Button
                onClick={onDecrement}
                className="prev-btn"
                variant="contained"
                color="primary"
              >
                Previous Page
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="get-all-residents-container">
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

export default GetAllResidentsByFlat;
