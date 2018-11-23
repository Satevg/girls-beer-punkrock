import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addBeers, clearBeers, setBeers } from '../../actions/index';
import SearchPage from '../SearchPage';

const mapStateToProps = state => ({
    beers: state.beers
});

const mapDispatchToProps = dispatch => ({
    addBeers: beers => dispatch(addBeers(beers)),
    setBeers: beers => dispatch(setBeers(beers)),
    clearBeers: () => dispatch(clearBeers())
});

class SearchPageContainer extends Component {
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

SearchPageContainer.propTypes = {
    addBeers: PropTypes.func.isRequired,
    setBeers: PropTypes.func.isRequired,
    clearBeers: PropTypes.func.isRequired,
    beers: PropTypes.arrayOf(PropTypes.object)
};

SearchPageContainer.defaultProps = {
    beers: []
};

const ConnectedSearchPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPageContainer);

export default ConnectedSearchPage;
