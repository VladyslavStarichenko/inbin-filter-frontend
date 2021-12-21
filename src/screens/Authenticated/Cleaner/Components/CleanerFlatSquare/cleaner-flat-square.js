// Modules
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

// Styles
import './styles.scss';

// Hooks
import useCleanerContext from '../../../../../hooks/useCleaner/useCleanerContext';

// Assets
import flatImage from '../../../../../assets/image/flat.jpeg';

function CleanerFlatSquare(props) {
  const { id, address } = props;

  const navigate = useNavigate();

  const { setFlatId } = useCleanerContext();

  const getAllBinsByFlat = useCallback(() => {
    setFlatId(id);
    navigate('/cleaner/bins');
  }, [navigate, setFlatId, id]);

  return (
    <div className="cleaner-flat-square-container">
      <img src={flatImage} className="cleaner-flat-image" alt="Cleaner Flat" />
      <div className="cleaner-address-block">Address: {address}</div>
      <Button
        className="control-btn"
        variant="contained"
        color="primary"
        onClick={getAllBinsByFlat}
      >
        Get all bins by flat
      </Button>
    </div>
  );
}

CleanerFlatSquare.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

export default CleanerFlatSquare;
