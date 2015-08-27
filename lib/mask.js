'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    autoLockScroll: React.PropTypes.bool,
    isShow: React.PropTypes.bool,
    onTap: React.PropTypes.func
  },

  _originalBodyOverflow: '',

  componentDidMount: function componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
    if (this.props.autoLockScroll) {
      this._disableScroll();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._enableScroll();
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.autoLockScroll) {
      this.props.isShow ? this._disableScroll() : this._enableScroll();
    }
  },

  render: function render() {
    return React.createElement('div', {
      className: 'mask',
      onTouchTap: this._onTap });
  },

  _disableScroll: function _disableScroll() {
    document.getElementsByTagName('body')[0].style.oveflow = 'hidden';
  },

  _enableScroll: function _enableScroll() {
    document.getElementsByTagName('body')[0].style.oveflow = this._originalBodyOverflow;
  },

  _onTap: function _onTap(e) {
    this.props.onTap && this.props.onTap(e);
  }
});