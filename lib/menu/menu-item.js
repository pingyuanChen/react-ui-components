'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    index: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool,
    data: React.PropTypes.object,
    onTap: React.PropTypes.func,
    itemTpl: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      itemTpl: function itemTpl(index, data, selected, displayKey, valKey) {
        var displayText = data[displayKey],
            displayVal = data[valKey];
        return React.createElement(
          'div',
          { 'data-val': displayVal },
          displayText
        );
      }
    };
  },

  render: function render() {
    var props = this.props,
        itemClassName = 'menu-item';
    if (props.selected) {
      itemClassName += ' menu-item-selected';
    }
    return React.createElement(
      'div',
      {
        className: itemClassName,
        onTouchTap: this._onTap },
      props.itemTpl(props.index, props.data, props.selected, props.displayKey, props.valKey)
    );
  },

  _onTap: function _onTap(e) {
    var props = this.props;
    if (props.onTap) {
      props.onTap(e, props.index, props.data);
    }
  }

});