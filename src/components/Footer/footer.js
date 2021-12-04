// Modules
import { useMemo } from 'react';

// Styles
import './styles.scss';

function Footer() {
  const menuOptions = useMemo(() => {
    return ['How It Works', 'Customization',
      'Mission', 'Press Kit', 'Contact'];
  }, []);

  return (
    <footer className="footer-wrapper">
      <div className="footer-upper-section">
        <div className="footer-menu-wrapper">
          <h4 className="menu-title">Menu</h4>
          <ul className="list-of-menu">
            {menuOptions.map((option, idx) => (
              <li key={idx} className="menu-option">{option}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-text-wrapper">
        <p className="copyright-text">Copyright © 2021 Inbin Filter</p>
      </div>
    </footer>
  );
}

export default Footer;
