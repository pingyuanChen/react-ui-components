var React = require('react');
var SimpleButton = require('./simple-button');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    btnTpl: React.PropTypes.func,
    href: React.PropTypes.string.isRequired,
    onTap: React.PropTypes.func
  },

  getDefaultProps: function(){
    return {
      customClass: ''
    };
  },

  render: function(){
    var props = this.props,
      btnChilden;
    if (props.btnTpl){
      btnChilden = props.btnTpl(props.label);
    }else{
      btnChilden = (
        <div className="btn-inner">
          {props.label && <span ref="btnLabel" className="btn-label">{props.label}</span>}
          {props.children}
        </div>
      );
    }
    return (
      <SimpleButton
        customClass={props.customClass}
        disabled={props.disabled}
        onTap={props.onTap} >
        <a className="link-btn" href={props.href}>
          {btnChilden}
        </a>
      </SimpleButton>
    );
  }

});