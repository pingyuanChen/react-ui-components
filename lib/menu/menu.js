'use strict';

var React = require('react');
var MenuItem = require('./menu-item');
var MenuDivider = require('./menu-divider');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    selectedVal: React.PropTypes.string,
    onItemTap: React.PropTypes.func,
    itemTpl: React.PropTypes.func,
    isScroll: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {},

  getInitialState: function getInitialState() {
    return {
      selectedIndex: this.props.selectedIndex || this._getSelectedIndexByVal()
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props.selectedIndex);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps.selectedIndex);
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'menu-wrap' },
      this._renderChilden()
    );
  },

  _renderChilden: function _renderChilden() {
    var menuItems = [],
        props = this.props,
        menuItem,
        menuItemEle;

    for (var i = 0, l = props.menuItems.length; i < l; i++) {
      menuItem = props.menuItems[i];
      if (menuItem.type === 'divider') {
        menuItemEle = React.createElement(MenuDivider, null);
      } else {
        menuItemEle = React.createElement(MenuItem, {
          selected: this.state.selectedIndex === i,
          key: i,
          index: i,
          data: menuItem,
          itemTpl: props.itemTpl,
          displayKey: props.displayKey,
          valKey: props.valKey,
          onTap: this._onItemTap });
      }
      menuItems.push(menuItemEle);
    }
    if (props.isScroll) {
      return React.createElement(
        'div',
        { className: 'menu-scroller-wrap' },
        menuItems
      );
    }
    return menuItems;
  },

  _onItemTap: function _onItemTap(e, index, data) {
    this.setState({
      selectedIndex: index
    });
    this.props.onItemTap && this.props.onItemTap(e, index, data);
  },

  _getSelectedIndexByVal: function _getSelectedIndexByVal() {
    var props = this.props;
    if (props.selectedVal) {
      for (var i = 0, l = props.menuItems.length; i < l; i++) {
        if (props.menuItems[i][props.valKey] == props.selectedVal) {
          return i;
        }
      }
    }
    return 0;
  },

  _setSelectedIndex: function _setSelectedIndex(selectedIndex) {
    this.setState({
      selectedIndex: selectedIndex
    });
  }

});