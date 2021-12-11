// Modules
import PropTypes from 'prop-types';
import { memo } from 'react';
import { startCase, camelCase } from 'lodash';

// Styles
import './styles.scss';

// Assets
import wasteImg from '../../../../../assets/image/waste.jpeg';

function WasteSquare(props) {
  const { amount, litterType, id, priceToPay } = props;

  return (
    <div className="waste-square-container">
      <img src={wasteImg} className="waste-image" alt="Waste" />
      <div className="waste-field-block">
        Amount: {amount}
      </div>
      <div className="waste-field-block">
        Type: {startCase(camelCase(litterType))}
      </div>
      <div className="waste-field-block">
        Price: {priceToPay}
      </div>
    </div>
  );
}

WasteSquare.propTypes = {
  amount: PropTypes.number.isRequired,
  litterType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  priceToPay: PropTypes.number.isRequired,
};

export default memo(WasteSquare);
