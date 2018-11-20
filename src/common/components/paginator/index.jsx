import "./paginator.css";

import React, { Component } from "react";
import { PAGINATION_FAVORITES } from "../../constants/app";

class Paginator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
    }

    calcPages = () => {
        this.totalPages = Math.ceil(this.props.total / PAGINATION_FAVORITES);
        if (this.totalPages < this.state.currentPage) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    };

    setPage = page => {
        this.setState({ currentPage: page });
        this.props.filterBeers(page);
    };

    render() {
        this.calcPages();
        return (
            <ul className="pagination">
                <li
                    className={this.state.currentPage === 1 ? "disabled" : "" + " pagination__icon"}
                    onClick={() => this.state.currentPage !== 1 && this.setPage(this.state.currentPage - 1)}
                >
                    <a>
                        <i className="material-icons">chevron_left</i>
                    </a>
                </li>

                {[...Array(this.totalPages).keys()].map(i => {
                    let classnames = "waves-effect";
                    let humanPage = i + 1;
                    if (this.state.currentPage === humanPage) classnames += " active";
                    return (
                        <li key={i} className={classnames}>
                            <a onClick={() => this.setPage(humanPage)}>{humanPage}</a>
                        </li>
                    );
                })}
                <li
                    className={this.state.currentPage === this.totalPages ? "disabled" : "" + " pagination__icon"}
                    onClick={() =>
                        this.state.currentPage !== this.totalPages && this.setPage(this.state.currentPage + 1)
                    }
                >
                    <a>
                        <i className="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        );
    }
}

export default Paginator;
