'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    btnTpl: React.PropTypes.func,
    onTap: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClass: ''
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
      'button',
      {
        className: "btn " + props.customClass,
        disabled: props.disabled,
        onTouchTap: this._onTap },
      btnChilden
    );
  },

  _onTap: function _onTap(e) {
    var props = this.props;
    if (!props.disabled && props.onTap) props.onTap(e);
  }
});