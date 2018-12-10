import * as React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { App } from './app';
import { FoodPage, VintagePage } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
      <Route path="/" component={App} />
      <Switch>
        <Route path="/food" component={FoodPage} />
        <Route path="/vintages" component={VintagePage} />
      </Switch>
    </div>
    </HashRouter>
  );
}
