'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var eventsUtils = require('../utils/events');
var domUtils = require('../utils/dom');

module.exports = {
  componentDidMount: function componentDidMount() {
    this._bindClick();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindClick();
  },

  _checkClick: function _checkClick(e) {
    var el = ReactDOM.findDOMNode(this),
        target = e.target;

    if (target != el && !domUtils.isDescendant(el, target) && document.documentElement.contains(target)) {
      this.componentClick && this.componentClick(e, el);
    }
  },

  _bindClick: function _bindClick() {
    eventsUtils.on(document, 'mouseup', this._checkClick);
    eventsUtils.on(document, 'touchend', this._checkClick);
  },

  _unbindClick: function _unbindClick() {
    eventsUtils.off(document, 'mouseup', this._checkClick);
    eventsUtils.off(document, 'touchend', this._checkClick);
  }
};