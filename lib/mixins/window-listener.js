'use strict';

var eventsUtils = require('../utils/events');

module.exports = {
  componentDidMount: function componentDidMount() {
    var listeners = this.windowListeners,
        handler;

    for (var evt in listeners) {
      handler = listeners[evt];
      eventsUtils.on(window, evt, this[handler]);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    var listeners = this.windowListeners,
        handler;

    for (var evt in listeners) {
      handler = listeners[evt];
      eventsUtils.off(window, evt, this[handler]);
    }
  }
};