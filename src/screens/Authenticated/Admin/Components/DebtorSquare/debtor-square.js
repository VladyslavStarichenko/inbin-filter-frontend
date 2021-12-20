// Styles
import { memo } from 'react';

// Styles
import './styles.scss';

// Assets
import debtorImg from '../../../../../assets/image/resident.jpg';

function DebtorSquare(props) {
  const { address, bill, id, name } = props;

  return (
    <div key={id} className="debtor-square-container">
      <img src={debtorImg} className="debtor-image" alt="Debtor" />
      <div className="debtor-address-block">
        Address: {address}
      </div>
      <div className="debtor-name-block">
        Name: {name}
      </div>
      <div className="debtor-bill-block">
        Bill: {bill}
      </div>
    </div>
  );
}

export default memo(DebtorSquare);
