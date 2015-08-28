var React = require('react');
var Components = require('react-ui-components');
var IconButton = Components.IconButton;

var model = require('../model/index');


module.exports = React.createClass({
  
  render: function(){
    var icons = model.icons,
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
      <div className="demo-middle">
      {btnEles}
      </div>
    );
  }
});

