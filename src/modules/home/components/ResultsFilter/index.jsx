import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Range from '../../../../common/components/range';

import './index.css';

export default class ResultsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abv_lt: 14,
            ibu_lt: 120,
            ebc_lt: 80
        };
        this.timeout = 0;
        this.constructFilters();
    }

    constructFilters = () => {
        this.filters = [
            {
                name: 'abv_lt',
                fullName: 'Alcohol by volume',
                rangeComponent: (
                    <Range
                        min="2"
                        max="14"
                        defaultValue="14"
                        name="abv_lt"
                        handleChange={this.handleValue}
                    />
                )
            },
            {
                name: 'ibu_lt',
                fullName: 'International bitterness',
                rangeComponent: (
                    <Range
                        min="0"
                        max="120"
                        defaultValue="120"
                        name="ibu_lt"
                        handleChange={this.handleValue}
                    />
                )
            },
            {
                name: 'ebc_lt',
                fullName: 'Color by EBC',
                rangeComponent: (
                    <Range
                        min="4"
                        max="80"
                        defaultValue="80"
                        name="ebc_lt"
                        handleChange={this.handleValue}
                    />
                )
            }
        ];
    };

    handleValue = event => {
        const dict = {};
        dict[event.target.name] = event.target.value;
        this.setState(dict);
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.performSearch(null, this.state);
        }, 300);
    };

    renderFilters = () =>
        this.filters.map(item => (
            <div key={item.name} className="row search-filter__row">
                <div className="col s5">
                    <div className="right">
                        <p className="search-filter__label">
                            {item.fullName} <b>{this.state[item.name]}</b>
                        </p>
                    </div>
                </div>
                <div className="col s4">{item.rangeComponent}</div>
            </div>
        ));

    render() {
        return (
            <div>
                <div className="row search-filter__row">
                    <div className="col s12 center">
                        <h5>Filter results</h5>
                    </div>
                </div>
                {this.renderFilters()}
            </div>
        );
    }
}

ResultsFilter.propTypes = {
    performSearch: PropTypes.func.isRequired
};
