var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var model = require('./model/index');
var Sidebar = require('./app/sidebar.jsx');
var Buttons = require('./app/buttons.jsx');
var Dialog = require('./app/dialog.jsx');
var IconButtons = require('./app/icon-button.jsx');
var DropdownMenu = require('./app/dropdown-menu.jsx');
var Toast = require('./app/toast.jsx');


injectTapEventPlugin();

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Sidebar sidebarData={model.sidebarData}></Sidebar>

        <div className="main-content">
          <RouteHandler />
        </div>
      </div>
    );
  }
});


var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="buttons" path="/buttons" handler={Buttons} />
    <Route name="dialog" path="/dialog" handler={Dialog} />
    <Route name="icon-button" path="/icon-button" handler={IconButtons} />
    <Route name="dropdown-menu" path="/dropdown-menu" handler={DropdownMenu} />
    <Route name="toast" path="/toast" handler={Toast} />
    <DefaultRoute handler={Buttons}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById('main'))
});




