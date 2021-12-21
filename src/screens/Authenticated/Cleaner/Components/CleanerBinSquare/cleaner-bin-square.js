// Modules
import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import { startCase, camelCase } from 'lodash';
import { Button } from '@material-ui/core';

// Styles
import './styles.scss';

// Assets
import binImage from '../../../../../assets/image/wastes.png';

// Api
import api from '../../../../../api';

function CleanerBinSquare(props) {
  const { id, address, capacity, fill, full, litterType } = props;

  const fullnessPercent = (Math.round((fill * 100) / capacity) * 100)/100;

  const cleanHandler = useCallback(() => {
    async function cleanBinAsync() {
      await api.cleaner.cleanBin(id);
    }

    cleanBinAsync();
  }, [id]);

  return (
    <div className="cleaner-bin-square-container">
      <img src={binImage} className="cleaner-bin-image" alt="Cleaner Bin" />
      <div className="cleaner-bin-amount-block">
        Address: {address}
      </div>
      <div className="cleaner-bin-type-block">
        Type: {startCase(camelCase(litterType))}
      </div>
      <div className="cleaner-bin-price-block">
        Fullness: {full ? '100%' : `${fullnessPercent}%`}
      </div>
      <Button
        className="cleaner-control-btn"
        variant="contained"
        color="primary"
        onClick={cleanHandler}
      >
        Clean
      </Button>
    </div>
  );
}

CleanerBinSquare.propTypes = {
  address: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  full: PropTypes.bool.isRequired,
  litterType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default memo(CleanerBinSquare);
