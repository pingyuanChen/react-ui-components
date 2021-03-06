var React    = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onSearch: React.PropTypes.func,
    throttle: React.PropTypes.number,
    isFocus: React.PropTypes.bool
  },

  getDefaultProps: function(){
    return {
      customClass: '',
      placeholder: 'search...',
      throttle: 200,
      isFocus: true
    };
  },

  componentDidMount: function(){
    if(this.props.isFocus) this._setFocus();
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.isFocus) this._setFocus();
  },

  render: function(){
    var props = this.props;

    return (
      <div className={"search-wrap "+props.customClass} >
        <form 
          className="search-form" 
          onSubmit={this._onSubmit} >
          <input 
            ref="searchInput"
            type="text" 
            autoComplete="off"
            className="search-input"
            placeholder={props.placeholder}
            onKeyDown={this._onKeyDown} />
        </form>
      </div>
    );
  },

  _timeoutId: null,

  _onKeyDown: function(e){
    if (this._timeoutId) clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout(function(){
      this._goSearch(e);
    }.bind(this), this.props.throttle);
  },

  _onSubmit: function(e){
    this._goSearch(e);
    e.preventDefault();
    return false;
  },

  _goSearch: function(e){
    var inputEle, keyword;
    inputEle = ReactDOM.findDOMNode(this.refs.searchInput);
    keyword = inputEle.value;
    if(this.props.onSearch){
      this.props.onSearch(keyword, e);
    }
  },

  _setFocus: function(){
    var inputEle;
    inputEle = ReactDOM.findDOMNode(this.refs.searchInput);
    inputEle.focus();
  }

});


