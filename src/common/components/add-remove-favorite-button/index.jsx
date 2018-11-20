import React, { Component } from "react";
import { getFavorites, setFavorites } from "../../utils/Tools";

class AddRemoveFavoriteButton extends Component {
    constructor(props) {
        super(props);
        this.state = { render: false };
    }

    toggleFavorite = beerId => {
        let favorites = getFavorites();
        let index = favorites.indexOf(beerId);
        if (favorites.indexOf(beerId) > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(beerId);
        }
        setFavorites(favorites);
        this.props.reRender();
    };

    render() {
        let favorites = getFavorites();
        let wouldIDrinkItOnMonday = favorites.includes(this.props.id);

        return (
            <a className="waves-effect waves-light btn-small" onClick={() => this.toggleFavorite(this.props.id)}>
                {wouldIDrinkItOnMonday ? "Remove favorite" : "Add favorite"}
            </a>
        );
    }
}

export default AddRemoveFavoriteButton;
