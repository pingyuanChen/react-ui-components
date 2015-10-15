'use strict';

var React = require('react');
var Menu = require('./menu');
var DelegateClick = require('../mixins/delegate-click');

module.exports = React.createClass({
  displayName: 'exports',

  mixins: [DelegateClick],

  propTypes: {
    menuItems: React.PropTypes.array.isRequired, //an array for rendering dropdown menu items
    wrapClassName: React.PropTypes.string,
    itemTpl: React.PropTypes.func, //custom template for each menu items
    selectedTpl: React.PropTypes.func, //custom template for selected item showing
    selectedIndex: React.PropTypes.number,
    onMenuChange: React.PropTypes.func,
    forceTap: React.PropTypes.bool //force trigger onMenuChange unconditional
  },

  getDefaultProps: function getDefaultProps() {
    return {
      hasMask: false,
      autoWidth: false,
      displayKey: 'text', //the value of displayKey for displaying
      valKey: 'value', //the value of valKey may be for being sended to sever
      itemTpl: function itemTpl(index, data, displayKey, valKey) {
        var displayText = data[displayKey],
            displayVal = data[valKey];
        return React.createElement(
          'div',
          { 'data-val': displayVal },
          displayText
        );
      },
      selectedTpl: function selectedTpl(index, data, displayKey, valKey) {
        var displayText = data[displayKey];
        return React.createElement(
          'div',
          null,
          data[displayText]
        );
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: false,
      selectedIndex: this.props.selectedIndex || 0
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props.selectedIndex);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.autoWidth) this._setWidth();

    if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps.selectedIndex);
    }
  },

  render: function render() {
    var props = this.props,
        showClassName = this.state.open ? "" : "unactive",
        wrapClassName = props.wrapClassName + ' d-menu-wrap ' + showClassName;

    return React.createElement(
      'div',
      { className: wrapClassName },
      React.createElement(
        'div',
        { className: 'd-menu-display-wrap', onTouchTap: this._onToggleMenu },
        props.selectedTpl(this.state.selectedIndex, props.menuItems[this.state.selectedIndex], props.displayKey, props.valKey)
      ),
      React.createElement(Menu, {
        ref: 'menuWrap',
        menuItems: props.menuItems,
        displayKey: props.displayKey,
        valKey: props.valKey,
        selectedIndex: this.state.selectedIndex,
        itemTpl: props.itemTpl,
        onItemTap: this._onItemTap }),
      this.state.open && props.hasMask && React.createElement('div', { className: 'd-menu-mask', onTouchTap: this._onMenuMaskTap })
    );
  },

  componentClick: function componentClick() {
    this.close();
  },

  close: function close() {
    if (this.state.open) {
      this.setState({
        open: false
      });
    }
  },

  _onToggleMenu: function _onToggleMenu() {
    this.setState({
      open: !this.state.open
    });
  },

  _onItemTap: function _onItemTap(e, index, data) {
    var props = this.props;
    if (props.onMenuChange) {
      if (this.state.selectedIndex !== index || props.forceTap) {
        props.onMenuChange(e, index, data);
      }
    }

    this.setState({
      selectedIndex: index,
      open: false
    });
  },

  _onMenuMaskTap: function _onMenuMaskTap() {
    this.setState({
      open: false
    });
  },

  _setWidth: function _setWidth() {
    var dMenuEle = React.findDOMNode(this),
        menuWrap = React.findDOMNode(this.refs.menuWrap);
    dMenuEle.style.width = menuWrap.offsetWidth + 'px';
  },

  _setSelectedIndex: function _setSelectedIndex(selectedIndex) {
    this.setState({
      selectedIndex: selectedIndex
    });
  }
});