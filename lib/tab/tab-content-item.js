'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    index: React.PropTypes.number,
    selected: React.PropTypes.bool,
    onTapContent: React.PropTypes.func,
    className: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      index: 0,
      selected: false
    };
  },

  render: function render() {
    var props = this.props,
        itemCls = "tab-content-item";
    if (props.className) {
      itemCls += ' ' + props.className;
    }
    return React.createElement(
      'div',
      {
        className: itemCls + (props.selected ? " selected" : " hide"),
        onTouchTap: this._onTap },
      props.children
    );
  },

  _onTap: function _onTap(e) {
    var props = this.props;
    props.onTapContent && props.onTapContent(props.index, this, e);
  }
});