import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BeerFoodPairing extends Component {
    render() {
        return (
            <div id="beer-detail__food" className="col s4 offset-s1">
                <h5>Food Pairing</h5>
                <ul className="collection">
                    {this.props.foodPairing.map((pair, i) => (
                        <li key={i} className="collection-item">
                            {pair}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

BeerFoodPairing.propTypes = {
    foodPairing: PropTypes.arrayOf(PropTypes.string)
};
