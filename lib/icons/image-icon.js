'use strict';

var React = require('react');
var eventsUtils = require('../utils/events');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    defaultImg: React.PropTypes.string,
    realImg: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClass: '',
      defaultImg: '',
      realImg: ''
    };
  },

  getInitialState: function getInitialState() {
    return {
      loaded: null
    };
  },

  componentDidMount: function componentDidMount() {
    var self = this,
        img,
        src = this.props.realImg;
    if (src) {
      img = document.createElement('img');
      eventsUtils.on(img, 'load', function () {
        self.setState({
          loaded: 'success'
        });
      });

      eventsUtils.on(img, 'error', function () {
        self.setState({
          loaded: 'failed'
        });
      });

      img.setAttribute("src", src);
    }
  },

  render: function render() {
    var props = this.props,
        imgWrapStyle = {},
        imgStyle = {};

    if (this.state.loaded == 'success') {
      imgWrapStyle = {
        backgroundImage: 'url(' + src + ')  !important'
      };
      imgStyle = {
        visibility: 'hidden'
      };
    } else if (this.state.loaded == 'failed') {
      imgStyle = {
        visibility: 'visible'
      };
    }

    return React.createElement(
      'div',
      {
        className: "img-wrap " + props.customClass,
        style: imgWrapStyle },
      React.createElement('img', {
        ref: 'image',
        'data-real': props.realImg,
        src: props.defaultImg,
        style: imgStyle })
    );
  }

});