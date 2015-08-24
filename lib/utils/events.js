'use strict';

module.exports = {
  on: function on(el, eventType, func) {
    if (window.addEventListener) {
      el.addEventListener(eventType, func, false);
    } else {
      el.attachEvent('on' + eventType, func);
    }
  },

  off: function off(el, eventType, func) {
    if (window.removeEventListener) {
      el.removeEventListener(eventType, func, false);
    } else {
      el.detachEvent('on' + eventType, func);
    }
  }
};