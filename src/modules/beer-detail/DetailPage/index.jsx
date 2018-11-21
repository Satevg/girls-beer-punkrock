import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.css';
import AddRemoveFavoriteButton from '../../../common/components/add-remove-favorite-button';
import BeerStore from '../../../data-access/services/beerService';
import Spinner from '../../../common/components/spinner';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.beerStore = BeerStore;
        this.state = { item: null, isLoading: false };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.beerStore
            .getBeer(this.id)
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

    render() {
        const { item } = this.state;

        let component = null;
        if (item) {
            component = (
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
                                <img
                                    className="beer-card__image"
                                    alt={item.name}
                                    src={item.image_url}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div id="beer-detail__properties" className="col s4">
                            <h5>Properties</h5>
                            <ul className="collection">
                                <li className="collection-item">
                                    ABV
                                    <div className="beer-detail__value right">
                                        <div className="center"> {item.abv}</div>
                                    </div>
                                </li>
                                <li className="collection-item">
                                    IBU
                                    <div className="beer-detail__value right">
                                        <div className="center"> {item.ibu}</div>
                                    </div>
                                </li>
                                <li className="collection-item">
                                    EBC
                                    <div className="beer-detail__value right">
                                        <div className="center"> {item.ebc}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div id="beer-detail__food" className="col s4 offset-s1">
                            <h5>Food Pairing</h5>
                            <ul className="collection">
                                {item.food_pairing.map((pair, i) => (
                                    <li key={i} className="collection-item">
                                        {pair}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s10">
                            <h5>Brewing</h5>
                            <p id="beer-detail__brewing">{item.brewers_tips}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div id="beer-detail__ingredients" className="col s4">
                            <h5>Ingredients</h5>
                            <ul className="collection">
                                <li className="collection-item">
                                    <span className="beer-detail__ingredients-title">Water</span>
                                    <p className="beer-detail__ingredients-detail">
                                        {item.volume.value} {item.volume.unit}
                                    </p>
                                </li>
                                <li className="collection-item">
                                    <span className="beer-detail__ingredients-title">Malt</span>
                                    {item.ingredients.malt.map((malt, i) => (
                                        <p key={i} className="beer-detail__ingredients-detail">
                                            {malt.name} - {malt.amount.value} {malt.amount.unit}
                                        </p>
                                    ))}
                                </li>
                                <li className="collection-item">
                                    <span className="beer-detail__ingredients-title">Hops</span>
                                    {item.ingredients.hops.map((hop, i) => (
                                        <p key={i} className="beer-detail__ingredients-detail">
                                            {hop.name} - {hop.amount.value} {hop.amount.unit}. When:{' '}
                                            {hop.add}
                                        </p>
                                    ))}
                                </li>
                                <li className="collection-item">
                                    <span className="beer-detail__ingredients-title">Yeast</span>
                                    <p className="beer-detail__ingredients-detail">
                                        {item.ingredients.yeast}
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div id="beer-detail__ingredients" className="col s4 offset-s1">
                            <h5>Method</h5>
                            <ul className="collection">
                                <li className="collection-item">
                                    <span className="beer-detail__ingredients-title">Mesh</span>
                                    {item.method.mash_temp.map((mash, i) => (
                                        <p key={i} className="beer-detail__ingredients-detail">
                                            {mash.duration} minutes at {mash.temp.value} °
                                            {mash.temp.unit === 'celsius' ? 'C' : 'F'}
                                        </p>
                                    ))}
                                </li>
                                <li className="collection-item">
                                    <span className="beer-detail__ingredients-title">
                                        Fermentation
                                    </span>
                                    <p className="beer-detail__ingredients-detail">
                                        Perform at {item.method.fermentation.temp.value} °
                                        {item.method.fermentation.temp.unit === 'celsius'
                                            ? 'C'
                                            : 'F'}
                                    </p>
                                </li>
                                <li className="collection-item">
                                    <span className="beer-detail__ingredients-title">Twist</span>
                                    <p className="beer-detail__ingredients-detail">
                                        {item.method.twist ? item.method.twist : 'No data'}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.isLoading) {
            component = <Spinner />;
        } else {
            component = (
                <div className="center">
                    <h4>Not Found</h4>
                </div>
            );
        }

        return <div>{component}</div>;
    }
}

DetailPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    })
};
