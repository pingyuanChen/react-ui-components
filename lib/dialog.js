'use strict';

var React = require('react');
var WindowListener = require('./mixins/window-listener');
var SimpleButton = require('./simple-button');
var Mask = require('./mask');

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [WindowListener],

  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    headTpl: React.PropTypes.func,
    bodyTpl: React.PropTypes.func,
    footTpl: React.PropTypes.func,
    hasMask: React.PropTypes.bool,
    hasActions: React.PropTypes.bool, //whether has actions in footer
    actions: React.PropTypes.array,
    onShow: React.PropTypes.func,
    onClose: React.PropTypes.func,
    open: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      hasMask: true,
      hasActions: true,
      actions: [{
        customClass: 'dialog-submit',
        onTap: this._onSubmit,
        label: "submit"
      }, {
        customClass: 'dialog-cancel',
        onTap: this.close,
        label: "cancel"
      }]
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.open || false
    };
  },

  windowListeners: {
    resize: '_onResize'
  },

  componentDidMount: function componentDidMount() {
    setTimeout((function () {
      this._onResize();
    }).bind(this), 300);

    if (this.props.open) {
      this._onShow();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    this._onResize();
  },

  render: function render() {
    var props = this.props,
        actions = props.actions,
        actionEles = [],
        actionEle,
        item,
        dialogWrapStyle = {};

    if (props.hasActions) {
      for (var i = 0, l = actions.length; i < l; i++) {
        item = actions[i];
        actionEle = React.createElement(SimpleButton, {
          key: i,
          customClass: item.customClass || '',
          disabled: item.disabled || false,
          onTap: item.onTap || this.close,
          label: item.label });
        actionEles.push(actionEle);
      }
    }
    if (this.state.open) {
      dialogWrapStyle = {
        width: '100%',
        height: '100%'
      };
    }

    return React.createElement(
      'div',
      { className: 'dialog-wrap', style: dialogWrapStyle },
      this.state.open && React.createElement(
        'div',
        { ref: 'dialog', className: 'dialog' },
        React.createElement(
          'div',
          { className: 'dialog-head' },
          props.headTpl ? props.headTpl(props.title) : props.title
        ),
        React.createElement(
          'div',
          { className: 'dialog-body' },
          props.bodyTpl ? props.bodyTpl(props.body) : props.body
        ),
        React.createElement(
          'div',
          { className: 'dialog-foot' },
          actionEles
        )
      ),
      this.state.open && this.props.hasMask && React.createElement(Mask, {
        autoLockScroll: true,
        isShow: true,
        onTap: this._handleMaskTap })
    );
  },

  show: function show() {
    this.setState({ open: true }, this.props._onShow);
  },

  close: function close() {
    this.setState({ open: false }, this.props._onClose);
  },

  _onShow: function _onShow() {
    this.props.onShow && this.props.onShow();
  },

  _onClose: function _onClose() {
    this.props.onClose && this.props.onClose();
  },

  _onSubmit: function _onSubmit() {
    this.setState({ open: false });
    this.props.onClose(true);
  },

  _onResize: function _onResize() {
    if (this.state.open) {
      var dialogWin = this.refs.dialog.getDOMNode(),
          dialogWinWidth = dialogWin.offsetWidth,
          dialogWinHeight = dialogWin.offsetHeight;
      dialogWin.style.marginLeft = -dialogWinWidth / 2 + 'px';
      dialogWin.style.marginTop = -dialogWinHeight / 2 + 'px';
    }
  },

  _handleMaskTap: function _handleMaskTap(e) {
    this.close();
  }
});