import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BeerCard from '../BeerCard';
import BeerStore from '../../../../data-access/services/beerService';
import SearchForm from '../SearchForm';
import Spinner from '../../../../common/components/spinner';
import ResultsFilter from '../ResultsFilter';
import { PAGINATION_HOME_SEARCH } from '../../../../common/constants/app';
import { addBeers, clearBeers, setBeers } from '../../actions/index';

const mapStateToProps = state => ({
    beers: state.beers
});

const mapDispatchToProps = dispatch => ({
    addBeers: beers => dispatch(addBeers(beers)),
    setBeers: beers => dispatch(setBeers(beers)),
    clearBeers: () => dispatch(clearBeers())
});

class ConnectedHome extends Component {
    constructor(props) {
        super(props);
        this.beerStore = BeerStore;
        this.initialFilters = { abv_lt: 14, ibu_lt: 120, ebc_lt: 80 };
        this.state = {
            page: 1,
            isLoading: false,
            defaultFilters: this.initialFilters
        };
        this.stopSearch = false;
        this.searchString = '';
        this.pinFilter = false;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    fetchMoreBeers = () => {
        if (this.searchString && !this.state.isLoading) {
            this.setState({ isLoading: true });
            let page = this.state.page + 1;
            const queryParams = this.state.defaultFilters;
            queryParams.per_page = PAGINATION_HOME_SEARCH;
            queryParams.beer_name = this.searchString;
            queryParams.page = page;

            this.beerStore
                .searchBeers(queryParams)
                .then(moreBeers => {
                    this.props.addBeers(moreBeers);
                    if (moreBeers.length === 0) this.stopSearch = true;
                })
                .catch(() => {
                    ({ page } = this.state);
                    this.stopSearch = true;
                })
                .finally(() => {
                    this.setState({ page, isLoading: false });
                });
        }
    };

    performSearch = (value = null, additionalFilters = this.state.defaultFilters) => {
        // if value === null, then it's search for additional beers (infinite scroll);
        // as search string - value that have been used before

        this.setState({ isLoading: true, defaultFilters: additionalFilters });
        if (value === null) {
            this.pinFilter = true;
        } else {
            this.props.clearBeers();
            this.setState({ defaultFilters: this.initialFilters });
            this.searchString = value;
            this.pinFilter = false;
        }
        this.stopSearch = false;

        const queryParams = additionalFilters;
        queryParams.per_page = PAGINATION_HOME_SEARCH;
        queryParams.beer_name = this.searchString;
        queryParams.page = 1;

        this.beerStore
            .searchBeers(queryParams)
            .then(results => {
                this.props.setBeers(results);
            })
            .finally(() => {
                this.setState({ page: 1, isLoading: false });
            });
    };

    trackScrolling = () => {
        const wrappedElement = document.getElementById('main');
        if (this.isBottom(wrappedElement) && !this.stopSearch) {
            this.fetchMoreBeers();
        }
    };

    isBottom = el => el.getBoundingClientRect().bottom <= window.innerHeight;

    renderResults = resultExist => {
        if (this.state.isLoading) {
            return <Spinner />;
        }
        let result = null;
        if (resultExist) {
            result = this.props.beers.map(beer => <BeerCard key={beer.id} item={beer} />);
        } else if (this.searchString) {
            result = (
                <div className="center">
                    <h4>No results found</h4>
                </div>
            );
        }

        return result;
    };

    render() {
        const resultExist = !!this.props.beers.length;

        return (
            <div>
                <SearchForm performSearch={this.performSearch} />

                {resultExist || this.pinFilter ? (
                    <ResultsFilter performSearch={this.performSearch} />
                ) : null}

                <div className="row">
                    <div className="col s12">{this.renderResults(resultExist)}</div>
                </div>
            </div>
        );
    }
}

ConnectedHome.propTypes = {
    addBeers: PropTypes.func.isRequired,
    setBeers: PropTypes.func.isRequired,
    clearBeers: PropTypes.func.isRequired,
    beers: PropTypes.arrayOf(PropTypes.object)
};

ConnectedHome.defaultProps = {
    beers: []
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedHome);

export default Home;
