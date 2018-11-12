import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PAGINATION_ITEMS_PER_PAGE } from "../constants/app";

class Paginator extends Component {
    constructor(props) {
        super(props);
        this.totalPages = Math.ceil(this.props.total / PAGINATION_ITEMS_PER_PAGE);
        this.state = {
            currentPage: 1,
        };
    }

    render() {
        console.log(this.totalPages, "Total pages");
        return (
            <ul className="pagination">
                <li className={this.state.currentPage === 1 ? 'disabled': ''}>
                    <a href="#!">
                        <i className="material-icons">chevron_left</i>
                    </a>
                </li>

                {[...Array(this.totalPages).keys()].map(i => {
                    let classnames = "waves-effect";
                    if (this.state.currentPage === i + 1) classnames += " active";
                    return (
                        <li key={i} className={classnames}>
                            <a href="#!">{i + 1}</a>
                        </li>
                    );
                })}
                <li className={this.state.currentPage === this.totalPages ? 'disabled': ''}>
                    <a href="#!">
                        <i className="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        );
    }
}

export default Paginator;
