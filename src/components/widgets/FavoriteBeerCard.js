import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFavorites, setFavorites } from "../utils/Tools";

class FavoriteBeerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: null,
        };
    }

    removeFavorite = beerId => {
        let favorites = getFavorites();
        let index = favorites.indexOf(beerId);
        if (favorites.indexOf(beerId) > -1) {
            favorites.splice(index, 1);
        }
        setFavorites(favorites);
        this.props.removeFavoriteCard(beerId);
    };

    render() {
        let item = this.props.item;
        return (
            <div className="favorite-beer-card card s12">
                <div className="card-content">
                    <div className="row">
                        <div className="col s9">
                            <h5 className="favorite-beer-card__title">{item.name}</h5>
                            <span className="favorite-beer-card__tagline">{item.tagline}</span>
                            <p className="favorite-beer-card__description">{item.description}</p>

                            <div className="favorite-beer-card__actions">
                                <a className="favorite-beer-card__button waves-effect waves-light btn-small">Open</a>
                                <a
                                    className="favorite-beer-card__button waves-effect waves-light btn-small"
                                    onClick={() => this.removeFavorite(item.id)}
                                >
                                    REMOVE FAVORITE
                                </a>
                            </div>
                        </div>

                        <div className="col s3">
                            <img className="favorite-beer-card__image" src={item.image_url} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FavoriteBeerCard;
