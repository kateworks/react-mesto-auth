import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

import HomePage from '../screens/HomePage';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NotFound from '../screens/NotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }

        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const handleLogin = () => {
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
        <Route path="/sign-in">
          <Login handleLogin={handleLogin} history={history}/>
        </Route>
        <Route path="/sign-up">
          <Register />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/sign-in" />}
        </Route>
        <Route path="/react-mesto-auth">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/sign-in" />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
