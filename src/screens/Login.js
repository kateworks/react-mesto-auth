import React, {useState} from 'react';
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
              value={email}
              onChange={handleEmailChange}
            />
          </label>

          <label>
            <input type="password"
              id="password" name="password"
              className="login__item"
              maxLength="20" minLength="6"
              placeholder="Password" required
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <button
            type="submit" value="Войти"
            className="login__button"
            onSubmit={handleSubmit}
          >
              Войти
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;