import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
import AddRemoveFavoriteButton from '../../../../common/components/add-remove-favorite-button';
import { getFavorites, setFavorites } from '../../../../common/utils/Tools';

class BeerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false
    };
  }

  toggleFavorite = beerId => {
    const favorites = getFavorites();
    const index = favorites.indexOf(beerId);
    if (favorites.indexOf(beerId) > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(beerId);
    }
    setFavorites(favorites);
  };

  reRender = () => {
    this.setState(prevState => ({
      render: !prevState.render
    }));
  };

  render() {
    const item = this.props.item;

    return (
      <div className="beer-card card col s4">
        <div className="card-image">
          <img className="beer-card__image circle" alt={item.name} src={item.image_url} />
        </div>
        <div className="card-content center">
          <span className="beer-card__title">{item.name}</span>
          <div className="beer-card__tagline">{item.tagline}</div>
        </div>
        <div className="card-action beer-card__action center">
          <Link to={`/beer/${item.id}`} className="waves-effect waves-light btn-small">
            Open
          </Link>
          <AddRemoveFavoriteButton id={item.id} reRender={this.reRender} />
        </div>
      </div>
    );
  }
}

BeerCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default BeerCard;
