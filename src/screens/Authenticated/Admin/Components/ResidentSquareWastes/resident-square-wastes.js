// Modules
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { memo } from 'react';

// Styles
import './styles.scss';

// Hooks
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Assets
import residentImage from '../../../../../assets/image/resident.jpg';

function ResidentSquareWastes(props) {
  const { address, id, name } = props;
  const { setResidentWasteId } = useAdminContext();

  const getAllWastesByResident = useCallback(() => {
    setResidentWasteId(id);
  }, [setResidentWasteId, id]);

  return (
    <div className="resident-wastes-square-container">
      <img src={residentImage} className="resident-wastes-image" alt="Resident wastes" />
      <div className="resident-wastes-address-block">Name: {name}</div>
      <div className="resident-wastes-address-block">Address: {address}</div>
      <Button
        className="get-all-wastes-resident"
        variant="contained"
        color="primary"
        onClick={getAllWastesByResident}
      >
        Get Statistics
      </Button>
    </div>
  );
}

ResidentSquareWastes.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(ResidentSquareWastes);
