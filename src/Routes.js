import React from 'react';
import { Route, Switch } from 'react-router';

import DetailPage from './modules/beer-detail/DetailPage';
import Favorites from './modules/favorites/FavoritePage';
import SearchPage from './modules/home/components/SearchPageContainer';

const Routes = () => (
    <div>
        <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/beer/:id" component={DetailPage} />
        </Switch>
    </div>
);

export default Routes;
