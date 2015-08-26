'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onTap: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClass: ''
    };
  },

  render: function render() {
    var props = this.props;
    return React.createElement(
      'button',
      {
        className: "btn " + props.customClass,
        disabled: props.disabled,
        onTouchTap: this._onTap },
      props.label,
      props.children
    );
  },

  _onTap: function _onTap() {
    this.props.onTap();
  }
});