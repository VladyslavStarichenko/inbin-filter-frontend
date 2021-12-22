// Modules
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

// Constants
import { USER_ROLE } from '../../constants/users';

// Context
import useAdminContext from '../../hooks/useAdmin/useAdminContext';

// Styles
import './styles.scss';
import useAuth from '../../hooks/useAuth/useAuth';

function Header() {
  const auth = useAuth();
  const { language, setLanguage } = useAdminContext();

  const handleChange = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem('user-language', event.target.value);
  };

  const navigate = useNavigate();

  const mainPage = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const howItWorksHandler = useCallback(() => {
    navigate('/howitworks');
  }, [navigate]);

  const missionHandler = useCallback(() => {
    navigate('/mission');
  }, [navigate]);

  const logInHandler = useCallback(() => {
    navigate('/login')
  }, [navigate]);

  const logOutHandler = useCallback(() => {
    localStorage.clear();
    auth.logOut();
    navigate('/');
  }, [auth, navigate]);

  const getStatisticsAdmin = useCallback(() => {
    navigate('/admin/statistics');
  }, [navigate]);

  const getFlatsAdmin = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  const getMyProfile = useCallback(() => {
    navigate('/resident');
  }, [navigate]);

  const checkMyWasteResident = useCallback(() => {
    navigate('/resident/waste');
  }, [navigate]);

  const checkMyBinResident = useCallback(() => {
    navigate('/resident/bin');
  }, [navigate]);

  const getMyStatisticsResident = useCallback(() => {
    navigate('/resident/statistics');
  }, [navigate]);

  const notLoggedInBtns = useMemo(() => {
    const chosenLanguage = localStorage.getItem('user-language') || language;

    if (isEqual(chosenLanguage, 'english')) {
      return {
        'mission': { label: 'mission', handler: missionHandler },
        'logIn': { label: 'log in', handler: logInHandler },
      };
    } else {
      return {
        'mission': { label: 'Миссия', handler: missionHandler },
        'logIn': { label: 'Войти', handler: logInHandler },
      };
    }
  },
    [
      language,
      logInHandler,
      missionHandler,
    ],
  );

  const loggedInBtns = useMemo(() => {
    const userRole = auth?.user?.role || localStorage.getItem('user-role');
    const chosenLanguage = localStorage.getItem('user-language') || language;

    let btnsByUserRole = {};

    if (isEqual(userRole, USER_ROLE['ROLE_COMPLEX_ADMIN']) ||
    isEqual(localStorage.getItem('user-role'), USER_ROLE['ROLE_COMPLEX_ADMIN'])) {
      if (isEqual(chosenLanguage, 'english')) {
        btnsByUserRole = {
          statistics: { label: 'Statistics', handler: getStatisticsAdmin },
          flats: { label: 'Flats', handler: getFlatsAdmin },
        };
      } else {
        btnsByUserRole = {
          statistics: { label: 'Статистика', handler: getStatisticsAdmin },
          flats: { label: 'Дома', handler: getFlatsAdmin },
        };
      }
    }

    if (isEqual(userRole, USER_ROLE['ROLE_RESIDENT']) ||
    isEqual(localStorage.getItem('user-role'), USER_ROLE['ROLE_RESIDENT'])) {
      if (isEqual(chosenLanguage, 'english')) {
        btnsByUserRole = {
          getMyProfile: { label: 'My profile', handler: getMyProfile },
          checkMyWaste: { label: 'My waste', handler: checkMyWasteResident },
          checkMyBin: { label: 'My bins', handler: checkMyBinResident },
          getMyStatistics: { label: 'Get my statistics', handler: getMyStatisticsResident },
        };
      } else {
        btnsByUserRole = {
          getMyProfile: { label: 'Мой профиль', handler: getMyProfile },
          checkMyWaste: { label: 'Мой мусор', handler: checkMyWasteResident },
          checkMyBin: { label: 'Мои мусорки', handler: checkMyBinResident },
          getMyStatistics: { label: 'Получить мою статистику', handler: getMyStatisticsResident },
        };
      }
    }

    if (isEqual(userRole, USER_ROLE['ROLE_CLEANER']) ||
    isEqual(localStorage.getItem('user-role'), USER_ROLE['ROLE_CLEANER'])) {
      btnsByUserRole = {};
    }

    if (userRole) {
      const logOutBtn = isEqual(chosenLanguage, 'english') ? {
        'logout': { label: 'Log out', handler: logOutHandler }
      } : { 'logout': { label: 'Выйти', handler: logOutHandler } };

      return Object.assign(btnsByUserRole, logOutBtn);
    }

    if (isEqual(chosenLanguage, 'english')) {
      return {'logout': { label: 'Log out', handler: logOutHandler }};
    } else {
      return {'logout': { label: 'Выйти', handler: logOutHandler }};
    }
  },
    [
      auth?.user?.role,
      logOutHandler,
      checkMyBinResident,
      checkMyWasteResident,
      getFlatsAdmin,
      getMyProfile,
      getMyStatisticsResident,
      getStatisticsAdmin,
      language,
    ],
  );

  return (
    <header className="header-wrapper">
      <div className="name-select">
        <div className="header-wrapper__name" onClick={mainPage}>
          Inbin <span>Filter</span>
        </div>
        <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Language"
            value={language}
            onChange={handleChange}
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="russian">Russian</MenuItem>
          </Select>
        </FormControl>
        </div>
      </div>
      <div className="header-wrapper__buttons">
        {localStorage.getItem('token') ? (Object.keys(loggedInBtns).map((btn, idx) => {
          return (
            <button key={idx} onClick={loggedInBtns[btn].handler}>
              {loggedInBtns[btn].label}
            </button>
          );
        })) : (Object.keys(notLoggedInBtns).map((btn, idx) => {
          return (
            <button key={idx} onClick={notLoggedInBtns[btn].handler}>
              {notLoggedInBtns[btn].label}
            </button>
          );
        }))}
      </div>
    </header>
  );
}

export default Header;
