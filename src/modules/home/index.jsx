import React, { Component } from "react";
import BeerStore from "../../store/BeerStore/BeerStore";
import BeerCard from "./beer-card/";
import Spinner from "../../common/components/spinner/";
import SearchForm from "./search-form/";
import ResultsFilter from "./results-filter/";
import { PAGINATION_HOME_SEARCH } from "../../common/constants/app";

import { connect } from "react-redux";
import { addBeers, clearBeers, setBeers } from "../../store/ReduxStore/actions/index";

const mapStateToProps = state => {
    return {
        beers: state.beers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBeers: beers => dispatch(addBeers(beers)),
        setBeers: beers => dispatch(setBeers(beers)),
        clearBeers: () => dispatch(clearBeers()),
    };
};

class ConnectedHome extends Component {
    constructor(props) {
        super(props);
        this.beerStore = BeerStore;
        this.initialFilters = { abv_lt: 14, ibu_lt: 120, ebc_lt: 80 };
        this.state = {
            page: 1,
            isLoading: false,
            defaultFilters: this.initialFilters,
        };
        this.stopSearch = false;
        this.searchString = "";
        this.pinFilter = false;
    }

    componentDidMount() {
        document.addEventListener("scroll", this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.trackScrolling);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    fetchMoreBeers = () => {
        if (this.searchString && !this.state.isLoading) {
            this.setState({ isLoading: true });
            let page = this.state.page + 1;
            let queryParams = this.state.defaultFilters;
            queryParams["per_page"] = PAGINATION_HOME_SEARCH;
            queryParams["beer_name"] = this.searchString;
            queryParams["page"] = page;

            this.beerStore
                .searchBeers(queryParams)
                .then(moreBeers => {
                    this.props.addBeers(moreBeers);
                    if (moreBeers.length === 0) this.stopSearch = true;
                })
                .catch(err => {
                    page = this.state.page;
                    this.stopSearch = true;
                })
                .finally(() => {
                    this.setState({ page: page, isLoading: false });
                });
        }
    };

    performSearch = (value = null, additional_filters = this.state.defaultFilters) => {
        // if value === null, then it's search for additional beers (infinite scroll);
        // as search string - value that have been used before

        this.setState({ isLoading: true, defaultFilters: additional_filters });
        if (value === null) {
            this.pinFilter = true;
        } else {
            this.props.clearBeers();
            this.setState({ defaultFilters: this.initialFilters });
            this.searchString = value;
            this.pinFilter = false;
        }
        this.stopSearch = false;

        let queryParams = additional_filters;
        queryParams["per_page"] = PAGINATION_HOME_SEARCH;
        queryParams["beer_name"] = this.searchString;
        queryParams["page"] = 1;

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
        const wrappedElement = document.getElementById("main");
        if (this.isBottom(wrappedElement) && !this.stopSearch) {
            this.fetchMoreBeers();
        }
    };

    render() {
        const resultExist = !!this.props.beers.length;

        return (
            <div>
                <SearchForm performSearch={this.performSearch} />
                {resultExist || this.pinFilter ? <ResultsFilter performSearch={this.performSearch} /> : null}

                <div className="row">
                    <div className="col s12">
                        {resultExist ? (
                            this.props.beers.map((beer, i) => {
                                return <BeerCard key={i} item={beer} />;
                            })
                        ) : this.searchString ? (
                            <div className="center">
                                <h4>No results found</h4>
                            </div>
                        ) : null}
                    </div>
                </div>
                {this.state.isLoading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : null}
            </div>
        );
    }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedHome);

export default Home;
