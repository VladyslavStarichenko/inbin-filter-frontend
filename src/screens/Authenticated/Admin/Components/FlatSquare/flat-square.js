// Modules
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

// Styles
import './styles.scss';

// Hooks
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Assets
import flatImage from '../../../../../assets/image/flat.jpeg';

function FlatSquare(props) {
  const { id, address } = props;
  const navigate = useNavigate();
  const { setFlatId } = useAdminContext();

  const getAllResidentsByFlat = useCallback(() => {
    setFlatId(id);
    navigate('/admin/getallresidents');
  }, [navigate, setFlatId, id]);

  const getAllBinsByFlat = useCallback(() => {
    setFlatId(id);
    navigate('/admin/getallbins');
  }, [navigate, setFlatId, id]);

  const addNewResident = useCallback(() => {
    setFlatId(id);
    navigate('/admin/addnewresident');
  }, [navigate, setFlatId, id]);

  return (
    <div className="flat-square-container">
      <img src={flatImage} className="flat-image" alt="Flat" />
      <Button
        className="control-btn"
        variant="contained"
        color="primary"
        onClick={getAllBinsByFlat}
      >
        Get all bins by flat
      </Button>
      <Button
        className="control-btn"
        variant="contained"
        color="primary"
        onClick={getAllResidentsByFlat}
      >
        Get all residents by flat
      </Button>
      <Button
        className="control-btn"
        variant="contained"
        color="primary"
        onClick={addNewResident}
      >
        Add new resident
      </Button>
      <div className="address-block">Address: {address}</div>
    </div>
  );
}

FlatSquare.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

export default FlatSquare;
