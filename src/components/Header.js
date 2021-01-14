import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

const Header = ({text, url}) => (

  <header className="header">

    <img className="header__logo" src={headerLogo}
      alt='Логотип сервиса Mesto-Russia'/>

    <div className="header__nav">
      <Link to={url} className="header__link">{text}</Link>
    </div>

  </header>

);

export default Header;