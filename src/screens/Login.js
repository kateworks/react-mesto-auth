import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';
import Header from '../components/Header';

const Login = ({handleLogin, history}) => {

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
    auth.authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.jwt) {
          resetForm();
          handleLogin();
          history.push('/home');
        }
      })
      .catch(err => console.log(err));
  }


  return(
    <div className="page">
      <Header text={"Регистрация"} url="/sign-up"/>
      <section className="sign">
        <form name="form-login" className="sign__form">
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

          <button
            type="submit" value="Войти"
            className="sign__button"
            onSubmit={handleSubmit}
          >
              Войти
          </button>

          <p className="sign__text">
            Еще не зарегистрированы?
            <Link to="/sign-up" className="sign__link"> Регистрация</Link>
          </p>

        </form>
      </section>
    </div>
  );
}

export default Login;