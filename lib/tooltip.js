'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    tip: React.PropTypes.string.isRequired,
    isShow: React.PropTypes.bool,
    customClass: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      isShow: this.props.isShow || false
    };
  },

  render: function render() {
    var props = this.props,
        className = props.isShow ? '' : 'hide';

    return React.createElement(
      'span',
      {
        className: "tooltip " + className + ' ' + props.customClass },
      props.tip
    );
  }
});