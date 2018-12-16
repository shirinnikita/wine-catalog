import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FoodPage from "./components/food";
import {VintagePage, VintagesPage} from "./components/vintage";

import Navigation  from "./components/navigation";
import Error from "./components/error"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            {/*<Route path="/" component={Home} exact />*/}
            <Route path="/food_page" component={FoodPage} />
            <Route path="/vintages_page" component={VintagesPage} />

            <Route path="/vintage/:id" component={VintagePage} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;