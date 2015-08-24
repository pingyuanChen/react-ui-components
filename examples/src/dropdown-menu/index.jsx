var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Components = require('react-ui-components');
var DropdownMenu = Components.DropdownMenu;

injectTapEventPlugin();

var menuItems = [
  {
    'display': '普通',
    'font-size': '11'
  },
  {
    'display': '小标题',
    'font-size': '7'
  },
  {
    'display': '中标题',
    'font-size': '14'
  },
  {
    'display': '大标题',
    'font-size': '16'
  }
];

var itemTpl = function(index, data, selected, displayKey, valKey){
  var displayText = data[displayKey],
    displayVal = data[valKey];
  return (
    <div data-val={displayVal}>
      <span className="menu-item-icon"></span>
      <span className="menu-item-text">{displayText}</span>
    </div>
  );
}, selectedTpl = function(index, data, displayKey, valKey){
  var displayText = data[displayKey],
    displayVal = data[valKey];
  return (
    <div data-val={displayVal}>
      <span className="menu-item-selected-icon"></span>
      <span className="menu-item-text">{displayText}</span>
    </div>
  );
}, onMenuChange = function(e, index, data){
  alert('click '+index+' item');
};


var Main = React.createClass({
  render: function(){
    return (
      <div>
        <DropdownMenu
          menuItems={menuItems}
          displayKey="display"
          valKey="font-size"
          autoWidth="true"
          wrapClassName="dropdown-menu-demo"
          itemTpl={itemTpl}
          selectedTpl={selectedTpl}
          onMenuChange={onMenuChange} />
        <DropdownMenu
          menuItems={menuItems}
          displayKey="display"
          valKey="font-size"
          wrapClassName="dropdown-menu-demo"
          itemTpl={itemTpl}
          selectedTpl={selectedTpl}
          onMenuChange={onMenuChange} />
      </div>
    );
  }
});


React.render(
  <Main />,
  document.getElementById('main')
);
