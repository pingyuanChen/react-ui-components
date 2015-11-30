var React       = require('react');
var ReactDOM    = require('react-dom');
var eventsUtils = require('../utils/events');
var domUtils    = require('../utils/dom');

module.exports = {
  componentDidMount: function(){
    this._bindClick();
  },

  componentWillUnmount: function(){
    this._unbindClick();
  },

  _checkClick: function(e){
    var el = ReactDOM.findDOMNode(this),
      target = e.target;

    if(target != el && !domUtils.isDescendant(el, target) && document.documentElement.contains(target)){
      this.componentClick && this.componentClick(e, el);
    }
  },

  _bindClick: function(){
    eventsUtils.on(document, 'mouseup', this._checkClick);
    eventsUtils.on(document, 'touchend', this._checkClick);
  },

  _unbindClick: function(){
    eventsUtils.off(document, 'mouseup', this._checkClick);
    eventsUtils.off(document, 'touchend', this._checkClick);
  }
};