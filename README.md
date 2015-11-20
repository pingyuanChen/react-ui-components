# react-ui-components
React Components Library

## Install
To install the latest release:
```shell
npm install react-ui-components
```
After npm install, you'll find all the source code in the src/ folder and their compiled results in the /lib folder. And some basic styles of components in scss/ folder.

## Usage
Once react-ui-components is installed in your project, you can use like this:
```
/** MyFirstReactComponent.jsx */

var React = require('react');
var Components = require('react-ui-components');
var SimpleButton = Components.SimpleButton;
var LinkButton = Components.LinkButton;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="btn-demo">
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
      </div>
    );
  },

  _onTap: function(e){
    alert('Clicked...')
  }
});

/** app.jsx */
var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Buttons = require('./MyFirstReactComponent.jsx');

React.render(<Buttons />, document.getElementById('main'))
```

## Examples
To help you get started, you can find complete example in /examples folder or visit [the website](http://1.reactuicomponents.sinaapp.com/#/)

![Demo](https://github.com/pingyuanChen/react-ui-components/blob/master/demo.png)

## FAQ

