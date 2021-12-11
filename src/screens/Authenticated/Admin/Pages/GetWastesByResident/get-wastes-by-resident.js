// Modules
import { useCallback, useEffect, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { isEqual, size } from 'lodash';
import cx from 'classnames';

// Components
import ErrorMessage from '../../Components/ErrorMessage';
import WarningMessage from '../../Components/WarningMessage';
import WasteSquare from '../../Components/WasteSquare';

// Styles
import './styles.scss';

// Hooks
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Api
import api from '../../../../../api';

function GetWastesByResident() {
  const [wastes, setWastes] = useState();
  const { residentId } = useAdminContext();
  const [error, setError] = useState(null);
  const [numPage, setNumPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onIncrement = useCallback(() => {
    setNumPage((prev) => prev + 1);
  }, []);

  const onDecrement = useCallback(() => {
    setNumPage((prev) => prev - 1);
  }, []);

  const onBackHandler = useCallback(() => {
    navigate('/admin/getallresidents');
  }, [navigate]);

  useEffect(() => {
    async function getAllWastesByResidentPaginated() {
      const request = { residentId, pageNumber: numPage, pageSize: 3};
      const { data: wastes } = await api.waste.getAllWastesByResidentPaginated(request);
      const wastesArr = await wastes.wasteGetDtos;

      if (!isEqual(numPage, 0) && isEqual(size(wastesArr), 0)) {
        setNumPage((prev) => prev - 1);
      } else {
        setWastes(wastesArr);
        setTotalPages(wastes.totalPages - 1);
      }
    }

    try {
      setIsLoading(true);
      getAllWastesByResidentPaginated();
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [residentId, numPage]);

  let contentOfPage;

  if (isLoading) {
    return <CircularProgress color="success" />
  }

  if (!isEqual(error, null)) {
    contentOfPage = <ErrorMessage />;
  }

  if (isEqual(size(wastes), 0)) {
    contentOfPage = <WarningMessage firstPart="There are no wastes " secondPart="for this resident!"/>;
  } else {
    contentOfPage = (
      <div className="wastes-wrapper">
        <h2 className="wastes-header">All wastes by chosen resident</h2>
        <div className="container-for-wastes">
          {wastes.map((waste) => {
            console.log(waste);
            return (
              <WasteSquare
                key={waste.id}
                id={waste.id}
                amount={waste.amount}
                litterType={waste.litterType}
                priceToPay={waste.priceToPay}
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
    <div className="get-wastes-resident-container">
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

export default GetWastesByResident;
