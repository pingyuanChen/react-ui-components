var React = require('react');

module.exports = React.createClass({
  propTypes: {
    tip: React.PropTypes.string.isRequired,
    isShow: React.PropTypes.bool,
    customClass: React.PropTypes.string
  },

  render: function(){
    var props = this.props,
      className = props.isShow ? '' : 'hide',
      customCls = props.customClass || '';

    return (
      <span
        className={"tooltip "+className+' '+customCls} >
        {props.tip}
      </span>
    );
  }
});