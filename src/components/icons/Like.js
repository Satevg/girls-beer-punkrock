import React, { Component } from "react";

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = { icon: this.props.favorite ? "favorite" : "favorite_border" };
    }

    toggleIcon = () => {
        return this.state.icon === "favorite" ? "favorite_border" : "favorite";
    };

    handleClick = () => {
        this.props.onClick();
        let toggledIcon = this.toggleIcon();
        this.setState({ icon: toggledIcon });
    };

    render() {
        return (
            <i className="small material-icons" onClick={this.handleClick}>
                {this.state.icon}
            </i>
        );
    }
}

export default Spinner;
