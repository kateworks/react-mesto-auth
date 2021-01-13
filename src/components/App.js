import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from '../screens/HomePage';
import NotFound from '../screens/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
