import React, { Component } from 'react';

import './index.css';
import MenuLinks from '../MenuLinks';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.btnRef = React.createRef();
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    render() {
        const menuStatus = this.state.isOpen ? 'isopen' : '';

        return (
            <div ref={this.btnRef}>
                <div className="menubar">
                    <div className="hambclicker" onClick={this.toggleMenu} />
                    <div id="hambmenu" className={menuStatus}>
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className="left">
                        <span>bctg</span>
                    </div>
                </div>
                <MenuLinks hideMenu={this.toggleMenu} menuStatus={menuStatus} />
            </div>
        );
    }
}

export default Menu;
