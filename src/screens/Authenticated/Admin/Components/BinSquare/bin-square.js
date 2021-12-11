// Modules
import PropTypes from 'prop-types';
import { memo } from 'react';
import { startCase, camelCase } from 'lodash';

// Styles
import './styles.scss';

// Assets
import binImage from '../../../../../assets/image/wastes.png';

function BinSquare(props) {
  const { address, capacity, fill, full, litterType } = props;

  return (
    <div className="bin-square-container">
      <img src={binImage} className="bin-image" alt="Bin" />
      <div className="bin-amount-block">
        Address: {address}
      </div>
      <div className="bin-type-block">
        Type: {startCase(camelCase(litterType))}
      </div>
      <div className="bin-price-block">
        Fullness: {full ? '100%' : `${(Math.round((fill * 100) / capacity) * 100)/100}%`}
      </div>
    </div>
  );
}

BinSquare.propTypes = {
  address: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  full: PropTypes.bool.isRequired,
  litterType: PropTypes.string.isRequired,
};

export default memo(BinSquare);
