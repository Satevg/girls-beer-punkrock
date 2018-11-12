import React, { Component } from "react";
import BeerStore from "../stores/BeerStore";
import Paginator from "../widgets/Paginator";
import FavoriteBeerCard from "../widgets/FavoriteBeerCard";
import { getFavorites } from "../utils/Tools";

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
        };
        this.favorites = getFavorites();
        this.beerStore = BeerStore;
    }

    componentDidMount() {
        let beers = this.beerStore.getFavoriteBeers(this.favorites);
        this.setState({
            beers: beers,
        });
    }

    removeFavoriteCard = beerId => {
        let filtered = this.state.beers.filter(beer => beer.id != beerId);
        this.setState({ beers: filtered });
    };

    render() {
        return this.state.beers.length ? (
            <div>
                <h2>YFB</h2>
                <div className="row">
                    {this.state.beers.map((beer, i) => {
                        return <FavoriteBeerCard removeFavoriteCard={this.removeFavoriteCard} key={i} item={beer} />;
                    })}
                </div>
                {this.state.beers.length > 5 ? <Paginator total={this.state.beers.length} /> : null}
            </div>
        ) : (
            <h1>You have no favorite beers yet</h1>
        );
    }
}
