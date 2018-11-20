import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MenuLinks extends Component {
  render() {
    return (
      <div className={this.props.menuStatus} id="menu">
        <ul>
          <li ref="0">
            <Link to="/" onClick={this.props.hideMenu}>
              Home
            </Link>
          </li>
          <li ref="1">
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

export default MenuLinks;
