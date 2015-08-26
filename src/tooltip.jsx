var React = require('react');

module.exports = React.createClass({
  propTypes: {
    tip: React.PropTypes.string.isRequired,
    isShow: React.PropTypes.bool,
    customClass: React.PropTypes.string
  },

  getInitialState: function(){
    return {
      isShow: this.props.isShow || false,
      customClass: ''
    }
  },

  render: function(){
    var props = this.props,
      className = props.isShow ? '' : 'hide';

    return (
      <span
        className={"tooltip "+className+' '+props.customClass} >
        {props.tip}
      </span>
    );
  }
});