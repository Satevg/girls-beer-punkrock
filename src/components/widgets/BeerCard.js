import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../icons/Like";
import { getFavorites, setFavorites } from "../utils/Tools";

class BeerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: null,
        };
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
        this.setState({ render: !this.state.render }); // rerender component
    };

    render() {
        let item = this.props.item;
        let favorites = getFavorites();
        let wouldIDrinkItOnMonday = favorites.includes(item.id);

        return (
            <div className="beer-card card col s3">
                <div className="card-image">
                    <img className="beer-card__image" src={item.image_url} />
                </div>
                <div className="card-content">
                    <span className="beer-card__title">{item.name}</span>
                    <div className="beer-card__tagline" />
                </div>
                <div className="card-action beer-card__action">
                    <a href="#">Open</a>
                    <Like onClick={() => this.toggleFavorite(item.id)} favorite={wouldIDrinkItOnMonday} />
                </div>
            </div>
        );
    }
}

export default BeerCard;
