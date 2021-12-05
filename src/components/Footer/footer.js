// Modules
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';

function Footer() {
  const menuOptions = useMemo(() => {
      return {
        'howitworks': { path: '/howitworks', label: 'How It Works' },
        'customization': { path: '/customization', label: 'Customization' },
        'mission': { path: '/mission', label: 'Mission' },
        'contact': { path: '/contactus', label: 'Contact' },
      };
  }, []);

  return (
    <footer className="footer-wrapper">
      <div className="footer-upper-section">
        <div className="footer-menu-wrapper">
          <h4 className="menu-title">Menu</h4>
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
          Copyright © 2021 Inbin Filter
        </p>
      </div>
    </footer>
  );
}

export default Footer;
