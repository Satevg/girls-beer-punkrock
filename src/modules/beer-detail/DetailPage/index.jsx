import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BeerService from '../../../data-access/services/beerService';
import AddRemoveFavoriteButton from '../../../common/components/AddRemoveFavoriteButton';
import Spinner from '../../../common/components/spinner';
import BeerProperties from '../BeerProperties';
import BeerFoodPairing from '../BeerFoodPairing';
import BeerIngredients from '../BeerIngredients';
import BeerMethod from '../BeerMethod';

import './index.css';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = { item: null, isLoading: false };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        BeerService.getBeer(this.id)
            .then(item => {
                if (item !== null) {
                    this.setState({ item: item[0] });
                }
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    reRender = () => {
        this.setState(prevState => ({ render: !prevState.render }));
    };

    renderNoDetail = () => (this.state.isLoading ? <Spinner /> : <h4>Not Found</h4>);

    renderDetail = item => (
        <div className="beer-detail">
            <div className="row">
                <div className="col s9">
                    <h4 id="beer-detail__name">{item.name}</h4>
                    <p id="beer-detail__tagline">{item.tagline}</p>
                    <AddRemoveFavoriteButton reRender={this.reRender} id={item.id} />
                    <p id="beer-detail__description">{item.description}</p>
                </div>
                <div className="col s3">
                    <div className="card-image">
                        <img className="beer-card__image" alt={item.name} src={item.image_url} />
                    </div>
                </div>
            </div>
            <div className="row">
                <BeerProperties item={item} />
                <BeerFoodPairing foodPairing={item.food_pairing} />
            </div>
            <div className="row">
                <div className="col s10">
                    <h5>Brewing</h5>
                    <p id="beer-detail__brewing">{item.brewers_tips}</p>
                </div>
            </div>
            <div className="row">
                <BeerIngredients item={item} />
                <BeerMethod method={item.method} />
            </div>
        </div>
    );

    render() {
        const { item } = this.state;

        return item ? (
            this.renderDetail(item)
        ) : (
            <div className="center">{this.renderNoDetail()}</div>
        );
    }
}

DetailPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    })
};
