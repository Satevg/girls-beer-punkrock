import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BeerIngredients extends Component {
    render() {
        return (
            <div id="beer-detail__ingredients" className="col s4">
                <h5>Ingredients</h5>
                <ul className="collection">
                    <li className="collection-item">
                        <span className="beer-detail__ingredients-title">Water</span>
                        <p className="beer-detail__ingredients-detail">
                            {this.props.item.volume.value} {this.props.item.volume.unit}
                        </p>
                    </li>
                    <li className="collection-item">
                        <span className="beer-detail__ingredients-title">Malt</span>
                        {this.props.item.ingredients.malt.map((malt, i) => (
                            <p key={i} className="beer-detail__ingredients-detail">
                                {malt.name} - {malt.amount.value} {malt.amount.unit}
                            </p>
                        ))}
                    </li>
                    <li className="collection-item">
                        <span className="beer-detail__ingredients-title">Hops</span>
                        {this.props.item.ingredients.hops.map((hop, i) => (
                            <p key={i} className="beer-detail__ingredients-detail">
                                {hop.name} - {hop.amount.value} {hop.amount.unit}. When: {hop.add}
                            </p>
                        ))}
                    </li>
                    <li className="collection-item">
                        <span className="beer-detail__ingredients-title">Yeast</span>
                        <p className="beer-detail__ingredients-detail">
                            {this.props.item.ingredients.yeast}
                        </p>
                    </li>
                </ul>
            </div>
        );
    }
}

BeerIngredients.propTypes = {
    item: PropTypes.object
};
