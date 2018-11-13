import React, { Component } from "react";

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;
        this.state = { abv_lt: 14, ibu_lt: 120, ebc_lt: 80 };
    }

    handleChange = event => {
        event.preventDefault();
        let searchText = event.target.value;
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
                            <input id="email" type="text" placeholder="Search beers..." onKeyUp={this.handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;
