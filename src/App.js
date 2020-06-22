import React from 'react';
import './App.scss';
import { Switch, Redirect, Route } from 'react-router-dom';
import ComposeMessage from './containers/composeMessage/ComposeMessage';
import Login from './containers/auth/Login';
import Logout from './containers/auth/Logout';
import ManageEmails from './containers/manageEmails/ManageEmails';
import Layout from './components/layout/Layout';
import { useSelector } from 'react-redux';

function App() {
  const authSelector = useSelector((state) => state.auth);
  let route = (
    <Switch>
      <Route path="/login" component={Login} />
      <Redirect from={'/'} to={'/login'} />
    </Switch>
  );

  if (authSelector.isAuthticated) {
    route = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/compose" component={ComposeMessage} />
        <Route path="/manage" component={ManageEmails} />
        <Route path="/login" component={Login} />
        <Redirect exact from={'/'} to={'/compose'} />
      </Switch>
    );
  }
  return (
    <React.Fragment>
      <Layout>{route}</Layout>
    </React.Fragment>
  );
}

export default App;
