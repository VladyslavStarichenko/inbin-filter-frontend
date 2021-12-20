// Modules
import { memo, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { isNull } from 'lodash';

// Components
import Drawer from '../../Components/Drawer';
import DoughnutInfo from '../../Components/DoughnutInfo';

// Context
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';
import WarningMessage from '../../Components/WarningMessage';

Chart.register(ArcElement);

function GetWasteStatisticByFlat() {
  const { flatAddress, setResidentWasteId } = useAdminContext();

  const [dataToShow, setDataToShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [digitData, setDigitData] = useState([]);

  setResidentWasteId(undefined);

  useEffect(() => {
    async function getAllWastesByFlatReq(address) {
      const response = await api.waste.getAllWastesByFlat(address);
      const data = await response.data;

      const wastes = data.wastes;
      const processedData = wastes.map((waste) => waste?.amountPercent);

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

      setDigitData(processedData);
      setDataToShow(dataToShow);
    }

    try {
      setIsLoading(true);
      getAllWastesByFlatReq(flatAddress);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

  }, [flatAddress]);

  if (isLoading) {
    return <CircularProgress color="success" />;
  }

  let contentContainer;

  if (isNull(dataToShow)) {
    contentContainer = <div className="waste-no-data">
      <WarningMessage firstPart="There is no data " secondPart="for chosen flat!" />
    </div>;
  }

  return (
    <div className="get-waste-statistic-by-flat">
      <Drawer />
      <div className="doughnut-waste">
        {dataToShow && (<>
          <Doughnut data={dataToShow} />
          <DoughnutInfo data={digitData} />
        </>)}
        {contentContainer}
      </div>
    </div>
  );
}

export default memo(GetWasteStatisticByFlat);
