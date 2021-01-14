import React from 'react';
import Header from '../components/Header';

function Register() {
  return (
    <div className="page">
      <Header />
      <section className="login">
        <form name="form-register" className="login__form">
          <h3 className="login__heading">Регистрация</h3>

          <label>
            <input type="email"
              id="email" name="email"
              className="login__item"
              maxLength="40" minLength="2"
              placeholder="Email" required
            />
          </label>

          <label>
            <input type="password"
              id="password" name="password"
              className="login__item"
              maxLength="20" minLength="6"
              placeholder="Password" required
            />
          </label>

          <button
            type="submit" value="Зарегистрироваться"
            className="login__button">
              Зарегистрироваться
          </button>

          <p className="">
            Уже зарегистрированы?
            <a> Войти</a>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Register;