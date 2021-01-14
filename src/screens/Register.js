import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Register() {
  return (
    <div className="page">
      <Header text={"Войти"} url="/sign-in"/>
      <section className="sign">
        <form name="form-register" className="sign__form">
          <h3 className="sign__heading">Регистрация</h3>

          <label>
            <input type="email"
              id="email" name="email"
              className="sign__item"
              maxLength="40" minLength="2"
              placeholder="Email" required
            />
          </label>

          <label>
            <input type="password"
              id="password" name="password"
              className="sign__item"
              maxLength="20" minLength="6"
              placeholder="Password" required
            />
          </label>

          <button
            type="submit" value="Зарегистрироваться"
            className="sign__button">
              Зарегистрироваться
          </button>

          <p className="sign__text">
            Уже зарегистрированы?
            <Link to="/sign-in" className="sign__link"> Войти</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Register;