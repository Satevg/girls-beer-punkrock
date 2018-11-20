import React, { Component } from 'react';

class Range extends Component {
  render() {
    let name = this.props.name ? this.props.name : 'default';
    let min = this.props.min ? this.props.min : 0;
    let max = this.props.max ? this.props.max : 120;
    let step = this.props.step ? this.props.step : 1;
    let defaultValue = this.props.default ? this.props.default : 120;

    return (
      <p className="range-field">
        <input
          type="range"
          defaultValue={defaultValue}
          name={name}
          min={min}
          max={max}
          step={step}
          onChange={this.props.handleChange}
        />
      </p>
    );
  }
}

export default Range;
