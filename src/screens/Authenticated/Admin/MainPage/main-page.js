// Modules
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import { Button } from '@material-ui/core';

// Components
import FlatSquare from '../Components/FlatSquare';
import CreateNewComplex from '../Components/CreateNewComplex';
import CreateNewFlat from '../Components/CreateNewFlat';

// Context
import useAdminContext from '../../../../hooks/useAdmin/useAdminContext';

// Styles
import React, { useEffect, useState } from 'react';
import './styles.scss';

// Api
import api from '../../../../api';

function MainPage() {
  const {
    addNewFlat,
    setAddNewFlat,
    houseComplex,
    setHouseComplex,
    hasUserFlats,
    setHasUserFlats,
    hasUserComplex,
    setHasUserComplex,
  } = useAdminContext();

  const [isLoading, setIsLoading] = useState(false);

  const userName = localStorage.getItem('username');

  useEffect(() => {
    async function getHouseComplexAsync() {
      const response = await api.houseComplex.getHouseComplex();
      const houseComplex = await response.data;
      const hasAnyFlats = !isEqual(size(houseComplex.flats), 0);
      setHouseComplex(houseComplex);
      setHasUserFlats(hasAnyFlats);
    }

    try {
      setIsLoading(true);
      getHouseComplexAsync();
    } catch (error) {
      setHasUserComplex(false);
    } finally {
      setIsLoading(false);
    }

  }, [setHasUserComplex, setHasUserFlats, setHouseComplex]);

  let contentOfPage;

  if (isLoading) {
    contentOfPage = (
      <div>Loading...</div>
    );
  } else if (!hasUserComplex || isEmpty(houseComplex)) {
    contentOfPage = (
      <div className="house-complex-container">
        <h2 className="welcome-text">
          Create new house-complex, {userName}!
        </h2>
        <div className="flats-container">
          <CreateNewComplex />
        </div>
      </div>
    );
  } else {
    let contentForFlats;

    if (!hasUserFlats || addNewFlat) {
      contentForFlats = (
        <div>
          <h2 className="welcome-text">
            Add new flats to house-complex, {userName}!
          </h2>
          <div className="flats-container">
            <CreateNewFlat
              setAddNewFlat={setAddNewFlat}
              setHasUserFlats={setHasUserFlats}
              setHouseComplex={setHouseComplex}
            />
          </div>
        </div>
      );
    } else {
      contentForFlats = (
        <React.Fragment>
          <h2 className="welcome-text">
            Welcome to your house-complex, {userName}!
          </h2>
          <div className="flats-container">
            {houseComplex.flats.map((flat) => {
              const { flatId: id, address } = flat;
              return (
                <FlatSquare id={id} address={address} />
              );
            })}
          </div>
          <Button
            className="add-new-flat-btn"
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            onClick={() => setAddNewFlat(true)}
          >
            Add new flat
          </Button>
        </React.Fragment>
      );
    }

    contentOfPage = (
      <div className="house-complex-container">
        {contentForFlats}
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      {contentOfPage}
    </div>
  );
}

export default MainPage;
