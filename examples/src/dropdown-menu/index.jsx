var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Components = require('react-ui-components');
var DropdownMenu = Components.DropdownMenu;

injectTapEventPlugin();

var menuItems = {
  'font': [
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
  ],
  'font-size': [
    {
      'display': 9
    },
    {
      'display': 10
    },
    {
      'display': 11
    },
    {
      'display': 12
    },
    {
      'display': 14
    },
    {
      'display': 18
    },
    {
      'display': 24
    },
    {
      'display': 30
    },
    {
      'display': 36
    }
  ],
  'color': [
    {
      'display': '#f48287'
    },
    {
      'display': '#f1ca18'
    },
    {
      'display': '#a6c568'
    },
    {
      'display': '#6699cc'
    },
    {
      'display': '#a47ed2'
    },
    {
      'display': '#888888'
    },
    {
      'display': '#d0060e'
    },
    {
      'display': '#da650a'
    },
    {
      'display': '#17844c'
    },
    {
      'display': '#0b24fb'
    },
    {
      'display': '#670d7e'
    },
    {
      'display': '#333333'
    }
  ],
  'align': [
    {
      'display': '左对齐',
      'val': 'left'
    },
    {
      'display': '居中对齐',
      'val': 'center'
    },
    {
      'display': '右对齐',
      'val': 'right'
    },
    {
      'display': '两端对齐',
      'val': 'justify'
    }
  ]
};

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


var Main = React.createClass({
  render: function(){
    return (
      <div>
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


React.render(
  <Main />,
  document.getElementById('main')
);
