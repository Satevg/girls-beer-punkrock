import React, { Component } from "react";
import BeerStore from "../stores/BeerStore";
import Paginator from "../widgets/Paginator";
import FavoriteBeerCard from "../widgets/cards/FavoriteBeerCard";
import { getFavorites } from "../utils/Tools";
import { PAGINATION_FAVORITES } from "../constants/app";

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
            filteredBeers: [],
            offset: null,
        };
        this.favorites = getFavorites();
        this.beerStore = BeerStore;
        this.isLoading = false;
    }

    componentDidMount() {
        this.isLoading = true;
        this.beerStore.getFavoriteBeers(this.favorites).then(beers => {
            this.setState({
                beers: beers,
            });
            if (this.state.offset === null) {
                this.filterBeers(1, beers);
            }
        });
    }

    removeFavoriteCard = beerId => {
        let beers = this.state.beers.filter(beer => beer.id !== beerId);
        let filteredBeers = this.state.filteredBeers.filter(beer => beer.id !== beerId);
        this.setState({ beers: beers, filteredBeers: filteredBeers });
        if (filteredBeers.length === 0) {
            this.filterBeers(this.state.offset - 1);
        } else {
            this.filterBeers(this.state.offset, beers);
        }
    };

    filterBeers = (offset, beers) => {
        let start = 0;
        if (offset !== 1) {
            start = (offset - 1) * PAGINATION_FAVORITES;
        }
        let end = start + PAGINATION_FAVORITES;
        let beersToShow = [];
        if (beers !== undefined) {
            beersToShow = beers.slice(start, end);
        } else {
            beersToShow = this.state.beers.slice(start, end);
        }
        this.setState({
            filteredBeers: beersToShow,
            offset: offset,
        });
    };

    render() {
        return this.state.beers.length ? (
            <div>
                <h2>yfb</h2>
                <div className="row">
                    {this.state.filteredBeers.map((beer, i) => {
                        return <FavoriteBeerCard removeFavoriteCard={this.removeFavoriteCard} key={i} item={beer} />;
                    })}
                </div>
                {this.state.beers.length > 5 ? (
                    <Paginator filterBeers={this.filterBeers} total={this.state.beers.length} />
                ) : null}
            </div>
        ) : (
            <h1>You have no favorite beers yet</h1>
        );
    }
}
