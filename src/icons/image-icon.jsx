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

  getInitialState: function(){
    return {
      loaded: null
    };
  },

  componentDidMount: function(){
    var self = this,
      img,
      src = this.props.realImg;
    if(src){
      img = document.createElement('img');
      eventsUtils.on(img, 'load', function() {
        self.setState({
          loaded: 'success'
        });
      });

      eventsUtils.on(img, 'error', function(){
        self.setState({
          loaded: 'failed'
        });
      });

      img.setAttribute("src", src);
    }
  },

  render: function(){
    var props = this.props,
      imgWrapStyle = {},
      imgStyle = {};

    if(this.state.loaded == 'success'){
      imgWrapStyle = {
        backgroundImage: 'url('+props.realImg+')'
      };
      imgStyle = {
        visibility: 'hidden'
      };
    }else if(this.state.loaded == 'failed'){
      imgStyle = {
        visibility: 'visible'
      };
    }

    return (
      <div 
          className={"img-wrap "+props.customClass}
          style={imgWrapStyle} >
        <img
          ref="image"
          data-real={props.realImg}
          src={props.defaultImg}
          style={imgStyle} />
      </div>
    );
  }

});


