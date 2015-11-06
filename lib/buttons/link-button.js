'use strict';

var React = require('react');
var SimpleButton = require('./simple-button');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    newTab: React.PropTypes.bool,
    label: React.PropTypes.string,
    btnTpl: React.PropTypes.func,
    href: React.PropTypes.string.isRequired,
    onTap: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClass: '',
      newTab: false
    };
  },

  render: function render() {
    var props = this.props,
        btnChilden;
    if (props.btnTpl) {
      btnChilden = props.btnTpl(props.label);
    } else {
      btnChilden = React.createElement(
        'div',
        { className: 'btn-inner' },
        props.label && React.createElement(
          'span',
          { ref: 'btnLabel', className: 'btn-label' },
          props.label
        ),
        props.children
      );
    }
    return React.createElement(
      SimpleButton,
      {
        customClass: props.customClass,
        disabled: props.disabled,
        onTap: props.onTap },
      React.createElement(
        'a',
        { className: 'link-btn', href: props.href, target: props.newTab ? '_blank' : '_self' },
        btnChilden
      )
    );
  }

});