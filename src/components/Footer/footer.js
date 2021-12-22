// Modules
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isEqual } from 'lodash';

// Context
import useAdminContext from '../../hooks/useAdmin/useAdminContext';

// Styles
import './styles.scss';

function Footer() {
  const { pathname } = useLocation();
  const { language } = useAdminContext();
  const [menu, setMenu] = useState('');
  const [copyright, setCopyright] = useState('');

  const menuOptions = useMemo(() => {
    const chosenLanguage = localStorage.getItem('user-language') || language;

    if (isEqual(chosenLanguage, 'english')) {
      setMenu('Menu');
      setCopyright('Copyright © 2021 Inbin Filter');

      return {
        'howitworks': { path: '/howitworks', label: 'How It Works' },
        'customization': { path: '/customization', label: 'Customization' },
        'mission': { path: '/mission', label: 'Mission' },
        'contact': { path: '/contactus', label: 'Contact' },
      };
    } else {
      setMenu('Меню');
      setCopyright('Все права защищенны © 2021 Inbin Filter');

      return {
        'howitworks': { path: '/howitworks', label: 'Как это работает' },
        'customization': { path: '/customization', label: 'Кастомизация' },
        'mission': { path: '/mission', label: 'Миссия' },
        'contact': { path: '/contactus', label: 'Свяжитесь с нами' },
      };
    }
  }, [language]);

  if (isEqual(pathname, '/')) return null;

  return (
    <footer className="footer-wrapper">
      <div className="footer-upper-section">
        <div className="footer-menu-wrapper">
          <h4 className="menu-title">{menu}</h4>
          <ul className="list-of-menu">
            {Object.keys(menuOptions).map((option, idx) => (
              <li key={idx} className="menu-option">
                <Link to={menuOptions[option].path}>
                  {menuOptions[option].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-text-wrapper">
        <p className="copyright-text">
          {copyright}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
