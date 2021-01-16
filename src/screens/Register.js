import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';
import Header from '../components/Header';

const Register = (props) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if ( !email || !password ) {
      return;
    }

    auth.register(email, password)
      .then((res) => {
        props.onRegister(201);
        resetForm();
        props.history.push('/signin');
      })
      .catch((err) => {
        props.onRegister(err);
      });
  };

  return (
    <div className="page">
      <Header>
        <Link to="/signin" className="nav-menu__link">Войти</Link>
      </Header>

      <section className="sign">
        <form
          name="form-register"
          className="sign__form"
          onSubmit={handleSubmit}
        >
          <h3 className="sign__heading">Регистрация</h3>

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
              Зарегистрироваться
          </button>

          <p className="sign__text">
            Уже зарегистрированы?
            <Link to="/signin" className="sign__link"> Войти</Link>
          </p>

        </form>
      </section>
    </div>
  );
}

export default Register;