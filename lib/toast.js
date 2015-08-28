'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    msg: React.PropTypes.string,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string //'info', 'success', 'warning', 'error'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      msg: '',
      timeout: 3000,
      type: 'info'
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      {
        id: 'toast-wrap',
        className: "toast fadein " + this.props.type },
      this.props.msg
    );
  },

  componentDidMount: function componentDidMount() {
    this._setTimeout();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._setTimeout();
  },

  _timeoutId: null,

  _setTimeout: function _setTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout((function () {
      React.unmountComponentAtNode(React.findDOMNode(this).parentNode);
    }).bind(this), this.props.timeout);
  }
});