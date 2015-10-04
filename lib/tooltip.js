'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    tip: React.PropTypes.string.isRequired,
    isShow: React.PropTypes.bool,
    customClass: React.PropTypes.string
  },

  render: function render() {
    var props = this.props,
        className = props.isShow ? '' : 'hide',
        customCls = props.customClass || '';

    return React.createElement(
      'span',
      {
        className: "tooltip " + className + ' ' + customCls },
      props.tip
    );
  }
});