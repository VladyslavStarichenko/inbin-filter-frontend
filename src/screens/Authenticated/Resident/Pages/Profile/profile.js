// Modules
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@mui/material';
import { isEmpty } from 'lodash';

// Components
import ErrorMessage from '../../../Admin/Components/ErrorMessage';
import ProfileSquare from '../../Components/ProfileSquare';

// Context
import useResidentContext from '../../../../../hooks/useResident/useResidentContext';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

function Profile() {
  const { setResidentId, setFlatAddress } = useResidentContext();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    async function getResidentProfileAsync() {
      const response = await api.resident.getResidentAccount();
      const data = await response.data;
      setFlatAddress(data.address);
      setResidentId(data.id);
      setProfileData(data);
    }

    try {
      setIsLoading(true);
      getResidentProfileAsync();
    } catch (error) {
      setHasError(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    async function getResidentNotificationAsync() {
      const response = await api.notification.getMyNotification();
      const data = await response.data;
      setNotification(data);
    }

    try {
      setIsLoading(true);
      getResidentNotificationAsync();
    } catch (error) {
      setHasError(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

  }, [setResidentId, setFlatAddress]);

  if (isLoading) {
    return <div className="resident-profile-loading">
      <CircularProgress color="success" />
    </div>
  }

  if (hasError) {
    return <div className="resident-profile-error-block">
      <ErrorMessage />
    </div>
  }

  return (
    <div className="resident-profile">
      <div className="resident-profile__wrapper-data">
        {!isLoading && !hasError && (
          <>
            <h2 className="resident-profile-header">Your profile</h2>
            <ProfileSquare profileData={profileData} />
            {!isEmpty(notification) && (
              <Alert severity="warning">Please, pay your bill to the end of month.</Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
