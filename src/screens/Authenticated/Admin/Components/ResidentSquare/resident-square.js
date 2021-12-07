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
  const { address, id, name } = props;
  const navigate = useNavigate();
  const { setFlatId } = useAdminContext();

  const getAllResidentsByFlat = useCallback(() => {
    setFlatId(id);
    navigate('/admin/getallresidents');
  }, [navigate, setFlatId, id]);

  return (
    <div className="resident-square-container">
      <img src={residentImage} className="resident-image" alt="Flat" />
      <div className="resident-address-block">Name: {name}</div>
      <div className="resident-address-block">Address: {address}</div>
    </div>
  );
}

ResidentSquare.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(ResidentSquare);
