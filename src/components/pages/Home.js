import React, { Component } from "react";
import BeerStore from "../stores/BeerStore";
import BeerCard from "../widgets/BeerCard";
import Spinner from "../icons/Spinner";
import SearchForm from "../forms/SearchForm";
import ResultsFilter from "../forms/ResultsFilter";
import { PAGINATION_HOME_SEARCH } from "../constants/app";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.beerStore = BeerStore;
        this.state = {
            page: 1,
            beers: [],
            isLoading: false,
            defaultFilters: { abv_lt: 14, ibu_lt: 120, ebc_lt: 80 },
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
        this.setState({ isLoading: true });
        let page = this.state.page + 1;
        let queryParams = this.state.defaultFilters;
        queryParams["per_page"] = PAGINATION_HOME_SEARCH;
        queryParams["beer_name"] = this.searchString;
        queryParams["page"] = page;

        let moreBeers = this.beerStore.searchBeers(queryParams);
        Array.prototype.push.apply(this.state.beers, moreBeers);
        if (moreBeers.length === 0) this.stopSearch = true;
        this.setState({ page: page, isLoading: false });
    };

    performSearch = (value = null, additional_filters = this.state.defaultFilters) => {
        this.setState({ isLoading: true, defaultFilters: additional_filters });
        if (value === null) {
            this.pinFilter = true;
        } else {
            this.searchString = value;
            this.pinFilter = false;
        }
        this.stopSearch = false;

        let queryParams = additional_filters;
        queryParams["per_page"] = PAGINATION_HOME_SEARCH;
        queryParams["beer_name"] = this.searchString;
        queryParams["page"] = 1;

        let results = this.beerStore.searchBeers(queryParams);
        this.setState({ beers: results, page: 1, isLoading: false });
    };

    trackScrolling = () => {
        const wrappedElement = document.getElementById("main");
        if (this.isBottom(wrappedElement) && !this.stopSearch) {
            this.fetchMoreBeers();
        }
    };

    render() {
        const resultExist = !!this.state.beers.length;

        return (
            <div>
                <SearchForm performSearch={this.performSearch} />
                {resultExist || this.pinFilter ? <ResultsFilter performSearch={this.performSearch} /> : null}

                <div className="row">
                    {resultExist ? (
                        this.state.beers.map((beer, i) => {
                            return <BeerCard key={i} item={beer} />;
                        })
                    ) : this.searchString ? (
                        <div className="center">
                            <h4>No results found</h4>
                        </div>
                    ) : null}
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
