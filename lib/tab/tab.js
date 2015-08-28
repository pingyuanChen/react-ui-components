'use strict';

var React = require('react');

var TabHeadItem = require('./tab-head-item');
var TabContentItem = require('./tab-content-item');

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    customClass: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    tabWillChange: React.PropTypes.func,
    tabDidChange: React.PropTypes.func,
    onTapContent: React.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      selectedIndex: this.props.selectedIndex || 0
    };
  },

  render: function render() {
    var props = this.props,
        tabHeads = [],
        tabContents = [],
        tempHead,
        tempContent,
        width = 100 / this.getTabCount() + '%';

    React.Children.forEach(props.children, (function (item, index) {
      if (item.type.displayName == 'TabItem') {
        tempHead = React.createElement(TabHeadItem, {
          key: index,
          index: index,
          title: item.props.title,
          selected: this.state.selectedIndex === index,
          width: width,
          headTpl: props.headTpl,
          onTap: this._onHeadTap });
        tempContent = React.createElement(
          TabContentItem,
          {
            key: index,
            index: index,
            selected: this.state.selectedIndex === index,
            onTapContent: this._onTapContent },
          item.props.children
        );
        tabHeads.push(tempHead);
        tabContents.push(tempContent);
      } else {
        console.error('The tab item tag name must be TagItem');
      }
    }).bind(this));

    return React.createElement(
      'div',
      { className: "tab-wrap " + (props.customClass || "") },
      React.createElement(
        'div',
        { className: 'tab-head-wrap' },
        tabHeads
      ),
      React.createElement(
        'div',
        { className: 'tab-content-wrap' },
        tabContents
      )
    );
  },

  getTabCount: function getTabCount() {
    return React.Children.count(this.props.children);
  },

  _onHeadTap: function _onHeadTap(index, title, e) {
    var props = this.props;
    if (props.tabWillChange) props.tabWillChange(this.state.selectedIndex, index, e);
    this.setState({ selectedIndex: index });
    if (props.tabDidChange) props.tabDidChange(index, title, e);
  },

  _onTapContent: function _onTapContent(index, activeTabContent, e) {
    if (this.props.onTapContent) this.props.onTapContent(index, activeTabContent, e);
  }

});