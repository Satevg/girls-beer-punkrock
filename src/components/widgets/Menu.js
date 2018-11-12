import React, { Component } from "react";
import MenuLinks from "./MenuLinks";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggleMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        let menuStatus = this.state.isOpen ? "isopen" : "";
        return (
            <div ref="root">
                <div className="menubar">
                    <div className="hambclicker" onClick={this.toggleMenu} />
                    <div id="hambmenu" className={menuStatus}>
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className="title">
                        <span>TTTT</span>
                    </div>
                </div>
                <MenuLinks hideMenu={this.toggleMenu} menuStatus={menuStatus} />
            </div>
        );
    }
}

export default Menu;
