var React = require('react');
var Components = require('react-ui-components');
var SimpleButton = Components.SimpleButton;
var LinkButton = Components.LinkButton;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="btn-demo demo-middle">
        <SimpleButton 
          customClass="default-btn"
          label="A button element" >
        </SimpleButton>

        <SimpleButton 
          customClass="submit-btn"
          label="A submit element"
          onTap={this._onTap} >
        </SimpleButton>

        <LinkButton 
          customClass="anchor-btn"
          label="A anchor"
          href="http://www.baidu.com/" >
        </LinkButton>

        <SimpleButton 
          customClass="upload-btn"
          label="Upload Image" >
          <input type="file"></input>
        </SimpleButton>

        <LinkButton 
          customClass="icon-button"
          label="Github"
          href="http://github.com/" >
          <i className="github-icon fa fa-github"></i>
        </LinkButton>

        <SimpleButton 
          customClass="disable-btn"
          label="Primary Button"
          disabled={true} >
        </SimpleButton>
      </div>
    );
  },

  _onTap: function(){
    alert('Clicked...')
  }
});
