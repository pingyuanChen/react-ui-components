var React = require('react');

module.exports = React.createClass({
  propTypes: {
    msg: React.PropTypes.string,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string   //'info', 'success', 'warning', 'error'
  },

  getDefaultProps: function(){
    return {
      msg: '',
      timeout: 3000,
      type: 'info'
    };
  },

  render: function(){
    return (
      <div
        id="toast-wrap"
        className={"toast fadein "+this.props.type} >
        {this.props.msg}
      </div>
    );
  },

  componentDidMount: function(){
    this._setTimeout();
  },

  componentDidUpdate: function(){
    this._setTimeout();
  },

  _timeoutId: null,

  _setTimeout: function(){
    if (this._timeoutId) clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout(function(){
      React.unmountComponentAtNode(React.findDOMNode(this).parentNode);
    }.bind(this), this.props.timeout);
  }
});