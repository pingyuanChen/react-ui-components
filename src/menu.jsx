var React = require('react');
var MenuItem = require('./menu-item');

module.exports = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    onItemTap: React.PropTypes.func,
    itemTpl: React.PropTypes.func
  },

  getDefaultProps: function(){},

  getInitialState: function(){
    return {   
      selectedIndex: this.props.selectedIndex || 0
    };
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
      menuItem;

    for(var i=0,l=props.menuItems.length; i<l; i++){
      menuItem = (
        <MenuItem
          selected={this.state.selectedIndex === i}
          key={i}
          index={i}
          data={props.menuItems[i]}
          itemTpl={props.itemTpl}
          displayKey={props.displayKey}
          valKey={props.valKey}
          onTap={this._onItemTap} >
        </MenuItem>
      );
      menuItems.push(menuItem);
    }
    return menuItems;
  },

  _onItemTap: function(e, index, data){
    this.setState({
      selectedIndex: index
    });
    this.props.onItemTap && this.props.onItemTap(e, index, data)
  }

});