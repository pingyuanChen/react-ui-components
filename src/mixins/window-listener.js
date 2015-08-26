var eventsUtils = require('../utils/events');

module.exports = {
  componentDidMount: function(){
    var listeners = this.windowListeners, 
      handler;

    for(var evt in listeners){
      handler = listeners[evt];
      eventsUtils.on(window, evt, this[handler]);
    }
  },

  componentWillUnmount: function(){
    var listeners = this.windowListeners, 
      handler;

    for(var evt in listeners){
      handler = listeners[evt];
      eventsUtils.off(window, evt, this[handler]);
    }
  }
}