import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFavorites, setFavorites } from '../../utils/Tools';

class AddRemoveFavoriteButton extends Component {
    toggleFavorite = beerId => {
        const favorites = getFavorites();
        const index = favorites.indexOf(beerId);
        if (favorites.indexOf(beerId) > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(beerId);
        }
        setFavorites(favorites);
        this.props.reRender();
    };

    render() {
        const favorites = getFavorites();
        const wouldIDrinkItOnMonday = favorites.includes(this.props.id);

        return (
            <a
                className="waves-effect waves-light btn-small"
                onClick={() => this.toggleFavorite(this.props.id)}
            >
                {wouldIDrinkItOnMonday ? 'Remove favorite' : 'Add favorite'}
            </a>
        );
    }
}

AddRemoveFavoriteButton.propTypes = {
    id: PropTypes.number.isRequired,
    reRender: PropTypes.func.isRequired
};

export default AddRemoveFavoriteButton;
