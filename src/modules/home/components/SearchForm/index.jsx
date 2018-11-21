import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
  }

  handleChange = event => {
    event.preventDefault();
    const searchText = event.target.value;
    if (event.target.value.length >= 3 || event.charCode === 13) {
      if (this.timeout) clearTimeout(this.timeout);
      // prevent frequent search requests when typing fast
      this.timeout = setTimeout(() => {
        this.props.performSearch(searchText);
      }, 300);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="row serch-filter__row">
            <div className="input-field col s12">
              <input
                id="email"
                type="text"
                placeholder="Search beers..."
                onKeyUp={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  performSearch: PropTypes.func.isRequired
};

export default SearchForm;
