import React, { Component } from "react";
import BeerStore from "../stores/BeerStore";
import BeerCard from "../widgets/BeerCard";
import Spinner from "../icons/Spinner";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.beerStore = BeerStore;
        this.limit = 15;
        this.state = {
            page: 1,
            beers: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        let beers = this.beerStore.getBeers({ limit: this.limit, page: this.state.page });
        this.setState({
            beers: beers,
        });
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
        let moreBeers = this.beerStore.getBeers({ limit: this.limit, page: this.state.page + 1 });
        Array.prototype.push.apply(this.state.beers, moreBeers);

        this.setState({
            page: page,
            isLoading: false,
        });
    };

    trackScrolling = () => {
        const wrappedElement = document.getElementById("main");
        if (this.isBottom(wrappedElement)) {
            console.info("Bottom reached");
            this.fetchMoreBeers();
        }
    };

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.beers.map((beer, i) => {
                        return <BeerCard key={i} item={beer} />;
                    })}
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
