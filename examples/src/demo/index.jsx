var React                = require('react');
var ReactDOM             = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var ReactRouter          = require('react-router');
var Router               = ReactRouter.Router;
var Route                = ReactRouter.Route;
var IndexRoute           = ReactRouter.IndexRoute;

var model                = require('./model/index');
var Sidebar              = require('./app/sidebar.jsx');
var Buttons              = require('./app/buttons.jsx');
var Dialog               = require('./app/dialog.jsx');
var IconButtons          = require('./app/icon-button.jsx');
var DropdownMenu         = require('./app/dropdown-menu.jsx');
var Toast                = require('./app/toast.jsx');
var Tab                  = require('./app/tab.jsx');
var Search               = require('./app/search-list.jsx');


injectTapEventPlugin();

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Sidebar sidebarData={model.sidebarData}></Sidebar>

        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
});


var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Buttons} />
    <Route path="buttons" component={Buttons} />
    <Route path="dialog" component={Dialog} />
    <Route path="icon-button" component={IconButtons} />
    <Route path="dropdown-menu" component={DropdownMenu} />
    <Route path="toast" component={Toast} />
    <Route path="tab" component={Tab} />
    <Route path="search" component={Search} />
  </Route>
);

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('main'))




