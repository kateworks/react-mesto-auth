import React from 'react';
import headerLogo from '../images/header-logo.svg';

const Header = () => (
  <header className="header">
    <img className="header__logo" src={headerLogo} 
      alt='Логотип сервиса Mesto-Russia'/>
  </header>
);

export default Header;