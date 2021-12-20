// Modules
import { useCallback, useEffect, useState, memo } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { isEqual, isNull, size, isUndefined } from 'lodash';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import React from 'react';
import cx from 'classnames';

// Components
import DoughnutInfo from '../../Components/DoughnutInfo';
import ErrorMessage from '../../Components/ErrorMessage';
import WarningMessage from '../../Components/WarningMessage';
import ResidentSquareWastes from '../../Components/ResidentSquareWastes';

// Api
import api from '../../../../../api';
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Components
import Drawer from '../../Components/Drawer';

// Styles
import './styles.scss';

Chart.register(ArcElement);

function GetAllWastesStatisticByResident() {
  const { flatId, residentWasteId } = useAdminContext();

  const [numPage, setNumPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [noData, setNoData] = useState(false);
  const [residentsByFlat, setResidentsByFlat] = useState([]);

  const [dataToShow, setDataToShow] = useState(null);
  const [digitData, setDigitData] = useState([]);

  const onIncrement = useCallback(() => {
    setNumPage((prev) => prev + 1);
  }, []);

  const onDecrement = useCallback(() => {
    setNumPage((prev) => prev - 1);
  }, []);

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
      setHasError(true);
    } finally {
      setIsLoading(false);
    }

  }, [flatId, numPage]);

  useEffect(() => {
    async function getAllWastesByResidentReq() {
      try {
        const response = await api.waste.getAllWastesByResident(residentWasteId);
        const data = await response.data;

        const residentWastes = data.wastes;
        const processedData = residentWastes.map((waste) => waste?.amountPercent);

        const dataToShow = {
          datasets: [
            {
              label: 'Diagram of trash',
              data: processedData,
              backgroundColor: ['#cb401b', '#a1dffb', '#f9de59', '#9db802'],
            }
          ],
          labels: ['Paper', 'Plastic', 'Glass', 'Other waste'],
        };

        setDataToShow(dataToShow);
        setDigitData(processedData);
        setNoData(false);
      } catch (err) {
        setNoData(true);
      }
    }

    try {
      setIsLoading(true);
      getAllWastesByResidentReq();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

  }, [residentWasteId]);

  let contentOfPage, noDataContainer;

  if (isLoading) {
    contentOfPage = (
      <CircularProgress color="success" />
    );
  }

  if (hasError) {
    contentOfPage = <ErrorMessage />;
  }

  if (!isUndefined(residentWasteId)) {
    if (isNull(dataToShow) || noData) {
      noDataContainer = <div className="no-data-resident-wastes">No statistics for chosen user.</div>
    } else {
      noDataContainer = (
        <>
          <Doughnut data={dataToShow} />
          <DoughnutInfo data={digitData} />
        </>
      );
    }
  }

  if (isEqual(size(residentsByFlat.residentGetDtoList), 0)) {
    contentOfPage = <WarningMessage firstPart="There are no residents " secondPart="in this flat!"/>;
  } else {
    contentOfPage = (
      <div className="wastes-residents-wrapper">
        <h2 className="wastes-resident-header">All residents by chosen flat</h2>
        <div className="container-for-wastes-residents">
          {residentsByFlat.residentGetDtoList.map((resident) => {
            return (
              <ResidentSquareWastes
                address={resident.address}
                key={resident.id}
                name={resident.name}
                id={resident.id}
              />
            );
          })}
        </div>
        <div className="wastes-controls-container">
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
    <div className="get-all-wastes-statistic-by-resident">
      <Drawer />
      {contentOfPage}
      <div className="doughnut-diagram-of-resident">
        {noDataContainer}
      </div>
    </div>
  );
}

export default memo(GetAllWastesStatisticByResident);
