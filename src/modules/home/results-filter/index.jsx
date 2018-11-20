import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './search-filter.css';
import Range from '../../../common/components/range';

class ResultsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abv_lt: 14,
      ibu_lt: 120,
      ebc_lt: 80
    };
    this.timeout = 0;
  }

  // 1. Alcohol by volume with range from 2 to 14;
  // 2. International bitterness units with range from 0 to 120;
  // 3. Color by EBC with range from 4 to 80.

  handleValue = event => {
    let dict = {};
    dict[event.target.name] = event.target.value;
    this.setState(dict);
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.performSearch(null, this.state);
    }, 300);
  };

  render() {
    return (
      <div>
        <div className="row search-filter__row">
          <div className="col s12 center">
            <h5>Filter results</h5>
          </div>
        </div>

        <div className="row search-filter__row">
          <div className="col s5">
            <div className="right">
              <p className="search-filter__label">
                Alcohol by volume <b>{this.state.abv_lt}</b>
              </p>
            </div>
          </div>
          <div className="col s4">
            <Range
              min="2"
              max="14"
              defaultValue="14"
              // step="0.1" API does not support decimal
              name="abv_lt"
              handleChange={this.handleValue}
            />
          </div>
        </div>

        <div className="row search-filter__row">
          <div className="col s5">
            <div className="right">
              <p className="search-filter__label">
                International bitterness <b>{this.state.ibu_lt}</b>
              </p>
            </div>
          </div>
          <div className="col s4">
            <Range
              min="0"
              max="120"
              defaultValue="120"
              name="ibu_lt"
              handleChange={this.handleValue}
            />
          </div>
        </div>

        <div className="row search-filter__row">
          <div className="col s5">
            <div className="right">
              <p className="search-filter__label">
                Color by EBC <b>{this.state.ebc_lt}</b>
              </p>
            </div>
          </div>
          <div className="col s4">
            <Range
              min="4"
              max="80"
              defaultValue="80"
              name="ebc_lt"
              handleChange={this.handleValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

ResultsFilter.propTypes = {
  performSearch: PropTypes.func.isRequired
};

export default ResultsFilter;
