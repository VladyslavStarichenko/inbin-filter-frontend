// Modules
import { useCallback, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Stripe from 'react-stripe-checkout';
import { isEqual, size } from 'lodash';
import cx from 'classnames';

// Context
import useAdminContext from '../../../../../hooks/useResident/useResidentContext';
import useResidentContext from '../../../../../hooks/useResident/useResidentContext';

// Components
import ErrorMessage from '../../../Admin/Components/ErrorMessage';
import WasteSquare from '../../../Admin/Components/WasteSquare';
import WarningMessage from '../../../Admin/Components/WarningMessage';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

function MyWaste() {
  const { residentId } = useAdminContext();
  const { hasDebt } = useResidentContext();

  const [myBill, setMyBill] = useState();
  const [wastes, setWastes] = useState();
  const [numPage, setNumPage] = useState(0);
  const [noData, setNoData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onIncrement = useCallback(() => {
    setNumPage((prev) => prev + 1);
  }, []);

  const onDecrement = useCallback(() => {
    setNumPage((prev) => prev - 1);
  }, []);

  async function handleToken(token) {
    const data = { token, amount: Math.abs(myBill['Total bill:']) };
    await api.payment.chargeCard(data);
  }

  useEffect(() => {
    async function getAllWastesByResidentPaginated() {
      const request = { pageNumber: numPage, pageSize: 3};
      const { data: wastes } = await api.waste.getMyWastes(request);
      const wastesArr = await wastes.wasteGetDtos;

      setNoData(isEqual(wastesArr.length, 0));

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
      setHasError(true);
    } finally {
      setIsLoading(false);
    }

    async function getResidentBillAsync() {
      const response = await api.waste.getMyBill();
      const data = await response.data;
      setMyBill(data);
    }

    try {
      setIsLoading(true);
      getResidentBillAsync();
    } catch (error) {
      console.log(error.message);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [residentId, numPage]);

  if (isLoading) {
    return <div className="resident-waste-loading">
      <CircularProgress color="success" />
    </div>;
  }

  if (hasError) {
    return <div className="resident-waste-error">
      <ErrorMessage />
    </div>;
  }

  if (noData) {
    return <div className="resident-waste-warning">
      <WarningMessage firstPart="There is no " secondPart="waste!" />
    </div>;
  }

  return (
    <div className="resident-my-waste-container">
      <div className="my-wastes-wrapper">
        <h2 className="my-wastes-header">All your wastes</h2>
        <div className="container-for-my-wastes">
          {wastes?.map((waste) => {
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
        <div className="my-controls-container">
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
      {hasDebt && (
        <div className="stripe-container">
          <Stripe
            stripeKey="pk_test_51K470nA5ndul63kt012jwvJexZhe3CrGJBPzzL1gOE0hGMgTK4fkggf5mriFzOoqlw7rp6Eau04wXfiGfFS8w4Jb006FYxkKtM"
            token={handleToken}
          />
        </div>
      )}
    </div>
  );
}

export default MyWaste;
