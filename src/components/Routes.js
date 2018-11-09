import React, { Component } from "react";
import { Route, Switch } from "react-router";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/favorites" component={Favorites} />
                </Switch>
            </div>
        );
    }
}
