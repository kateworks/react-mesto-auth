import React, {useState} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
//import * as auth from '../utils/auth';

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

  // const tokenCheck = () => {
  //   if (localStorage.getItem('jwt')) {
  //     const jwt = localStorage.getItem('jwt');
  //     auth.checkToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setLoggedIn(true);
  //           history.push('home');
  //         }
  //       });
  //   }
  // };

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  const handleLogin = () => {
    // 400 - не передано одно из полей
    // 401 - пользователь с email не найден
    setLoggedIn(true);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('jwt');
  //   setLoggedIn(false);
  //   // props.history.push('/sign-in');
  // };


  return (
    <div>
      <Switch>
        <ProtectedRoute path="/home" loggedIn={loggedIn} component={HomePage} />
        <Route path="/signin">
          <Login onLogin={handleLogin} history={history}/>
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


    </div>
  );
}

export default App;
