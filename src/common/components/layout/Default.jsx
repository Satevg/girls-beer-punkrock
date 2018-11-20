import React, { Component } from "react";
import Menu from "../menu/Menu";

class Default extends Component {
    render() {
        return (
            <div>
                <Menu />
                <div id="main" className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Default;
