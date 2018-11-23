import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BeerMethod extends Component {
    render() {
        return (
            <div id="beer-detail__ingredients" className="col s4 offset-s1">
                <h5>Method</h5>
                <ul className="collection">
                    <li className="collection-item">
                        <span className="beer-detail__ingredients-title">Mesh</span>
                        {this.props.method.mash_temp.map((mash, i) => (
                            <p key={i} className="beer-detail__ingredients-detail">
                                {mash.duration} minutes at {mash.temp.value} °
                                {mash.temp.unit === 'celsius' ? 'C' : 'F'}
                            </p>
                        ))}
                    </li>
                    <li className="collection-item">
                        <span className="beer-detail__ingredients-title">Fermentation</span>
                        <p className="beer-detail__ingredients-detail">
                            Perform at {this.props.method.fermentation.temp.value} °
                            {this.props.method.fermentation.temp.unit === 'celsius' ? 'C' : 'F'}
                        </p>
                    </li>
                    <li className="collection-item">
                        <span className="beer-detail__ingredients-title">Twist</span>
                        <p className="beer-detail__ingredients-detail">
                            {this.props.method.twist ? this.props.method.twist : 'No data'}
                        </p>
                    </li>
                </ul>
            </div>
        );
    }
}

BeerMethod.propTypes = {
    method: PropTypes.object
};
