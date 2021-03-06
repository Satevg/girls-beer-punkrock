import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PAGINATION_HOME_SEARCH } from '../../../../common/constants/app';
import BeerService from '../../../../data-access/services/beerService';
import Spinner from '../../../../common/components/spinner';
import BeerCard from '../BeerCard';
import SearchForm from '../SearchForm';
import ResultsFilter from '../ResultsFilter';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
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

            BeerService.searchBeers(queryParams)
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

        BeerService.searchBeers(queryParams)
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

SearchPage.propTypes = {
    addBeers: PropTypes.func.isRequired,
    setBeers: PropTypes.func.isRequired,
    clearBeers: PropTypes.func.isRequired,
    beers: PropTypes.arrayOf(PropTypes.object)
};

SearchPage.defaultProps = {
    beers: []
};
