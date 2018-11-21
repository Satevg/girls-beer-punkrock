import React from 'react';
import { Route, Switch } from 'react-router';

import BeerDetail from './modules/beer-detail/DetailPage';
import Favorites from './modules/favorites/FavoritePage';
import Home from './modules/home/components/SearchPage';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/favorites" component={Favorites} />
      <Route exact path="/beer/:id" component={BeerDetail} />
    </Switch>
  </div>
);

export default Routes;
