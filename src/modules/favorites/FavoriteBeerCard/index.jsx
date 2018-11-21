import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
import { getFavorites, setFavorites } from '../../../common/utils/Tools';

class FavoriteBeerCard extends Component {
  removeFavorite = beerId => {
    const favorites = getFavorites();
    const index = favorites.indexOf(beerId);
    if (favorites.indexOf(beerId) > -1) {
      favorites.splice(index, 1);
    }
    setFavorites(favorites);
    this.props.removeFavoriteCard(beerId);
  };

  render() {
    const item = this.props.item;
    return (
      <div className="favorite-beer-card card s12">
        <div className="card-content">
          <div className="row">
            <div className="col s9">
              <h5 className="favorite-beer-card__title">{item.name}</h5>
              <span className="favorite-beer-card__tagline">{item.tagline}</span>
              <p className="favorite-beer-card__description">{item.description}</p>

              <div className="favorite-beer-card__actions">
                <Link to={`/beer/${item.id}`}>
                  <button className="favorite-beer-card__button waves-effect waves-light btn-small">
                    Open
                  </button>
                </Link>
                <button
                  className="favorite-beer-card__button waves-effect waves-light btn-small"
                  onClick={() => this.removeFavorite(item.id)}
                >
                  REMOVE FAVORITE
                </button>
              </div>
            </div>

            <div className="col s3">
              <img className="favorite-beer-card__image" src={item.image_url} alt={item.name} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FavoriteBeerCard.propTypes = {
  item: PropTypes.object.isRequired,
  removeFavoriteCard: PropTypes.func.isRequired
};

export default FavoriteBeerCard;
