// Modules
import { memo } from 'react';

// Styles
import './styles.scss';

// Assets
import residentProfile from '../../../../../assets/image/residentProfile.jpeg';

function ProfileSquare(props) {
  const { profileData } = props;

  const { address, bill, name } = profileData;

  return (
    <div className="profile-square-container">
      <div className="data-image">
        <img src={residentProfile} height="250" alt="Resident profile img" />
      </div>
      <div className="data-resident">Name: {name}</div>
      <div className="data-resident">Address: {address}</div>
      <div className="data-resident">Bill: {bill}</div>
    </div>
  );
}

export default memo(ProfileSquare);
