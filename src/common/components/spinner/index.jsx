import './spinner.css';
import React, { Component } from 'react';

class Spinner extends Component {
  render() {
    return (
      <div className="spinnerWrapper">
        <svg className="spinner" viewBox="0 0 128 128">
          <g>
            <circle cx="16" cy="64" r="16" fill="#273B5B" />
            <circle cx="16" cy="64" r="14.344" fill="#ffffff" transform="rotate(45 64 64)" />
            <circle cx="16" cy="64" r="12.531" fill="#273B5B" transform="rotate(90 64 64)" />
            <circle cx="16" cy="64" r="10.75" fill="#273B5B" transform="rotate(135 64 64)" />
            <circle cx="16" cy="64" r="10.063" fill="#273B5B" transform="rotate(180 64 64)" />
            <circle cx="16" cy="64" r="8.063" fill="#273B5B" transform="rotate(225 64 64)" />
            <circle cx="16" cy="64" r="6.438" fill="#273B5B" transform="rotate(270 64 64)" />
            <circle cx="16" cy="64" r="5.375" fill="#273B5B" transform="rotate(315 64 64)" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
              calcMode="discrete"
              dur="720ms"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default Spinner;
