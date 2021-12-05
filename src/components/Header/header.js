// Modules
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

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
    return {
      'logout': { label: 'Log out', handler: logOutHandler },
    };
  }, [logOutHandler]);

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
