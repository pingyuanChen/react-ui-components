'use strict';

var React = require('react');
var Tooltip = require('../tooltip');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onBtnTap: React.PropTypes.func,
    isShowTip: React.PropTypes.bool,
    tipClass: React.PropTypes.string,
    iconBtnClass: React.PropTypes.string,
    iconBtnTpl: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClass: ''
    };
  },

  getInitialState: function getInitialState() {
    return {
      isShowTip: false,
      hovered: false,
      tipClass: ''
    };
  },

  render: function render() {
    var props = this.props,
        tooltipEle,
        hoveredClass = this.state.hovered ? 'hovered' : '';
    if (props.tooltip) {
      tooltipEle = React.createElement(Tooltip, {
        ref: 'tooltip',
        tip: props.tooltip,
        isShow: this.state.isShowTip,
        customClass: props.tipClass });
    }

    return React.createElement(
      'span',
      {
        className: "icon-btn-wrap " + hoveredClass + ' ' + props.customClass,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave,
        onTouchTap: props.onBtnTap },
      React.createElement(
        'span',
        { className: "icon-btn " + props.iconBtnClass },
        props.iconBtnTpl ? props.iconBtnTpl() : ''
      ),
      tooltipEle
    );
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    this.setState({
      isShowTip: true,
      hovered: true
    });
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({
      isShowTip: false,
      hovered: false
    });
  }
});