var React    = require('react');
var MenuItem = require('./menu-item');

module.exports = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    selectedVal: React.PropTypes.string,
    onItemTap: React.PropTypes.func,
    itemTpl: React.PropTypes.func
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