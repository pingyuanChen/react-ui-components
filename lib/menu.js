'use strict';

var React = require('react');
var MenuItem = require('./menu-item');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    onItemTap: React.PropTypes.func,
    itemTpl: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {},

  getInitialState: function getInitialState() {
    return {
      selectedIndex: this.props.selectedIndex || 0
    };
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
        menuItem;

    for (var i = 0, l = props.menuItems.length; i < l; i++) {
      menuItem = React.createElement(MenuItem, {
        selected: this.state.selectedIndex === i,
        key: i,
        index: i,
        data: props.menuItems[i],
        itemTpl: props.itemTpl,
        displayKey: props.displayKey,
        valKey: props.valKey,
        onTap: this._onItemTap });
      menuItems.push(menuItem);
    }
    return menuItems;
  },

  _onItemTap: function _onItemTap(e, index, data) {
    this.setState({
      selectedIndex: index
    });
    this.props.onItemTap && this.props.onItemTap(e, index, data);
  }

});