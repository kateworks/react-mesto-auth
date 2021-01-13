import React, {useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import HomePage from '../screens/HomePage';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NotFound from '../screens/NotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/home" loggedIn={loggedIn} component={HomePage} />
        <Route path="/sign-in">
          <Login />
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
