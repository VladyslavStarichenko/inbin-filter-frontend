// Modules
import { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { isUndefined } from 'lodash';

// Context
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Styles
import './styles.scss';

function Drawer() {
  const navigate = useNavigate();

  const { flatId } = useAdminContext();
  console.log(flatId)

  const isDiabled = isUndefined(flatId);

  const getWasteStatisticByFlat = useCallback(() => {
    navigate('/admin/statistics/get-waste-statistic-by-flat');
  }, [navigate]);

  const getAllWastesStatisticsByResident = useCallback(() => {
    navigate('/admin/statistics/get-all-wastes-statistic-by-resident');
  }, [navigate]);

  const getAllFlatDebtors = useCallback(() => {
    navigate('/admin/statistics/get-all-flat-debtors');
  }, [navigate]);

  return (
    <div className="drawer-container">
      <Button
        disabled={isDiabled}
        className="btn-drawer"
        variant="contained"
        color="primary"
        onClick={getWasteStatisticByFlat}
      >
        Get Waste Statistic By Flat
      </Button>
      <Button
        disabled={isDiabled}
        className="btn-drawer"
        variant="contained"
        color="primary"
        onClick={getAllWastesStatisticsByResident}
      >
        Get All Wastes Statistics By Resident
      </Button>
      <Button
        disabled={isDiabled}
        className="btn-drawer"
        variant="contained"
        color="primary"
        onClick={getAllFlatDebtors}
      >
        Get All Flat Debtors
      </Button>
    </div>
  );
}

export default Drawer;
