var React = require('react');
var eventsUtils = require('../utils/events');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    defaultImg: React.PropTypes.string,
    realImg: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      customClass: '',
      defaultImg: '',
      realImg: ''
    };
  },

  componentDidMount: function(){
    var img,
      self = React.findDOMNode(this),
      src = this.props.realImg;
    if(src){
      img = document.createElement('img');
      eventsUtils.on(img, 'load', function() {
        self.style.backgroundImage = 'url('+src+')  !important';
        this.style.visibility = 'hidden';
      });

      eventsUtils.on(img, 'error', function(){
        this.style.visibility = 'visible';
      });

      img.setAttribute("src", src);
    }
  },

  render: function(){
    var props = this.props;

    return (
      <div className={"img-wrap "+props.customClass} >
        <img 
          data-real={props.realImg}
          src={props.defaultImg} />
      </div>
    );
  }

});


