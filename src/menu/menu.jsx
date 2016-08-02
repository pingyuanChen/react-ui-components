var React       = require('react');
var MenuItem    = require('./menu-item');
var MenuDivider = require('./menu-divider');

module.exports = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    selectedVal: React.PropTypes.string,
    onItemTap: React.PropTypes.func,
    itemTpl: React.PropTypes.func,
    isScroll: React.PropTypes.bool
  },

  getDefaultProps: function(){},

  getInitialState: function(){
    return {   
      selectedIndex: this.props.selectedIndex || this._getSelectedIndexByVal()
    };
  },

  componentDidMount: function(){
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props.selectedIndex);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps.selectedIndex);
    }
  },

  render: function(){
    return (
      <div className="menu-wrap">
        {this._renderChilden()}
      </div>
    );
  },

  _renderChilden: function(){
    var menuItems = [],
      props = this.props,
      menuItem, menuItemEle;

    for(var i=0,l=props.menuItems.length; i<l; i++){
      menuItem = props.menuItems[i];
      if(menuItem.type === 'divider') {
        menuItemEle = <MenuDivider />;
      } else {
        menuItemEle = (
          <MenuItem
            selected={this.state.selectedIndex === i}
            key={i}
            index={i}
            data={menuItem}
            itemTpl={props.itemTpl}
            displayKey={props.displayKey}
            valKey={props.valKey}
            onTap={this._onItemTap} >
          </MenuItem>
        );
      }
      menuItems.push(menuItemEle);
    }
    if(props.isScroll){
      return (
        <div className="menu-scroller-wrap">
          {menuItems}
        </div>
      );
    }
    return menuItems;
  },

  _onItemTap: function(e, index, data){
    this.setState({
      selectedIndex: index
    });
    this.props.onItemTap && this.props.onItemTap(e, index, data)
  },

  _getSelectedIndexByVal: function(){
    var props = this.props;
    if(props.selectedVal){
      for(var i=0,l=props.menuItems.length; i<l; i++){
        if(props.menuItems[i][props.valKey] == props.selectedVal){
          return i;
        }
      }
    }
    return 0;
  },

  _setSelectedIndex: function(selectedIndex){
    this.setState({
      selectedIndex: selectedIndex
    });
  }



});