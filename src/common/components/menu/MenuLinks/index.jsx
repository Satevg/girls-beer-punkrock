import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MenuLinks extends Component {
    constructor() {
        super();
        this.btnRef = React.createRef();
    }

    render() {
        return (
            <div className={this.props.menuStatus} id="menu">
                <ul>
                    <li ref={this.btnRef}>
                        <Link to="/" onClick={this.props.hideMenu}>
                            Home
                        </Link>
                    </li>
                    <li ref={this.btnRef}>
                        <Link to="/favorites" onClick={this.props.hideMenu}>
                            Favorites
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

MenuLinks.propTypes = {
    menuStatus: PropTypes.string,
    hideMenu: PropTypes.func.isRequired
};

MenuLinks.defaultProps = {
    menuStatus: ''
};

export default MenuLinks;
