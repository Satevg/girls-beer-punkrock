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
          beers: beers
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
      offset: offset
    });
  };

  render() {
    const favoriteBeers = !!this.state.beers.length;

    return this.state.beers.length ? (
      <div>
        <h3>Your favorites</h3>
        <div className="row">
          {this.state.filteredBeers.map((beer, i) => {
            return (
              <FavoriteBeerCard removeFavoriteCard={this.removeFavoriteCard} key={i} item={beer} />
            );
          })}
        </div>
        {this.state.beers.length > 5 ? (
          <Paginator filterBeers={this.filterBeers} total={this.state.beers.length} />
        ) : null}
      </div>
    ) : this.state.isLoading ? (
      <div className="spinner">
        <Spinner />
      </div>
    ) : (
      <h1>You have no favorite beers yet</h1>
    );
  }
}
