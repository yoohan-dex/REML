import Layout from 'components/Layout';
import Home from './pages/Index';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
export default function Routes() {
  return (
    <Switch>
      <Route path="/template-edit" component={Layout} />
      <Route path="/" component={Home} />
    </Switch>
  );
}