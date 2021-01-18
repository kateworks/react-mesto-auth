import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

import HomePage from '../screens/HomePage';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NotFound from '../screens/NotFound';
import InfoTooltip from '../components/InfoTooltip';

import regSuccess from '../images/reg-success.svg';
import regFailure from '../images/reg-failure.svg';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState({ image: null, text: '' });
  const [email, setEmail] = useState('');

  let history = useHistory();

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleRegister = (resultCode) => {
    let messageText = '', imageLink = null;

    switch (resultCode) {
      case 201:
        messageText ="Вы успешно зарегистрировались!";
        imageLink = regSuccess;
        break;
      case 400:
        messageText = "Ошибка 400, некорректно заполнено одно из полей";
        imageLink = regFailure;
        break;
      default:
        messageText = "Что-то пошло не так! Попробуйте ещё раз.";
        imageLink = regFailure;
    }
    setResultMessage({ image: imageLink, text: messageText });
    console.log(messageText);
    setIsPopupOpen(true);
  };

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push('/home');
          }
        })
        .catch(err => {
          console.log('Переданный токен некорректен.');
          setLoggedIn(false);
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn]);

  const handleLogin = (userEmail, userPassword, resetLoginForm) => {

    auth.authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          resetLoginForm();
          history.push('/home');
          setLoggedIn(true);
        }
      })
      .catch(err => {
        let messageText = '', imageLink = regFailure;
        switch (err) {
          case 400:
            messageText = "Ошибка 400, не передано одно из полей";
            break;
          case 401:
            messageText = `Ошибка 401, пользователь ${email} не найден`;
            break;
          default:
            messageText = "Что-то пошло не так! Попробуйте ещё раз.";
        }
        setResultMessage({ image: imageLink, text: messageText });
        console.log(messageText);
        setIsPopupOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  return (
    <React.Fragment>
      <Switch>
        <ProtectedRoute
          path="/home"
          loggedIn={loggedIn}
          component={HomePage}
          onLogout={handleLogout}
          email={email}
        />

        <Route path="/signin">
          <Login onLogin={handleLogin} history={history} email={email}/>
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} history={history} />
        </Route>

        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}
        </Route>

        <Route path="/react-mesto-auth">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      {/* Вывод сообщения о результатах регистрации/авторизации */}
      { isPopupOpen &&
        <InfoTooltip
          onClose={handlePopupClose}
          imageLink={resultMessage.image}
          textMessage={resultMessage.text}
        />
      }

    </React.Fragment>
  );
}

export default App;
