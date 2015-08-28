"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",

  propTypes: {
    index: React.PropTypes.number,
    title: React.PropTypes.string,
    selected: React.PropTypes.bool,
    headTpl: React.PropTypes.func,
    onTap: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      index: 0,
      selected: false
    };
  },

  render: function render() {
    var props = this.props,
        style = {
      width: props.width
    },
        titleEle;
    if (props.headTpl) {
      titleEle = props.headTpl(props.title, props.selected);
    } else {
      titleEle = props.title;
    }

    return React.createElement(
      "div",
      {
        className: "tab-head-item " + (props.selected ? "selected" : ""),
        style: style,
        onTouchTap: this._onTap },
      titleEle
    );
  },

  _onTap: function _onTap(e) {
    this.props.onTap && this.props.onTap(this.props.index, this.props.title, e);
  }
});