import React from 'react';
import headerLogo from '../images/header-logo.svg';

const Header = (props) => (

  <header className="header">

    <img className="header__logo" src={headerLogo}
      alt='Логотип сервиса Mesto-Russia'/>

    <nav className="nav-menu">
      {props.children}
    </nav>

  </header>

);

export default Header;
