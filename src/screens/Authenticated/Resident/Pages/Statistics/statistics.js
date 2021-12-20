// Modules
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { CircularProgress } from '@material-ui/core';
import { isUndefined, isNull } from 'lodash';

// Components
import DoughnutInfo from '../../../Admin/Components/DoughnutInfo';
import ErrorMessage from '../../../Admin/Components/ErrorMessage';

// Context
import useResidentContext from '../../../../../hooks/useResident/useResidentContext';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

Chart.register(ArcElement);

function Statistics() {
  const { residentId } = useResidentContext();

  const [noData, setNoData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [dataToShow, setDataToShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    async function getWasteStatisticAsync() {
      try {
        const response = await api.waste.getAllWastesByResident(residentId);
        const data = await response.data;

        const residentWastes = data.wastes;
        const processedData = residentWastes.map((waste) => waste.amountPercent);

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

        console.log(data);
        setProcessedData(processedData);
        setDataToShow(dataToShow);
        setNoData(false);
      } catch (error) {
        setNoData(true);
      }
    }

    try {
      setIsLoading(true);
      getWasteStatisticAsync();
    } catch (error) {
      setHasError(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

  }, [residentId]);

  if (isLoading) {
    return <div className="statistics-loading">
      <CircularProgress color="success" />
    </div>
  }

  if (hasError) {
    return <div className="statistics-error">
      <ErrorMessage />
    </div>;
  }

  let noDataContainer;

  if (!isUndefined(residentId)) {
    if (isNull(dataToShow) || noData) {
      noDataContainer = <div className="">
        Unfortunately, no statistics for you.
      </div>
    } else {
      noDataContainer = (
        <>
          <Doughnut data={dataToShow} />
          <DoughnutInfo data={processedData} />
        </>
      );
    }
  }

  return (
    <div className="resident-statistics">
      <h2 className="resident-statistics__header">Your statistics</h2>
      <div className="resident-statistics__doughnut">
        {noDataContainer}
      </div>
    </div>
  );
}

export default Statistics;
