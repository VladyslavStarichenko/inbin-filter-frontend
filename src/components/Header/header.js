// Modules
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useMemo } from 'react';

// Styles
import './styles.scss';

function Header() {
  // TODO Change btns depending on the state
  const [isAuth] = useState(false);

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

  const buttonsData = useMemo(() => {
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

  return (
    <header className="header-wrapper">
      <div className="header-wrapper__name" onClick={mainPage}>
        Inbin <span>Filter</span>
      </div>
      <div className="header-wrapper__buttons">
        {Object.keys(buttonsData).map((btn, idx) => {
          return (
            <button key={idx} onClick={buttonsData[btn].handler}>
              {buttonsData[btn].label}
            </button>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
