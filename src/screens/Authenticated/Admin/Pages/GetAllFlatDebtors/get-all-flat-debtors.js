// Modules
import { memo, useEffect, useState, useCallback } from 'react';
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';
import { size, isEqual } from 'lodash';
import { CircularProgress, Button } from '@material-ui/core';
import cx from 'classnames';

// Components
import Drawer from '../../Components/Drawer';
import ErrorMessage from '../../Components/ErrorMessage';
import WarningMessage from '../../Components/WarningMessage';
import DebtorSquare from '../../Components/DebtorSquare';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

function GetAllFlatDebtors() {
  const { flatId, setResidentWasteId } = useAdminContext();
  const [hasError, setHasError] = useState(null);
  const [numPage, setNumPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [debtorsByFlat, setDebtorsByFlat] = useState([]);

  setResidentWasteId(undefined);

  const onIncrement = useCallback(() => {
    setNumPage((prev) => prev + 1);
  }, []);

  const onDecrement = useCallback(() => {
    setNumPage((prev) => prev - 1);
  }, []);

  const onSendNotifications = useCallback(() => {
    async function sendNotifications() {
      await api.notification.createNotifications(flatId);
    }

    try {
      sendNotifications();
      alert('Notifications were successfuly sent!');
    } catch (error) {
      alert('Oooopss, an error occured.');
      console.log(error.message);
    }

  }, [flatId]);

  useEffect(() => {
    async function getAllFlatDebtorsReq() {
      const request = { id: flatId, pageNumber: numPage, pageSize: 3};
      const response = await api.resident.getAllFlatDebtors(request);
      const debtors = await response.data;

      if (!isEqual(numPage, 0) && isEqual(size(debtors?.residentGetDtoList), 0)) {
        setNumPage((prev) => prev - 1);
      } else {
        setDebtorsByFlat(debtors);
        setTotalPages(debtors.totalPages - 1);
      }
    }

    try {
      setIsLoading(true);
      getAllFlatDebtorsReq();
    } catch (error) {
      console.log(error.message);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [flatId, numPage]);

  let contentOfPage;

  if (isLoading) {
    return <div className="loading-debtors">
      <CircularProgress color="success" />
    </div>
  }

  if (hasError) {
    return <div className="error-debtors">
      <ErrorMessage />
    </div>
  }

  if (isEqual(size(debtorsByFlat.residentGetDtoList), 0)) {
    contentOfPage = <div className="no-debtors">
      <WarningMessage firstPart="There are no debtors " secondPart="for this flat!"/>
    </div>;
  } else {
    contentOfPage = (
      <div className="residents-wrapper">
        <h2 className="debtors-header">All residents by chosen flat</h2>
        <div className="container-for-debtors">
          {debtorsByFlat.residentGetDtoList.map((debtor) => {
            const { address, bill, id, name } = debtor;
            return (
              <DebtorSquare
                address={address}
                bill={bill}
                id={id}
                name={name}
                key={id}
              />
            );
          })}
        </div>
        <div className="admin-controls-container">
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
        {debtorsByFlat.residentGetDtoList.length !== 0 && (
          <Button
            onClick={onSendNotifications}
            className="send-notifications-btn"
            variant="contained"
            color="primary"
          >
            Send notifications
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="get-all-flat-debtors">
      <Drawer />
      <div className="get-all-debtors-container">
        {contentOfPage}
      </div>
    </div>
  );
}

export default memo(GetAllFlatDebtors);
