import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from '../../common/components/menu/Menu/index';

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

Default.propTypes = {
    children: PropTypes.any
};

export default Default;
