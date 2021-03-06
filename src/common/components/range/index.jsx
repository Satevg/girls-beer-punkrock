import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Range extends Component {
    render() {
        return (
            <p className="range-field">
                <input
                    type="range"
                    defaultValue={this.props.defaultValue}
                    name={this.props.name}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    onChange={this.props.handleChange}
                />
            </p>
        );
    }
}

Range.propTypes = {
    name: PropTypes.string,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    step: PropTypes.string,
    defaultValue: PropTypes.string,
    handleChange: PropTypes.func.isRequired
};

Range.defaultProps = {
    name: 'default',
    step: '1',
    defaultValue: '120'
};
