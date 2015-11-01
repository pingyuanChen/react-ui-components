'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    defaultImg: React.PropTypes.string,
    realImg: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultImg: '',
      realImg: ''
    };
  },

  componentDidMount: function componentDidMount() {
    var img,
        self = React.findDOMNode(this),
        src = this.props.realImg;
    if (src) {
      img = document.createElement('img');
      $(img).bind("load", function () {
        self.parent().css('backgroundImage', 'url(' + src + ')  !important');
        self.css('visibility', 'hidden');
      }).bind('error', function () {
        self.css('visibility', 'visible');
      }).attr("src", src);
    }
  },

  render: function render() {
    var props = this.props;

    return React.createElement(
      'div',
      { className: "img-wrap " + props.customClass },
      React.createElement('img', {
        'data-real': props.realImg,
        src: props.defaultImg })
    );
  }

});