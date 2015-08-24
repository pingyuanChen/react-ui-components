module.exports = {
  on: function(el, eventType, func){
    if(window.addEventListener){
      el.addEventListener(eventType, func, false);
    }else{
      el.attachEvent('on' + eventType, func);
    }
  },

  off: function(el, eventType, func){
    if(window.removeEventListener){
      el.removeEventListener(eventType, func, false);
    }else{
      el.detachEvent('on' + eventType, func);
    }
  }
};