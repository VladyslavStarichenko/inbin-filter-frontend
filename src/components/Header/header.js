// Modules
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

// Constants
import { USER_ROLE } from '../../constants/users';

// Styles
import './styles.scss';
import useAuth from '../../hooks/useAuth/useAuth';

function Header() {
  const auth = useAuth();

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
    return {
      'howItWorks': { label: 'how it works', handler: howItWorksHandler },
      'mission': { label: 'mission', handler: missionHandler },
      'logIn': { label: 'log in', handler: logInHandler },
    };
  },
    [
      howItWorksHandler,
      logInHandler,
      missionHandler,
    ],
  );

  const loggedInBtns = useMemo(() => {
    const userRole = auth?.user?.role || localStorage.getItem('user-role');
    let btnsByUserRole = {};

    if (isEqual(userRole, USER_ROLE['ROLE_COMPLEX_ADMIN']) ||
    isEqual(localStorage.getItem('user-role'), USER_ROLE['ROLE_COMPLEX_ADMIN'])) {
      btnsByUserRole = {
        statistics: { label: 'Statistics', handler: getStatisticsAdmin },
        flats: { label: 'Flats', handler: getFlatsAdmin },
      };
    }

    if (isEqual(userRole, USER_ROLE['ROLE_RESIDENT']) ||
    isEqual(localStorage.getItem('user-role'), USER_ROLE['ROLE_RESIDENT'])) {
      btnsByUserRole = {
        getMyProfile: { label: 'My profile', handler: getMyProfile },
        checkMyWaste: { label: 'My waste', handler: checkMyWasteResident },
        checkMyBin: { label: 'My bins', handler: checkMyBinResident },
        getMyStatistics: { label: 'Get my statistics', handler: getMyStatisticsResident },
      };
    }

    if (isEqual(userRole, USER_ROLE['ROLE_CLEANER']) ||
    isEqual(localStorage.getItem('user-role'), USER_ROLE['ROLE_CLEANER'])) {
      btnsByUserRole = {};
    }

    if (userRole) {
      return Object.assign(btnsByUserRole,
        {'logout': { label: 'Log out', handler: logOutHandler }}
      );
    }

    return {'logout': { label: 'Log out', handler: logOutHandler }};
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
    ],
  );

  return (
    <header className="header-wrapper">
      <div className="header-wrapper__name" onClick={mainPage}>
        Inbin <span>Filter</span>
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
