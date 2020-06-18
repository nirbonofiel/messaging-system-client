import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import ComposeMessage from './containers/composeMessage/ComposeMessage';
import Login from './containers/login/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from={'/'} to={'/login'} />
        <Route path="/login" component={Login} />
        <Route path="/compose" component={ComposeMessage} />
      </Switch>
    </Router>
  );
}

export default App;
