var React                = require('react');
var ReactDOM             = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Components           = require('react-ui-components');
var IconButton           = Components.IconButton;

injectTapEventPlugin();

var icons = [
  {
    tooltip: '全部已读',
    iconBtnClass: 'fa fa-check'
  },
  {
    tooltip: '消息设置',
    iconBtnClass: 'fa fa-cog'
  },
  {
    tooltip: '关机',
    iconBtnClass: 'fa fa-power-off'
  },
  {
    tooltip: '删除',
    iconBtnClass: 'fa fa-remove'
  },
  {
    tooltip: '分享',
    iconBtnClass: 'fa fa-share'
  },
  {
    tooltip: '编辑',
    iconBtnClass: 'fa fa-pencil'
  },
  {
    tooltip: '条形图',
    iconBtnClass: 'fa fa-bar-chart'
  },
  {
    tooltip: '两端对齐',
    iconBtnClass: 'fa fa-align-justify'
  }
];


var Main = React.createClass({
  
  render: function(){
    var icons = this.props.icons,
      btnEles = [], btnEle;

    for(var i=0,l=icons.length; i<l; i++){
      btnEle = (
        <IconButton
          key={i}
          tooltip={icons[i].tooltip}
          iconBtnClass={icons[i].iconBtnClass} >
        </IconButton>
      );
      btnEles.push(btnEle);
    }

    return (
      <div>
      {btnEles}
      </div>
    );
  }
});


ReactDOM.render(
  <Main icons={icons}></Main>,
  document.getElementById('main')
);
