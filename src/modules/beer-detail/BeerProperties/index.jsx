import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BeerProperties extends Component {
    render() {
        const { item } = this.props;

        return (
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
        );
    }
}

BeerProperties.propTypes = {
    item: PropTypes.object.isRequired
};
