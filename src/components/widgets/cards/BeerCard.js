import React, { Component } from "react";
import AddRemoveFavoriteButton from "../../widgets/html/AddRemoveFavoriteButton";
import { getFavorites, setFavorites } from "../../utils/Tools";
import { Link } from "react-router-dom";

class BeerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
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
    };

    reRender = () => {
        this.setState({ render: !this.state.render });
    };

    render() {
        let item = this.props.item;

        return (
            <div className="beer-card card col s4">
                <div className="card-image">
                    <img className="beer-card__image" alt={item.name} src={item.image_url} />
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

export default BeerCard;
