import React from 'react';
import Header from '../components/Header';

function Login() {
  return(
    <div className="page">
      <Header />
      <section className="login">
        <form name="form-login" className="login__form">
          <h3 className="login__heading">Вход</h3>

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
            type="submit" value="Войти"
            className="login__button">
              Войти
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;