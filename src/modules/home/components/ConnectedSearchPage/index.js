import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchPage from '../SearchPage';
import { addBeers, clearBeers, setBeers } from '../../actions/index';

const mapStateToProps = state => ({
    beers: state.beers
});

const mapDispatchToProps = dispatch => ({
    addBeers: beers => dispatch(addBeers(beers)),
    setBeers: beers => dispatch(setBeers(beers)),
    clearBeers: () => dispatch(clearBeers())
});

class ConnectedSearchPage extends Component {
    render() {
        return (
            <SearchPage
                addBeers={this.props.addBeers}
                setBeers={this.props.setBeers}
                clearBeers={this.props.clearBeers}
                beers={this.props.beers}
            />
        );
    }
}

ConnectedSearchPage.propTypes = {
    addBeers: PropTypes.func.isRequired,
    setBeers: PropTypes.func.isRequired,
    clearBeers: PropTypes.func.isRequired,
    beers: PropTypes.arrayOf(PropTypes.object)
};

ConnectedSearchPage.defaultProps = {
    beers: []
};

const SearchPageConn = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedSearchPage);

export default SearchPageConn;
