var React = require('react');
var Components = require('react-ui-components');
var DropdownMenu = Components.DropdownMenu;

var model = require('../model/index');


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
      <span className="menu-item-text">{displayText}</span>
      <span className="menu-item-selected-icon"><i className="fa fa-caret-down"></i></span>
    </div>
  );
}, onMenuChange = function(e, index, data){
  // alert('click '+index+' item');
}, colorItemTpl = function(index, data, selected, displayKey, valKey){
  var displayText = data[displayKey],
    style = {
      background: displayText
    };
  return (
    <div data-val={displayText} className="color-menu-item" style={style}></div>
  );
}, colorSelectedTpl = function(index, data, displayKey, valKey){
  var displayText = data[displayKey],
    style = {
      background: displayText
    };
  return (
    <div data-val={displayText}>
      <span className="menu-item-text color-menu-selected">
        <i className="fa fa-font"></i>
        <span className="color-underline" style={style}></span>
      </span>
      <span className="menu-item-selected-icon"><i className="fa fa-caret-down"></i></span>
    </div>
  );
};


module.exports = React.createClass({
  render: function(){
    var menuItems = model.menuItems;
    return (
      <div className="demo-middle">
        <DropdownMenu
          menuItems={menuItems.font}
          displayKey="display"
          valKey="font-size"
          autoWidth="true"
          wrapClassName="dropdown-menu-font"
          selectedIndex={1}
          itemTpl={itemTpl}
          selectedTpl={selectedTpl}
          onMenuChange={onMenuChange} />
        <DropdownMenu
          menuItems={menuItems['font-size']}
          displayKey="display"
          valKey="display"
          autoWidth="true"
          wrapClassName="dropdown-menu-font-size"
          itemTpl={itemTpl}
          selectedTpl={selectedTpl}
          onMenuChange={onMenuChange} />
        <DropdownMenu
          menuItems={menuItems.color}
          displayKey="display"
          valKey="display"
          wrapClassName="dropdown-menu-color"
          itemTpl={colorItemTpl}
          selectedTpl={colorSelectedTpl}
          onMenuChange={onMenuChange} />
        <DropdownMenu
          menuItems={menuItems.align}
          displayKey="display"
          valKey="val"
          wrapClassName="dropdown-menu-align"
          itemTpl={itemTpl}
          selectedTpl={selectedTpl}
          onMenuChange={onMenuChange} />
      </div>
    );
  }
});


