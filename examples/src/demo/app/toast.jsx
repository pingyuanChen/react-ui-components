var React = require('react');
var Components = require('react-ui-components');
var Toast = Components.Toast;
var SimpleButton = Components.SimpleButton;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="demo-toast demo-middle">
        <SimpleButton 
          customClass="submit-btn"
          label="Default Toast"
          onTap={this._onTap} >
        </SimpleButton>

        <SimpleButton 
          customClass="submit-btn"
          label="Success Toast"
          onTap={this._onTap} >
        </SimpleButton>

        <SimpleButton 
          customClass="submit-btn"
          label="Warning Toast"
          onTap={this._onTap} >
        </SimpleButton>

        <SimpleButton 
          customClass="submit-btn"
          label="Error Toast"
          onTap={this._onTap} >
        </SimpleButton>
        <div id="demo-toast-wrap"></div>
      </div>
    );
  },

  _onTap: function(e){
    switch(e.target.innerHTML){
      case 'Default Toast':
        React.render(<Toast msg="Nullam id dolor id nibh ultricies vehicula ut id elit." />, document.getElementById('demo-toast-wrap'));
        break;
      case 'Success Toast':
        React.render(<Toast type="success" msg="Duis mollis, est non commodo luctus, nisi erat porttitor ligula." />, document.getElementById('demo-toast-wrap'));
        break;
      case 'Warning Toast':
        React.render(<Toast type="warning" msg="Maecenas sed diam eget risus varius blandit sit amet non magna." />, document.getElementById('demo-toast-wrap'));
        break;
      case 'Error Toast':
        React.render(<Toast type="error" msg="Etiam porta sem malesuada magna mollis euismod." />, document.getElementById('demo-toast-wrap'));
        break;
    }
  }
});