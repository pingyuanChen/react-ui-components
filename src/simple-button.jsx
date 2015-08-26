var React = require('react');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onTap: React.PropTypes.func.isRequired
  },

  getDefaultProps: function(){
    return {
      customClass: ''
    };
  },

  render: function(){
    var props = this.props;
    return (
      <button
        className={"btn "+props.customClass}
        disabled={props.disabled}
        onTouchTap={this._onTap} >
        {props.label}
        {props.children}
      </button>
    );
  },

  _onTap: function(){
    this.props.onTap();
  }
});