import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !email || !password ) {
      return;
    }
    props.onLogin(email, password, resetForm);
  }

  return(
    <div className="page">
      <Header>
        <Link to="/signup" className="nav-menu__link">Регистрация</Link>
      </Header>

      <section className="sign">
        <form
          name="form-login"
          className="sign__form"
          onSubmit={handleSubmit}
        >
          <h3 className="sign__heading">Вход</h3>

          <label>
            <input type="email"
              id="email" name="email"
              className="sign__item"
              maxLength="40" minLength="2"
              placeholder="Email" required
              value={email}
              onChange={handleEmailChange}
            />
          </label>

          <label>
            <input type="password"
              id="password" name="password"
              className="sign__item"
              maxLength="20" minLength="6"
              placeholder="Password" required
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <button type="submit" className="sign__button">
              Войти
          </button>

          <p className="sign__text">
            Еще не зарегистрированы?
            <Link to="/signup" className="sign__link"> Регистрация</Link>
          </p>

        </form>
      </section>
    </div>
  );
}

export default Login;
