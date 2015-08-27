var React = require('react');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    btnTpl: React.PropTypes.func,
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
          {props.label && <span ref="btnLabel" className="btn-label">{props.label}</span> }
          {props.children}
        </div>
      );
    }
    return (
      <button
        className={"btn "+props.customClass}
        disabled={props.disabled}
        onTouchTap={this._onTap} >
        {btnChilden}
      </button>
    );
  },

  _onTap: function(e){
    var props = this.props;
    if (!props.disabled && props.onTap) props.onTap(e);
  }
});