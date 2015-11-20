'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onSearch: React.PropTypes.func,
    throttle: React.PropTypes.number,
    isFocus: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      customClass: '',
      placeholder: 'search...',
      throttle: 200,
      isFocus: true
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.isFocus) this._setFocus();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.isFocus) this._setFocus();
  },

  render: function render() {
    var props = this.props;

    return React.createElement(
      'div',
      { className: "search-wrap " + props.customClass },
      React.createElement(
        'form',
        {
          className: 'search-form',
          onSubmit: this._onSubmit },
        React.createElement('input', {
          ref: 'searchInput',
          type: 'text',
          autocomplete: 'off',
          className: 'search-input',
          placeholder: props.placeholder,
          onKeyDown: this._onKeyDown })
      )
    );
  },

  _timeoutId: null,

  _onKeyDown: function _onKeyDown(e) {
    if (this._timeoutId) clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout((function () {
      this._goSearch(e);
    }).bind(this), this.props.throttle);
  },

  _onSubmit: function _onSubmit(e) {
    this._goSearch(e);
    e.preventDefault();
    return false;
  },

  _goSearch: function _goSearch(e) {
    var inputEle, keyword;
    inputEle = ReactDOM.findDOMNode(this.refs.searchInput);
    keyword = inputEle.value;
    if (this.props.onSearch) {
      this.props.onSearch(keyword, e);
    }
  },

  _setFocus: function _setFocus() {
    var inputEle;
    inputEle = ReactDOM.findDOMNode(this.refs.searchInput);
    inputEle.focus();
  }

});