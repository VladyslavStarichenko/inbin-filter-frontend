// Modules
import { useCallback, useState, useMemo } from 'react';

// Styles
import './styles.scss';

function Header() {
  // TODO Change btns depending on the state
  const [isAuth] = useState(false);

  const howItWorksHandler = useCallback(() => {
    console.log('How it wokrs handler.');
  }, []);

  const customizationHandler = useCallback(() => {
    console.log('Customization handler.');
  }, []);

  const missionHandler = useCallback(() => {
    console.log('Mission handler.');
  }, []);

  const contactUsHandler = useCallback(() => {
    console.log('Contact us.');
  }, []);

  const logInHandler = useCallback(() => {
    console.log('Log in handler.');
  }, []);

  const buttonsData = useMemo(() => {
    return {
      'howItWorks': { label: 'how it works', handler: howItWorksHandler },
      'customization': { label: 'customization', handler: customizationHandler },
      'mission': { label: 'mission', handler: missionHandler },
      'contactUs': { label: 'contact us', handler: contactUsHandler },
      'logIn': { label: 'log in', handler: logInHandler },
    };
  },
    [
      contactUsHandler,
      customizationHandler,
      howItWorksHandler,
      logInHandler,
      missionHandler,
    ],
  );

  return (
    <header className="header-wrapper">
      <div className="header-wrapper__name">
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
