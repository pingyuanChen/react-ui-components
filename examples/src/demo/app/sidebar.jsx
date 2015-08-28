var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Components = require('react-ui-components');
var Menu = Components.Menu;



module.exports = React.createClass({
  propTypes: {
    sidebarData: React.PropTypes.array.isRequired
  },

  render: function(){
    return (
      <div className="sidebar-menu demo-middle">
        <Menu
          menuItems={this.props.sidebarData}
          displayKey="display"
          valKey="link"
          itemTpl={this._itemTpl} >
        </Menu>
      </div>
    );
  },

  _itemTpl: function(index, data, selected, displayKey, valKey){
    var displayText = data[displayKey],
      displayVal = data[valKey];
    return (
      <div data-val={displayVal} className={selected ? 'selected' : ''}>
        <span className="menu-item-text">
          <Link className="menu-item-link" to={displayVal}>{displayText}</Link>
        </span>
      </div>
    );
  }
});