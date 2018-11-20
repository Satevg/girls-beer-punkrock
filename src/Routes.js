import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Favorites from './modules/favorites/';
import Home from './modules/home/';
import BeerDetail from './modules/beer-detail/';

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/beer/:id" component={BeerDetail} />
        </Switch>
      </div>
    );
  }
}
