// Modules
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { memo } from 'react';

// Styles
import './styles.scss';

// Hooks
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Assets
import residentImage from '../../../../../assets/image/resident.jpg';

function ResidentSquare(props) {
  const navigate = useNavigate();
  const { address, id, name } = props;
  const { setResidentId } = useAdminContext();

  const getAllWastesByResident = useCallback(() => {
    setResidentId(id);
    navigate('/admin/getallresidents/getwastesbyres');
  }, [navigate, setResidentId, id]);

  return (
    <div className="resident-square-container">
      <img src={residentImage} className="resident-image" alt="Flat" />
      <div className="resident-address-block">Name: {name}</div>
      <div className="resident-address-block">Address: {address}</div>
      <Button
        className="get-all-waste"
        variant="contained"
        color="primary"
        onClick={getAllWastesByResident}
      >
        Get all wastes
      </Button>
    </div>
  );
}

ResidentSquare.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(ResidentSquare);
