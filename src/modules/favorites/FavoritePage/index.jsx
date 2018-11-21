import React, { Component } from 'react';

import BeerStore from '../../../data-access/services/beerService';
import FavoriteBeerCard from '../FavoriteBeerCard';
import Paginator from '../../../common/components/paginator';
import Spinner from '../../../common/components/spinner';
import { getFavorites } from '../../../common/utils/Tools';
import { PAGINATION_FAVORITES } from '../../../common/constants/app';

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
            filteredBeers: [],
            offset: null,
            isLoading: false
        };
        this.favorites = getFavorites();
        this.beerStore = BeerStore;
        this.isLoading = false;
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.beerStore
            .getFavoriteBeers(this.favorites)
            .then(beers => {
                this.setState({
                    beers
                });
                if (this.state.offset === null) {
                    this.filterBeers(1, beers);
                }
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    removeFavoriteCard = beerId => {
        const beers = this.state.beers.filter(beer => beer.id !== beerId);
        const filteredBeers = this.state.filteredBeers.filter(beer => beer.id !== beerId);
        this.setState({ beers, filteredBeers });
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
        const end = start + PAGINATION_FAVORITES;
        let beersToShow = [];
        if (beers !== undefined) {
            beersToShow = beers.slice(start, end);
        } else {
            beersToShow = this.state.beers.slice(start, end);
        }
        this.setState({
            filteredBeers: beersToShow,
            offset
        });
    };

    renderNoFavorites = () => (this.state.isLoading ? <Spinner /> : <h3>You have no favorites</h3>);

    renderFavorites = () => {
        const favorites = this.state.filteredBeers.map(beer => (
            <FavoriteBeerCard
                removeFavoriteCard={this.removeFavoriteCard}
                key={beer.id}
                item={beer}
            />
        ));

        return favorites;
    };

    renderPaginator = () => {
        let component = null;
        if (this.state.beers.length > 5) {
            component = (
                <Paginator filterBeers={this.filterBeers} total={this.state.beers.length} />
            );
        }

        return component;
    };

    render() {
        const favsExist = this.state.beers.length;

        return !favsExist ? (
            this.renderNoFavorites()
        ) : (
            <div>
                <h3>Your favorites</h3>
                <div className="row">{this.renderFavorites()}</div>
                {this.renderPaginator()}
            </div>
        );
    }
}
